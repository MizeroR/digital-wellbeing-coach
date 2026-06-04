"""
Digital Wellbeing Coach — FastAPI backend

Endpoints:
  POST /predict   — returns risk level, confidence, SHAP explanations, recommendations
  GET  /health    — liveness check

Run locally:
    uvicorn main:app --reload

Swagger UI:
    http://localhost:8000/docs
"""
from contextlib import asynccontextmanager
from pathlib import Path

import joblib
import numpy as np
import shap
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from resources import RECOMMENDATIONS, SHAP_TEMPLATES

MODEL_PATH = Path(__file__).parent / "model.joblib"

FEATURE_COLS = [
    "Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10",
    "sas_total","usage_duration","social_media_usage",
    "frequent_access","age","gender_encoded",
]

_model     = None
_explainer = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _model, _explainer
    if not MODEL_PATH.exists():
        raise RuntimeError(
            "model.joblib not found. Run `python backend/train_model.py` first."
        )
    _model     = joblib.load(MODEL_PATH)
    _explainer = shap.TreeExplainer(_model)
    yield


app = FastAPI(
    title="Digital Wellbeing Coach API",
    description=(
        "Predicts smartphone addiction risk for university students and returns "
        "personalised coaching feedback and locally relevant Kigali activity recommendations."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response schemas ────────────────────────────────────────────────

class PredictRequest(BaseModel):
    gender:             str = Field(..., pattern="^[MF]$",  description="M or F")
    age:                int = Field(..., ge=11, le=35,       description="Age in years")
    usage_duration:     int = Field(..., ge=1,  le=4,        description="1=1–3 h/day  2=4–6 h  3=7–9 h  4=9+ h")
    social_media_usage: int = Field(..., ge=0,  le=1,        description="0=No  1=Yes")
    frequent_access:    int = Field(..., ge=1,  le=4,        description="1=Messaging  2=Entertainment  3=Social Media  4=Gaming")
    Q1:  int = Field(..., ge=1, le=6, description="Missing planned work")
    Q2:  int = Field(..., ge=1, le=6, description="Hard to concentrate")
    Q3:  int = Field(..., ge=1, le=6, description="Physical pain")
    Q4:  int = Field(..., ge=1, le=6, description="Cannot stand not having phone")
    Q5:  int = Field(..., ge=1, le=6, description="Impatient without phone")
    Q6:  int = Field(..., ge=1, le=6, description="Phone on mind when not using")
    Q7:  int = Field(..., ge=1, le=6, description="Will never give up phone")
    Q8:  int = Field(..., ge=1, le=6, description="Constantly checking social media")
    Q9:  int = Field(..., ge=1, le=6, description="Using longer than intended")
    Q10: int = Field(..., ge=1, le=6, description="Others say I use too much")

    model_config = {
        "json_schema_extra": {
            "example": {
                "gender": "F", "age": 20,
                "usage_duration": 3, "social_media_usage": 1, "frequent_access": 3,
                "Q1": 4, "Q2": 3, "Q3": 2, "Q4": 5, "Q5": 4,
                "Q6": 3, "Q7": 4, "Q8": 5, "Q9": 4, "Q10": 3,
            }
        }
    }


class PredictResponse(BaseModel):
    risk_level:          str
    confidence:          float
    sas_total:           int
    addiction_category:  str
    explanations:        list[str]
    recommendations:     list[dict]


# ── Helpers ───────────────────────────────────────────────────────────────────

def _risk_level(prob: float) -> str:
    if prob < 0.35:
        return "Low"
    if prob < 0.55:
        return "Moderate"
    if prob < 0.78:
        return "High"
    return "Severe"


def _addiction_category(req: PredictRequest) -> str:
    if req.frequent_access == 4:
        return "Gaming"
    if req.frequent_access == 2:
        return "Streaming"
    if req.frequent_access == 3 or (req.social_media_usage == 1 and req.Q8 >= 4):
        return "Social Media"
    return "General"


# ── Routes ────────────────────────────────────────────────────────────────────

@app.post("/predict", response_model=PredictResponse, summary="Predict addiction risk")
def predict(req: PredictRequest) -> PredictResponse:
    sas_total      = req.Q1+req.Q2+req.Q3+req.Q4+req.Q5+req.Q6+req.Q7+req.Q8+req.Q9+req.Q10
    gender_encoded = 1 if req.gender == "F" else 0

    features = [
        req.Q1, req.Q2, req.Q3, req.Q4, req.Q5,
        req.Q6, req.Q7, req.Q8, req.Q9, req.Q10,
        sas_total, req.usage_duration, req.social_media_usage,
        req.frequent_access, req.age, gender_encoded,
    ]
    X = np.array([features], dtype=float)

    prob       = float(_model.predict_proba(X)[0][1])
    risk_level = _risk_level(prob)

    shap_vals = _explainer.shap_values(X)
    sv        = shap_vals[1][0] if isinstance(shap_vals, list) else shap_vals[0]
    top3_idx  = np.argsort(np.abs(sv))[::-1][:3]
    explanations = [SHAP_TEMPLATES[FEATURE_COLS[i]] for i in top3_idx]

    category        = _addiction_category(req)
    recommendations = RECOMMENDATIONS.get(category, RECOMMENDATIONS["General"])

    return PredictResponse(
        risk_level         = risk_level,
        confidence         = round(prob * 100, 1),
        sas_total          = sas_total,
        addiction_category = category,
        explanations       = explanations,
        recommendations    = recommendations,
    )


@app.get("/health", summary="Health check")
def health() -> dict:
    return {"status": "ok", "model_loaded": _model is not None}
