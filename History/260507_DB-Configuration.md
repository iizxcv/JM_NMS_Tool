# DB구축
- 1. DB 설치
- 2. 리눅스 방화벽 ufw 5432 port (psql) 허용
- 3. sudo nano /etc/postgresql/17/main/postgresql.conf
        :: listen_addresses = '*'
        // 모든 아이피 접속 허용
- 4. sudo nano /etc/postgresql/17/main/pg_hba.conf
        ::  host    all             all             0.0.0.0/0               password
        // 모든IP password 방식 DB 접근 허용
- 5. 스키마 정의 및 Table 생성
        :: init_create.sql 파일내용과 같이 Table 추가
        :: NMS_DB_Schema_v1.md 파일로 내용정리
- 6. 