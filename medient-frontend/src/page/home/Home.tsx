import { Link } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>내 약, 안전하게 관리하세요</h1>

        <p>DUR 공공데이터 기반으로 병용금기와 맞춤 복약 위험을 확인하세요.</p>

        <div className="hero-buttons">
          <Link to="/drugs" className="primary-btn">
            🔍 약 검색하기
          </Link>

          <Link to="/my-drugs" className="secondary-btn">
            📋 내 복용약
          </Link>
        </div>
      </section>

      <section className="intro-section">
        <span className="section-label green">WHY MEDIENT?</span>
        <h2>약을 먹는 순간, 확인해야 할 정보가 많아집니다</h2>
        <p>
          Medient는 공공데이터(DUR)를 기반으로 복용 중인 약의 위험 요소를 미리
          확인하고, 개인 건강 정보에 맞춰 안전한 복약 관리를 돕습니다.
        </p>

        <div className="feature-cards">
          <div className="info-card">
            <div className="icon-box">⚠️</div>
            <h3>병용금기 확인</h3>
            <p>같이 먹으면 위험할 수 있는 약 조합을 사전에 확인합니다.</p>
            <div className="card-line orange" />
          </div>

          <div className="info-card">
            <div className="icon-box">👤</div>
            <h3>개인 맞춤 경고</h3>
            <p>나이, 성별, 임신 여부에 따라 주의 정보를 다르게 보여줍니다.</p>
            <div className="card-line blue" />
          </div>

          <div className="info-card">
            <div className="icon-box">📋</div>
            <h3>복용 기록 관리</h3>
            <p>오늘 복용할 약과 놓친 약을 한눈에 확인할 수 있습니다.</p>
            <div className="card-line green-line" />
          </div>
        </div>
      </section>

      <section className="flow-section">
        <span className="section-label blue-label">SERVICE FLOW</span>
        <h2>검색부터 안전체크, 복용 통계까지 한 흐름으로</h2>
        <p>
          비회원은 약 검색과 단일 안전 체크를 사용할 수 있고, 회원은 내 복용약
          기반 자동 분석과 복용 통계를 확인할 수 있습니다.
        </p>

        <div className="flow-list">
          <div className="flow-card">
            <strong>1</strong>
            <div>
              <h3>약 검색</h3>
              <p>의약품 정보 확인</p>
            </div>
          </div>

          <span className="flow-arrow">→</span>

          <div className="flow-card">
            <strong>2</strong>
            <div>
              <h3>복용약 등록</h3>
              <p>약과 복용 시간 저장</p>
            </div>
          </div>

          <span className="flow-arrow">→</span>

          <div className="flow-card">
            <strong>3</strong>
            <div>
              <h3>DUR 분석</h3>
              <p>병용금기 등 확인</p>
            </div>
          </div>

          <span className="flow-arrow">→</span>

          <div className="flow-card">
            <strong>4</strong>
            <div>
              <h3>결과 관리</h3>
              <p>알림과 통계 확인</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <span className="section-label green">LOGIN DASHBOARD PREVIEW</span>
        <h2>로그인하면 이런 대시보드가 보여요</h2>
        <p>
          내 복용약, 오늘의 복용 일정, DUR 위험 알림, 복용률을 한 화면에서
          확인할 수 있습니다.
        </p>

        <div className="dashboard-preview">
          <aside className="preview-sidebar">
            <h3>💊 Medient</h3>
            <button>대시보드</button>
            <span>내 복용약</span>
            <span>안전체크</span>
            <span>통계</span>
            <span>설정</span>
          </aside>

          <div className="preview-main">
            <h3>안녕하세요, 신나는 호랑이님 👋</h3>
            <p>오늘 복용해야 할 약과 안전 알림을 확인하세요.</p>

            <div className="stat-grid">
              <div>
                <strong className="green-text">3건</strong>
                <span>복용 예정</span>
              </div>
              <div>
                <strong className="red-text">1건</strong>
                <span>놓친 약</span>
              </div>
              <div>
                <strong className="orange-text">1건</strong>
                <span>위험 알림</span>
              </div>
              <div>
                <strong className="blue-text">86%</strong>
                <span>복용률</span>
              </div>
            </div>

            <div className="preview-bottom">
              <div className="schedule-box">
                <h4>오늘 복용 일정</h4>
                <p>
                  <b>08:00</b> 혈압약 A <span className="green-text">완료</span>
                </p>
                <p>
                  <b>13:00</b> 비타민 D <span className="green-text">예정</span>
                </p>
                <p>
                  <b>21:00</b> 타이레놀정{" "}
                  <span className="orange-text">주의</span>
                </p>
              </div>

              <div className="warning-box">
                <h4>DUR 위험 알림!</h4>
                <strong>병용금기 1건 발견</strong>
                <p>등록된 복용약 조합 중 주의가 필요한 항목이 있습니다.</p>
                <button>자세히 확인</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="core-section">
        <span className="section-label blue-label">CORE FEATURES</span>
        <h2>Medient의 핵심 기능</h2>

        <div className="core-grid">
          <div className="core-card">
            <span>🔍</span>
            <div>
              <h3>약 검색</h3>
              <p>제품명/성분명으로 의약품 정보를 빠르게 찾기</p>
            </div>
          </div>

          <div className="core-card">
            <span>📄</span>
            <div>
              <h3>약 상세</h3>
              <p>효능, 복용법, 부작용, 주의사항 확인</p>
            </div>
          </div>

          <div className="core-card">
            <span>🛡️</span>
            <div>
              <h3>안전체크</h3>
              <p>DUR 기반 병용금기 및 맞춤 위험 분석</p>
            </div>
          </div>

          <div className="core-card">
            <span>⚖️</span>
            <div>
              <h3>약 비교</h3>
              <p>두 약의 성분과 주의사항을 나란히 비교</p>
            </div>
          </div>

          <div className="core-card">
            <span>📊</span>
            <div>
              <h3>통계</h3>
              <p>복용률과 놓친 복용을 그래프로 확인</p>
            </div>
          </div>

          <div className="core-card">
            <span>✨</span>
            <div>
              <h3>개인화</h3>
              <p>나이·성별·임신 여부 기반 맞춤 경고</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <div>
          <h2>내가 먹는 약, 이제 Medient에서 안전하게 확인하세요</h2>
          <p>
            공공데이터 기반 참고 정보와 개인 맞춤 복약 관리를 통해 더 안전한
            복용 습관을 만들 수 있습니다.
          </p>

          <div className="cta-buttons">
            <Link to="/drugs" className="primary-btn">
              약 검색 시작
            </Link>
            <Link to="/join" className="join-btn">
              회원가입
            </Link>
          </div>
        </div>

        <p className="disclaimer">
          ※ 본 서비스는 의학적 진단이 아닌 참고 정보를 제공합니다.
        </p>
      </section>

      <footer className="home-footer reveal-section">
        <div>
          <h3>💊 Medient</h3>
          <p>DUR 공공데이터 기반 개인 맞춤 복약 안전 관리 서비스</p>
        </div>
        <p className="footer-copy">© 2026 Medient. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
