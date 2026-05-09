from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from database import Base
import datetime

# web_db용: 관리 데이터
class Device(Base):
    __tablename__ = "devices"
    id = Column(Integer, primary_key=True, index=True)
    hostname = Column(String)
    ip_address = Column(String, unique=True)
    vendor = Column(String)  # cisco_ios, extreme_exos 등
    username = Column(String)
    password = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# log_db용: 수집 데이터
class ConfigHistory(Base):
    __tablename__ = "config_history"
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer)  # Device ID 연동
    config_text = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class LogEntry(Base):
    __tablename__ = "network_logs"
    id = Column(Integer, primary_key=True, index=True)
    source_ip = Column(String)
    log_type = Column(String)  # SNMP, Syslog
    level = Column(String)     # INFO, CRIT
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)