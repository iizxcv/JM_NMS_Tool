-- 1. 호스트(장비) 정보: 모든 네트워크 디바이스의 마스터 정보
CREATE TABLE hosts (
    id SERIAL PRIMARY KEY,
    hostname VARCHAR(255) NOT NULL,    -- 장비 이름 (예: Core-SW-01)
    ip_address INET NOT NULL,          -- IP 주소 (PostgreSQL INET 타입 사용)
    vendor VARCHAR(50),                -- Cisco, Arista, Extreme 등
    site_location VARCHAR(100),        -- 서울 IDC, 부산 지점 등
    status VARCHAR(20) DEFAULT 'Active', -- Active, Offline, Staged
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. 아이템 정의: 각 호스트별로 어떤 데이터를 수집할지 정의 (Zabbix의 핵심)
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    host_id INTEGER REFERENCES hosts(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,        -- 항목명 (예: Fan RPM, CPU Load)
    key_name VARCHAR(100) NOT NULL,    -- 고유 키 (예: env.fan.rpm, system.cpu)
    collect_type VARCHAR(20),          -- SNMP, SSH, SYSLOG, NETCONF
    data_type VARCHAR(20),             -- FLOAT, STRING, TEXT
    snmp_oid VARCHAR(255),             -- SNMP인 경우 OID 값
    ssh_command TEXT,                  -- SSH인 경우 실행할 커맨드
    update_interval INTEGER DEFAULT 60, -- 수집 주기 (초)
    units VARCHAR(20),                 -- 단위 (%, RPM, bps 등)
    last_value TEXT,                   -- 최신 수집값 (대시보드 빠른 조회를 위해 유지)
    last_clock TIMESTAMP               -- 최신 수집 시간
);

-- 3. 숫자형 시계열 데이터 (Graph용): CPU, 온도, 트래픽 등 수치 데이터
CREATE TABLE history (
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    value DOUBLE PRECISION NOT NULL,
    clock TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_history_item_clock ON history (item_id, clock DESC);

-- 4. 문자형 시계열 데이터 (Status용): 포트 Up/Down, 단순 상태값
CREATE TABLE history_str (
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    value VARCHAR(255) NOT NULL,
    clock TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_history_str_item_clock ON history_str (item_id, clock DESC);

-- 5. 텍스트형 시계열 데이터 (Log/Config용): Show run, Syslog 전문 등
CREATE TABLE history_text (
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    clock TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_history_text_item_clock ON history_text (item_id, clock DESC);