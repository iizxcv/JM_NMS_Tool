# Network Management System (NMS) Database Schema Specification

본 문서는 네트워크 관리 시스템(NMS)의 데이터 가용성 및 확장성을 고려하여 설계된 자빅스(Zabbix) 스타일의 데이터베이스 스키마 명세서입니다.

## 1. 아키텍처 개요
- **정규화 전략**: 장비 설정(Hosts), 수집 항목(Items), 시계열 데이터(History)를 분리하여 중복을 최소화합니다.
- **데이터 타입 분리**: 수집 데이터의 성격(수치, 문자, 대용량 텍스트)에 따라 별도의 테이블에 저장하여 조회 성능을 최적화합니다.
- **하이브리드 지원**: SNMP, SSH, Syslog 등 다양한 프로토콜의 결과물을 하나의 규격으로 통합 관리합니다.

---

## 2. 테이블 상세 정의

### 2.1 hosts (장비 관리)
네트워크 인벤토리의 핵심 정보를 담고 있는 테이블입니다.
| 필드명 | 데이터 타입 | 설명 |
| :--- | :--- | :--- |
| `id` | SERIAL (PK) | 고유 식별자 |
| `hostname` | VARCHAR(255) | 장비 식별 명칭 |
| `ip_address` | INET | 장비 접속 IP (IPv4/IPv6 지원) |
| `vendor` | VARCHAR(50) | 장비 제조사 (Cisco, Arista 등) |
| `site_location` | VARCHAR(100) | 물리적 위치 |
| `status` | VARCHAR(20) | 현재 운영 상태 (Active/Offline) |

### 2.2 items (수집 항목 정의)
각 호스트가 어떤 데이터를 어떤 방식으로 수집할지 결정하는 '수집 명세서'입니다.
| 필드명 | 데이터 타입 | 설명 |
| :--- | :--- | :--- |
| `host_id` | INT (FK) | 해당 항목이 속한 장비 ID |
| `key_name` | VARCHAR(100) | 데이터 식별 키 (예: `interface.status`) |
| `collect_type` | VARCHAR(20) | 수집 프로토콜 (SNMP, SSH, Syslog 등) |
| `data_type` | VARCHAR(20) | 저장될 테이블 결정 (FLOAT, STR, TEXT) |
| `update_interval`| INTEGER | 수집 주기 (단위: 초) |

### 2.3 history 시리즈 (시계열 데이터)
실제 수집된 데이터가 시계열(Time-series)로 쌓이는 테이블입니다.
- **history**: 수치 데이터 (그래프 출력용)
- **history_str**: 상태 문자열 (Up/Down, Normal/Critical)
- **history_text**: 대용량 데이터 (Config Backup, Syslog 전문)

---

## 3. 성능 최적화 전략
1. **인덱스(Indexing)**: 모든 history 테이블은 `(item_id, clock DESC)` 복합 인덱스를 사용하여 특정 장비의 최신 데이터를 가져오는 속도를 극대화했습니다.
2. **외래키 관리**: `ON DELETE CASCADE` 설정을 통해 호스트 삭제 시 연관된 아이템과 데이터가 자동으로 정리되도록 설계했습니다.
3. **확장성**: 새로운 벤더가 추가되더라도 `items` 테이블의 커맨드나 OID만 업데이트하면 백엔드 로직 수정 없이 즉시 수집이 가능합니다.

---
*Created for Network Engineer Lee Ju-myeong*
