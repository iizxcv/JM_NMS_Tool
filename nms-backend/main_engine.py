from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import get_web_db, get_log_db

import service

app = FastAPI(title="NMS MGMT Engine")

@app.post("/engine/backup/{device_id}")
async def trigger_backup(device_id: int, db_web: Session = Depends(get_web_db), db_log: Session = Depends(get_log_db)):
    # 실제 장비 접속 및 백업 수행
    result = service.run_device_backup(db_web, db_log, device_id)
    return {"status": result}

