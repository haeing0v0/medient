import { Link } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
  return (
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
  );
}

export default Home;
