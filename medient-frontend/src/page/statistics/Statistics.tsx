import { useEffect, useState } from "react";
import { getStatistics } from "../../api/statisticsApi";
import type { StatisticsResponse } from "../../types/Statistics";
import "../../styles/Statistics.css";
import LoginRequiredCard from "../../components/LoginRequiredCard";

function Statistics() {
  const [stats, setStats] = useState<StatisticsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const loginUser = localStorage.getItem("loginUser");
  const isLogin = loginUser && JSON.parse(loginUser).token;

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getStatistics();
      setStats(data);
    } catch (error) {
      console.error(error);
      alert("통계 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchStats();
    }
  }, [isLogin]);

  if (!isLogin) {
    return (
      <main className="stats-page">
        <LoginRequiredCard description="통계 및 복용 그래프는 로그인한 사용자만 확인할 수 있습니다." />
      </main>
    );
  }

  if (loading || !stats) {
    return (
      <main className="stats-page">
        <h1 className="stats-title">통계 / 복용 그래프</h1>
        <div className="stats-empty">통계 정보를 불러오는 중...</div>
      </main>
    );
  }

  return (
    <main className="stats-page">
      <h1 className="stats-title">통계 / 복용 그래프</h1>

      <section className="stats-summary">
        <div>
          <span>이번 주 복용률</span>
          <strong>{stats.weeklyRate}%</strong>
        </div>
        <div>
          <span>이번 달 복용률</span>
          <strong>{stats.monthlyRate}%</strong>
        </div>
        <div>
          <span>연속 복용</span>
          <strong>{stats.streakDays}일</strong>
        </div>
        <div>
          <span>위험 알림</span>
          <strong className="danger-text">{stats.dangerCount}건</strong>
        </div>
      </section>

      {stats.dangerItems.length > 0 && (
        <section className="danger-highlight">
          <h2>위험 약 조합</h2>
          <div className="danger-grid">
            {stats.dangerItems.map((item, index) => (
              <div key={index} className="danger-card">
                <strong>
                  {item.drug1} + {item.drug2}
                </strong>
                <span>{item.type}</span>
                <p>{item.message}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="stats-grid">
        <div className="chart-card">
          <h2>주간 복용률</h2>
          <div className="bar-chart">
            {stats.weeklyGraph.map((item) => (
              <div className="bar-item" key={item.label}>
                <div className="bar-wrap">
                  <div
                    className={item.rate === -1 ? "bar-fill empty" : "bar-fill"}
                    style={{
                      height: item.rate === -1 ? "8px" : `${item.rate}%`,
                    }}
                  />
                </div>
                <span>{item.label}</span>
                <small>{item.rate === -1 ? "-" : `${item.rate}%`}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h2>월간 복용률</h2>
          <div className="month-list">
            {stats.monthlyGraph.map((item) => (
              <div className="month-row" key={item.label}>
                <span>{item.label}</span>
                <div className="progress">
                  <div
                    style={{ width: item.rate === -1 ? "0%" : `${item.rate}%` }}
                  />
                </div>
                <strong>{item.rate === -1 ? "-" : `${item.rate}%`}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="feedback-card">
          <h2>복약 습관 피드백</h2>
          <p>{stats.feedback}</p>
        </div>

        <div className="calendar-card">
          <h2>최근 복용 기록</h2>
          <div className="calendar-grid">
            {stats.calendarItems.map((item) => (
              <div
                key={item.date}
                className={
                  item.taken ? "calendar-day taken" : "calendar-day missed"
                }
              >
                <span>{item.date.slice(5)}</span>
                <strong>{item.taken ? "✓" : "×"}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Statistics;
