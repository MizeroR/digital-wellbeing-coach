# Digital Wellbeing Coach
 
> A web-based smartphone addiction risk predictor and personalized intervention recommender for university students in Kigali, Rwanda.
 
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-Next.js_14-black.svg)](https://nextjs.org)
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

## Environment Setup
 
### Run the ML notebook
 
**Requirements:**
- Python 3.10+
- Jupyter Notebook or Kaggle
**Install dependencies:**
 
```bash
pip install scikit-learn xgboost shap imbalanced-learn openpyxl matplotlib seaborn pandas numpy
```
 
**Run:**
```bash
jupyter notebook notebooks/DWC_Model_Notebook.ipynb
```
 
Place `Raw_Data.xlsx` in the `data/` folder before running.

## Designs

### System Architecture
The Digital Wellbeing Coach uses a three-tier client-server architecture:

    User Browser

    │

    │ HTTPS

    ▼

    React / Next.js  ──────────────────  Vercel (Frontend)

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

Figma link: *(to be added)*


## Deployment Plan
 
**Frontend** — Vercel (React)  
**Backend** — Railway (Python / FastAPI)  
**Database** — Supabase (PostgreSQL free tier)  
 
Full deployment instructions will be added when backend and frontend development is complete.
 
## Author
 
**Reine Mizero**  
BSc Software Engineering — African Leadership University, Kigali, Rwanda  
