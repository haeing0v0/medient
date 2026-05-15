import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  completeMedicine,
  deleteMedicine,
  getDurWarnings,
  getMedicines,
  getTodayMedicines,
} from "../../api/medicineApi";
import type { Medicine } from "../../types/Medicine";
import "../../styles/MyMedicine.css";
import LoginRequiredCard from "../../components/LoginRequiredCard";

function MyMedicine() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [todayMedicines, setTodayMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingDur, setCheckingDur] = useState(false);
  const [cautionCount, setCautionCount] = useState(0);
  const [cautionDetails, setCautionDetails] = useState<string[]>([]);
  const [needLogin, setNeedLogin] = useState(false);

  const fetchMedicines = async () => {
    try {
      setLoading(true);

      const [allData, todayData] = await Promise.all([
        getMedicines(),
        getTodayMedicines(),
      ]);

      setMedicines(allData);
      setTodayMedicines(todayData);

      setCheckingDur(true);

      try {
        const warningData = await getDurWarnings();

        setCautionCount(warningData.length);

        setCautionDetails(
          warningData.map(
            (warning) =>
              `${warning.drug1Name} + ${warning.drug2Name}: ${warning.warningType} 주의`,
          ),
        );
      } catch (warningError) {
        console.error("DUR 캐시 조회 실패:", warningError);
        setCautionCount(0);
        setCautionDetails([]);
      } finally {
        setCheckingDur(false);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setNeedLogin(true);
        return;
      }

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await completeMedicine(id);
      fetchMedicines();
    } catch (error) {
      console.error(error);
      alert("복용 완료 처리에 실패했습니다.");
    }
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("이 복용약을 삭제할까요?");

    if (!ok) return;

    try {
      await deleteMedicine(id);

      setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
      setTodayMedicines((prev) =>
        prev.filter((medicine) => medicine.id !== id),
      );

      alert("복용약이 삭제되었습니다.");

      fetchMedicines();
    } catch (error) {
      console.error(error);
      alert("복용약 삭제에 실패했습니다.");
    }
  };

  const getListStatus = (medicine: Medicine) => {
    if (medicine.status === "중단") return "중단";

    const today = new Date();
    const endDate = new Date(medicine.endDate);

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (today > endDate) {
      return "복용완료";
    }

    return "복용중";
  };

  const getTodayStatus = (medicine: Medicine) => {
    return medicine.status === "복용완료" ? "복용완료" : "복용전";
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const missedCount = todayMedicines.filter(
    (medicine) => getTodayStatus(medicine) === "복용전",
  ).length;

  if (needLogin) {
    return (
      <main className="my-medicine-page">
        <LoginRequiredCard description="내 복용약 관리 기능은 회원 전용 서비스입니다." />
      </main>
    );
  }

  return (
    <main className="my-med-page">
      <h1 className="my-med-title">내 복용약 관리</h1>

      <section className="summary-card">
        <div>
          <span>등록 약</span>
          <strong>{medicines.length}개</strong>
        </div>

        <div>
          <span>오늘 복용</span>
          <strong>{todayMedicines.length}회</strong>
        </div>

        <div>
          <span>미복용</span>
          <strong>{missedCount}회</strong>
        </div>

        <div className="caution-summary">
          <span>주의 필요</span>

          <div className="caution-hover-area">
            <strong className="orange">
              {checkingDur ? "계산중..." : `${cautionCount}건`}
            </strong>

            <div className="caution-popover">
              <strong className="caution-popover-title">
                오늘 복용약 주의 정보
              </strong>

              {checkingDur ? (
                <p>DUR 주의 정보를 불러오는 중입니다.</p>
              ) : cautionDetails.length === 0 ? (
                <p>주의가 필요한 약 조합이 없습니다.</p>
              ) : (
                cautionDetails.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="medicine-section">
        <h2>오늘의 복용 약</h2>

        <div className="medicine-table-card">
          <table>
            <thead>
              <tr>
                <th>약 이름</th>
                <th>복용 기간</th>
                <th>복용 횟수</th>
                <th>복용시간</th>
                <th>상태</th>
                <th>메모</th>
                <th>복용</th>
              </tr>
            </thead>

            <tbody>
              {loading && todayMedicines.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-table">
                    불러오는 중...
                  </td>
                </tr>
              )}

              {!loading && todayMedicines.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-table">
                    오늘 복용할 약이 없습니다.
                  </td>
                </tr>
              )}

              {todayMedicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.itemName}</td>
                  <td>
                    {medicine.startDate}~{medicine.endDate}
                  </td>
                  <td>1일 {medicine.dailyCount}회</td>
                  <td>{medicine.doseTime}</td>
                  <td>{getTodayStatus(medicine)}</td>
                  <td>{medicine.memo}</td>
                  <td>
                    <button
                      className={
                        getTodayStatus(medicine) === "복용완료"
                          ? "taken-btn done"
                          : "taken-btn"
                      }
                      onClick={() => handleComplete(medicine.id)}
                      disabled={getTodayStatus(medicine) === "복용완료"}
                    >
                      ✓
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="medicine-section">
        <div className="section-header">
          <h2>복용약 목록</h2>
          <Link to="/my-medicine/add" className="add-med-btn">
            + 약 추가하기
          </Link>
        </div>

        <div className="medicine-table-card">
          <table>
            <thead>
              <tr>
                <th>약 이름</th>
                <th>복용 기간</th>
                <th>복용 횟수</th>
                <th>복용시간</th>
                <th>상태</th>
                <th>메모</th>
                <th>관리</th>
              </tr>
            </thead>

            <tbody>
              {loading && medicines.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-table">
                    불러오는 중...
                  </td>
                </tr>
              )}

              {!loading && medicines.length === 0 && (
                <tr>
                  <td colSpan={7} className="empty-table">
                    등록된 복용약이 없습니다.
                  </td>
                </tr>
              )}

              {medicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.itemName}</td>
                  <td>
                    {medicine.startDate}~{medicine.endDate}
                  </td>
                  <td>1일 {medicine.dailyCount}회</td>
                  <td>{medicine.doseTime}</td>
                  <td>{getListStatus(medicine)}</td>
                  <td>{medicine.memo}</td>
                  <td>
                    <div className="manage-btn-group">
                      <Link
                        to={`/my-medicine/edit/${medicine.id}`}
                        className="edit-med-btn"
                      >
                        수정
                      </Link>

                      <button
                        className="delete-med-btn"
                        onClick={() => handleDelete(medicine.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default MyMedicine;
