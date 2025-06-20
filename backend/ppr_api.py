from fastapi import FastAPI
from typing import List, Dict
from fastapi.responses import JSONResponse
import json
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # или ["http://localhost:3000"] для безопасности
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Пример: возвращает список словарей (JSON)
@app.get("/api/all_reviews")
def get_all_reviews():
    with open(f"parsed/org_done/petrol_reviews.json", "r", encoding="utf-8") as f:
        reviews = json.load(f)

    return JSONResponse(content=reviews)

# Пример: возвращает один объект
@app.get("/api/plus_minus_petrol")
def get_plus_minus_petrol():
    with open(f"parsed/org_done/processed_with_rate.json", "r", encoding="utf-8") as f:
        thesis = json.load(f)

    return JSONResponse(content=thesis[0])

@app.get("/api/3m_plus_minus_petrol")
def get_plus_minus_petrol():
    with open(f"parsed/org_done/processed_3month_last.json", "r", encoding="utf-8") as f:
        thesis = json.load(f)

    return JSONResponse(content=thesis)

@app.get("/api/plus_minus_all")
def get_plus_minus_all():
    with open(f"parsed/org_done/processed_with_rate.json", "r", encoding="utf-8") as f:
        thesis = json.load(f)
    new_arr = [k for k in thesis if k['name'] != 'Петрол плюс']

    return JSONResponse(content=new_arr)
