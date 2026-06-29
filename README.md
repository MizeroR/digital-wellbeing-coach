# Digital Wellbeing Coach
 
> A web-based smartphone addiction risk predictor and personalized intervention recommender for university students in Kigali, Rwanda.
 
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-Vite-61DAFB.svg)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
 
## Description
 
The Digital Wellbeing Coach is a full-stack web application that uses supervised machine learning to predict smartphone addiction risk and deliver personalized, locally relevant intervention recommendations to university students aged 18–25 in Kigali, Rwanda.
 
The system addresses a documented gap: no ML-based digital wellbeing tool has been developed using African behavioural data or evaluated on any African user population. It is the first tool of its kind designed specifically for this context.

**How it works:**
1. A user fills in a structured self-report form — demographic information, daily app usage patterns, and 10 SAS-SV questions
2. An XGBoost classifier predicts their addiction risk level (Low/Moderate/High/Severe) with model confidence percentage
3. TreeSHAP identifies the top 3 behavioural drivers of their score and converts them to plain-language coaching feedback
4. A rule-based category classifier identifies their dominant addiction pattern (Social Media, Gaming, Streaming, or General)
5. 5–10 locally relevant Kigali activity recommendations are returned from a curated resource library
**GitHub Repository:** https://github.com/MizeroR/digital-wellbeing-coach

## Demo

[Watch the demo video](https://drive.google.com/drive/folders/1JcNuJ-J8w5TfNEE0irXvVJESkuRfjKJ0?usp=sharing)

## Environment Setup

### 1. Run the ML notebook

**Requirements:** Python 3.10+, Jupyter Notebook or Kaggle

```bash
pip install scikit-learn xgboost shap imbalanced-learn openpyxl matplotlib seaborn pandas numpy
jupyter notebook notebooks/DWC_Model_Notebook.ipynb
```

Place `Raw Data.xlsx` in the `data/` folder before running.

### 2. Run the FastAPI backend

**Requirements:** Python 3.10+

```bash
# Install dependencies
pip install -r backend/requirements.txt

# Train the model (generates backend/model.joblib)
python backend/train_model.py

# Start the API server
uvicorn backend.main:app --reload
```

Swagger UI (interactive API docs): [http://localhost:8000/docs](http://localhost:8000/docs)

**Endpoints:**

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/predict` | Returns risk level, confidence, SHAP explanations, and recommendations |
| `GET`  | `/health`  | Liveness check |

**Example request:**
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "F", "age": 20,
    "usage_duration": 3, "social_media_usage": 1, "frequent_access": 3,
    "Q1": 4, "Q2": 3, "Q3": 2, "Q4": 5, "Q5": 4,
    "Q6": 3, "Q7": 4, "Q8": 5, "Q9": 4, "Q10": 3
  }'
```

## Designs

### System Architecture
The Digital Wellbeing Coach uses a three-tier client-server architecture:

    User Browser

    │

    │ HTTPS

    ▼

    React / Vite     ──────────────────  Vercel (Frontend)

    │

    │ POST /predict (JSON)

    ▼
    Python / FastAPI  ─────────────────  Railway (Backend)

    │

    │ SQL

    ▼

PostgreSQL (Supabase)

### Figma Mockups
Three core screens designed for the web application:

- **Screen 1 — Assessment Form:** Consent screen, demographic questions, app usage inputs, SAS-SV questionnaire
- **Screen 2 — Results Dashboard:** Risk level display, model confidence percentage, top 3 SHAP coaching sentences, dominant addiction category
- **Screen 3 — Resource Recommendations:** Curated Kigali activity cards filtered by addiction category

Figma link: [figma](https://www.figma.com/design/Dce7R22yKo8F3dLhGrn2pM/DWC---Mockup?node-id=12-2&t=myawWubnECRM7qqu-1)


## Deployment Plan

**Backend** — Railway or Render (Python / FastAPI / Docker)  
**Frontend** — Vercel (React / Vite) — **[Live](https://digital-wellbeing-coach.vercel.app/)**  
**Database** — Supabase (PostgreSQL) — planned  

The backend API is containerised via `Dockerfile` and deploys directly from the GitHub repository. Railway and Render both auto-detect the root `Dockerfile`. The `railway.toml` configures the `/health` liveness check and restart policy.

**Live Frontend:** https://digital-wellbeing-coach-ogkn8i5ao-dwc1.vercel.app/  
**Live API:** https://digital-wellbeing-coach.onrender.com  
**Swagger UI:** https://digital-wellbeing-coach.onrender.com/docs  
**Health check:** https://digital-wellbeing-coach.onrender.com/health

To redeploy:
1. Connect this GitHub repo on [render.com](https://render.com)
2. Select **Deploy from Dockerfile** — no additional config needed
3. Instance type: Free — Render auto-injects `PORT`
4. Verify: `GET /health` → `{"status":"ok","model_loaded":true}`
 
## Author
 
**Reine Mizero**  
BSc Software Engineering — African Leadership University, Kigali, Rwanda  
