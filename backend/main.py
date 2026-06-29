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
import os
import uuid
from contextlib import asynccontextmanager
from pathlib import Path

import joblib
import numpy as np
import shap
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from supabase import create_client, Client

try:
    from resources import RECOMMENDATIONS, SHAP_TEMPLATES
except ModuleNotFoundError:
    from backend.resources import RECOMMENDATIONS, SHAP_TEMPLATES

MODEL_PATH = Path(__file__).parent / "model.joblib"

FEATURE_COLS = [
    "Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10",
    "sas_total","usage_duration","social_media_usage",
    "frequent_access","age","gender_encoded",
]

_model     = None
_explainer = None
_supabase: Client | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _model, _explainer, _supabase
    if not MODEL_PATH.exists():
        raise RuntimeError(
            "model.joblib not found. Run `python backend/train_model.py` first."
        )
    _model     = joblib.load(MODEL_PATH)
    _explainer = shap.TreeExplainer(_model)

    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")
    if supabase_url and supabase_key:
        _supabase = create_client(supabase_url, supabase_key)
        print("Supabase client initialized.")
    else:
        _supabase = None
        print("Supabase credentials not found — running without database storage.")

    yield


app = FastAPI(
    title="Digital Wellbeing Coach API",
    description=(
        "Predicts smartphone addiction risk for university students in Kigali, Rwanda "
        "and returns personalised SHAP-based coaching feedback and locally relevant "
        "activity recommendations."
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
    age:                int = Field(..., ge=18, le=25,       description="Age in years (18–25, Kigali university students)")
    usage_duration:     int = Field(..., ge=1,  le=4,        description="1=1–3 hrs/day  2=4–6 hrs/day  3=7–9 hrs/day  4=9+ hrs/day")
    social_media_usage: int = Field(..., ge=0,  le=1,        description="0=No  1=Yes — do you use social media?")
    frequent_access:    int = Field(..., ge=1,  le=5,        description="1=Search engine  2=Online games  3=Social media  4=E-commerce  5=Other")
    Q1:  int = Field(..., ge=1, le=6, description="Missing planned work due to smartphone use")
    Q2:  int = Field(..., ge=1, le=6, description="Hard to concentrate in class or while working")
    Q3:  int = Field(..., ge=1, le=6, description="Feeling pain in wrists or neck while using phone")
    Q4:  int = Field(..., ge=1, le=6, description="Won't be able to stand not having a smartphone")
    Q5:  int = Field(..., ge=1, le=6, description="Feeling impatient and fretful when not holding phone")
    Q6:  int = Field(..., ge=1, le=6, description="Having phone on mind even when not using it")
    Q7:  int = Field(..., ge=1, le=6, description="Will never give up phone even when life is affected")
    Q8:  int = Field(..., ge=1, le=6, description="Constantly checking social media to not miss conversations")
    Q9:  int = Field(..., ge=1, le=6, description="Using smartphone longer than intended")
    Q10: int = Field(..., ge=1, le=6, description="Others say I use my smartphone too much")

    model_config = {
        "json_schema_extra": {
            "example": {
                "gender": "F", "age": 21,
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
    """
    Map XGBoost probability to four risk levels.
    Thresholds defined in proposal Section 3.2 (Risk Score to Risk Level Mapping).
    """
    if prob < 0.35:
        return "Low"
    if prob < 0.55:
        return "Moderate"
    if prob < 0.78:
        return "High"
    return "Severe"


def _addiction_category(req: PredictRequest) -> str:
    """
    Rule-based dominant addiction category classifier.
    Uses frequent_access field and Q8 (social media checking) as composite signals.
    frequent_access values: 1=Search engine  2=Online games  3=Social media
                            4=E-commerce  5=Other
    """
    if req.frequent_access == 2:
        return "Gaming"
    if req.frequent_access == 3 or (req.social_media_usage == 1 and req.Q8 >= 4):
        return "Social Media"
    if req.usage_duration >= 3 and req.frequent_access in [1, 5]:
        return "Streaming"
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

    response = PredictResponse(
        risk_level         = risk_level,
        confidence         = round(prob * 100, 1),
        sas_total          = sas_total,
        addiction_category = category,
        explanations       = explanations,
        recommendations    = recommendations,
    )

    session_id = str(uuid.uuid4())
    if _supabase:
        try:
            _supabase.table("assessment").insert({
                "session_id":          session_id,
                "age":                 req.age,
                "gender":              req.gender,
                "usage_duration":      req.usage_duration,
                "social_media_usage":  req.social_media_usage,
                "frequent_access":     req.frequent_access,
                "q1":  req.Q1,  "q2":  req.Q2,  "q3":  req.Q3,
                "q4":  req.Q4,  "q5":  req.Q5,  "q6":  req.Q6,
                "q7":  req.Q7,  "q8":  req.Q8,  "q9":  req.Q9,
                "q10": req.Q10,
                "sas_total":           sas_total,
                "risk_level":          risk_level,
                "confidence":          round(prob * 100, 1),
                "addiction_category":  category,
            }).execute()
            print(f"Assessment saved to database: session {session_id}")
        except Exception as e:
            print(f"Database write failed (non-critical): {e}")

    return response


@app.get("/health", summary="Health check")
def health() -> dict:
    return {"status": "ok", "model_loaded": _model is not None}
