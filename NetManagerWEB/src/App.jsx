// 1. 필요한 라이브러리 및 도구 가져오기
// React: 리액트 엔진의 핵심
// useState: 화면에 보여줄 '동적인 데이터(상태)'를 관리하는 Hook
import React, { useState } from 'react';
// 스타일 시트 연결 (NetBox 스타일의 고밀도 레이아웃 정의)
import './App.css';

/**
 * [NMS Main Component]
 * 이 함수는 전체 화면을 구성하는 가장 큰 단위(부품)입니다.
 * 리액트는 이 함수가 반환(return)하는 코드를 브라우저에 그려줍니다.
 */
function App() {
  
  /* [개념: 상태 관리 (State Management)]
     네트워크 장비의 실시간 상태 정보를 담는 바구니입니다.
     나중에 주명님이 구축하신 8001번 포트의 API로부터 데이터를 받아와서
     이 setDevices 함수를 통해 바구니를 업데이트하게 됩니다.
  */
  const [devices, setDevices] = useState([
    { id: 1, name: 'Core-SW-01', status: 'Active', ip: '10.1.1.1', vendor: 'Cisco', site: 'Seoul-IDC' },
    { id: 2, name: 'Edge-Router-A', status: 'Offline', ip: '10.1.1.254', vendor: 'Arista', site: 'Busan-Branch' },
    { id: 3, name: 'NMS-Server', status: 'Active', ip: '192.168.16.52', vendor: 'Ubuntu', site: 'Seoul-IDC' },
    { id: 4, name: 'Dist-SW-01', status: 'Staged', ip: '10.1.2.1', vendor: 'Extreme', site: 'Seoul-IDC' },
  ]);

  /* [함수: 이벤트 핸들러]
     사용자가 버튼을 클릭했을 때 실행되는 동작입니다.
     여기에는 나중에 'MGMT Engine(8000번 포트)'으로 
     SSH 접속(Netmiko) 명령을 날리는 로직이 들어갈 자리입니다.
  */
  const handleBackup = (deviceName) => {
    // 템플릿 리터럴(` `)을 사용하여 영문법에 맞는 메시지 출력
    console.log(`Starting automated config backup for ${deviceName}...`);
    alert(`${deviceName} 장비의 백업 프로세스를 시작합니다.`);
  };

  // 2. 화면 렌더링 (JSX 반환)
  return (
    <div className="nms-container">
      
      {/* [사이드바] 네비게이션 영역
          전문적인 툴 느낌을 주기 위해 섹션별로 메뉴를 구분했습니다. */}
      <aside className="sidebar">
        <div className="sidebar-brand">NetManager <span>Pro</span></div>
        
        <nav className="nav-menu">
          <div className="nav-section">ORGANIZATION</div>
          <ul>
            <li className="active">Sites (지역 관리)</li>
            <li>Tenants (고객사 관리)</li>
          </ul>

          <div className="nav-section">DEVICES</div>
          <ul>
            <li>Device List (장비 목록)</li>
            {/* 주명님이 강조하신 핵심 기능: 자동 백업 관리 메뉴 */}
            <li>Config Backups</li> 
          </ul>

          <div className="nav-section">MONITORING</div>
          <ul>
            {/* SNMP/Syslog 데이터 통합 조회를 위한 메뉴 */}
            <li>SNMP Traps</li>
            <li>Syslog Entries</li>
          </ul>
        </nav>
      </aside>

      {/* [메인 콘텐츠] 실제 데이터가 보여지는 영역 */}
      <main className="main-content">
        
        {/* 상단 헤더: 현재 위치와 사용자 정보 표시 */}
        <header className="main-header">
          <div className="breadcrumb">Devices / <strong>Device List</strong></div>
          <div className="user-info">
            Operator: <strong>Lee Ju-myeong</strong> {/* */}
          </div>
        </header>

        {/* [대시보드 카드] 
            현재 관리 중인 장비의 전체적인 상태를 요약해서 보여줍니다.
            데이터(`devices`)의 변화에 따라 숫자가 자동으로 계산(Rendering)됩니다. */}
        <div className="stats-container">
          <div className="stat-card total">
            <span className="label">Total Devices</span>
            <span className="value">{devices.length}</span>
          </div>
          <div className="stat-card active">
            <span className="label">Active Units</span>
            {/* .filter() 함수를 사용하여 상태가 Active인 것만 골라 갯수를 셉니다. */}
            <span className="value">{devices.filter(d => d.status === 'Active').length}</span>
          </div>
          <div className="stat-card offline">
            <span className="label">Offline / Critical</span>
            <span className="value">{devices.filter(d => d.status === 'Offline').length}</span>
          </div>
        </div>

        {/* [데이터 테이블] 
            NetBox 스타일의 고밀도 테이블입니다. 
            많은 장비를 한눈에 보기 좋게 구성했습니다. */}
        <section className="table-section">
          <div className="table-actions">
            <button className="btn btn-add">Add Device</button>
            {/* Pandas를 활용한 데이터 추출 기능을 위한 버튼 */}
            <button className="btn btn-export">Export to Excel</button> 
          </div>
          
          <table className="nms-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Device Name</th>
                <th>Status</th>
                <th>Primary IP</th>
                <th>Vendor</th>
                <th>Site Location</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* [개념: 리스트 렌더링]
                  상태 데이터(devices)를 한 줄씩 테이블 행(tr)으로 변환합니다. */}
              {devices.map((device) => (
                <tr key={device.id}>
                  <td><input type="checkbox" /></td>
                  <td className="device-name">{device.name}</td>
                  <td>
                    {/* 조건부 스타일링: 상태값에 따라 CSS 클래스를 다르게 부여합니다. */}
                    <span className={`status-badge ${device.status.toLowerCase()}`}>
                      {device.status}
                    </span>
                  </td>
                  <td><code>{device.ip}</code></td>
                  <td>{device.vendor}</td>
                  <td>{device.site}</td>
                  <td style={{ textAlign: 'center' }}>
                    {/* 클릭 시 위에서 정의한 handleBackup 함수를 실행합니다. */}
                    <button 
                      className="action-btn" 
                      title="Run Backup"
                      onClick={() => handleBackup(device.name)}
                    >
                      💾
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;