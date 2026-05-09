from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 단일 CT 내부 통신이므로 localhost 사용
WEB_DB_URL = "postgresql://admin:password123@localhost:5432/web_db"
LOG_DB_URL = "postgresql://admin:password123@localhost:5432/log_db"

web_engine = create_engine(WEB_DB_URL)
log_engine = create_engine(LOG_DB_URL)

WebSession = sessionmaker(autocommit=False, autoflush=False, bind=web_engine)
LogSession = sessionmaker(autocommit=False, autoflush=False, bind=log_engine)

Base = declarative_base()

# 의존성 주입 함수
def get_web_db():
    db = WebSession()
    try: yield db
    finally: db.close()

def get_log_db():
    db = LogSession()
    try: yield db
    finally: db.close()