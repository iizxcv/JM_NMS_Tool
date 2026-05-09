from napalm import get_network_driver

# 1. 벤더 드라이버 설정 (cisco_ios, juniper, arista, extreme 등)
driver = get_network_driver('ios') 
device = driver('192.168.17.254', 'admin', 'password')

# 2. 장비 연결
device.open()

# 3. 마법 같은 정보 수집 (추상화 함수 호출)
# 장비가 Cisco든 Arista든 결과 형식은 똑같습니다.
facts = device.get_facts()
environment = device.get_environment()

print(f"모델명: {facts['model']}")
print(f"팬 상태: {environment['fans']}")

# 4. 연결 종료
device.close()