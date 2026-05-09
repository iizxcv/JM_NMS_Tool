import pandas as pd
from netmiko import ConnectHandler
from sqlalchemy.orm import Session
import models, datetime

# 1. Config 자동 백업 (Netmiko 활용)
def run_device_backup(db_web: Session, db_log: Session, device_id: int):
    device = db_web.query(models.Device).filter(models.Device.id == device_id).first()
    if not device: return "Device not found"

    params = {
        'device_type': device.vendor,
        'host': device.ip_address,
        'username': device.username,
        'password': device.password,
    }
    
    try:
        with ConnectHandler(**params) as net_connect:
            config = net_connect.send_command("show running-config")
            new_history = models.ConfigHistory(device_id=device.id, config_text=config)
            db_log.add(new_history)
            db_log.commit()
            return "Success"
    except Exception as e:
        return f"Error: {str(e)}"

# 2. 엑셀/CSV 데이터 추출 (Pandas 활용)
def export_logs(db_log: Session, start_date: str, end_date: str, format: str = "excel"):
    query = db_log.query(models.LogEntry).filter(
        models.LogEntry.created_at.between(start_date, end_date)
    )
    df = pd.read_sql(query.statement, db_log.bind)
    
    file_name = f"log_export_{datetime.datetime.now().strftime('%Y%m%d%H%M')}"
    path = f"./exports/{file_name}.{'xlsx' if format == 'excel' else 'csv'}"
    
    if format == "excel":
        df.to_excel(path, index=False)
    else:
        df.to_csv(path, index=False)
    return path