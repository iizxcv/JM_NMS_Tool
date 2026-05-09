## 프론트엔드 개발서버 실행
npm run dev


## 백엔드 구축
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn netmiko sqlalchemy psycopg2-binary pandas

### 백엔드 dir 구조
/root/nms-backend/
├── venv/                 # 파이썬 가상환경
├── database.py           # Multi-DB (web_db, log_db) 연결 설정
├── models.py             # DB 테이블 정의 (SQLAlchemy)
├── schemas.py            # 데이터 검증 정의 (Pydantic)
├── service.py            # 핵심 로직 (Netmiko 백업, DB CRUD)
├── main_engine.py        # MGMT Engine 서비스 (Port 8000)
├── main_api.py           # MSA API 서비스 (Port 8001)
├── requirements.txt      # 필수 라이브러리 목록
└── exports/              # Excel/CSV 추출 파일 저장 폴더

### engine 실행
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

### MSA API 실생
uvicorn main_api:app --host 0.0.0.0 --port 8001 --reload

## DB 구축
sudo apt update && sudo apt install -y postgresql
sudo -u postgres psql

