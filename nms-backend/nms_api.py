from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_web_db, get_log_db
import models, service

app = FastAPI(title="NMS MSA API")

# CORS 설정 (Vue 5173 포트 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 개발 중에는 모두 허용
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/devices")
def get_devices(db: Session = Depends(get_web_db)):
    return db.query(models.Device).all()

@app.get("/api/logs/export")
def download_logs(start: str, end: str, db: Session = Depends(get_log_db)):
    file_path = service.export_logs(db, start, end)
    return {"download_url": file_path}