import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDrugDetail } from "../../api/drugApi";
import type { DrugDetailResponse } from "../../types/Drug";
import "../../styles/DrugDetail.css";

function DrugDetail() {
  const { itemSeq } = useParams();
  const navigate = useNavigate();

  const [drug, setDrug] = useState<DrugDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!itemSeq) return;

      try {
        setLoading(true);
        const data = await getDrugDetail(itemSeq);
        setDrug(data);
      } catch (error) {
        console.error(error);
        alert("약 상세 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [itemSeq]);

  const isLogin = () => {
    const loginUser = localStorage.getItem("loginUser");

    if (!loginUser) {
      return false;
    }

    try {
      const parsedUser = JSON.parse(loginUser);
      return Boolean(parsedUser.token);
    } catch {
      return false;
    }
  };

  const handleRegisterMedicine = () => {
    if (!drug) return;

    if (!isLogin()) {
      alert("로그인 후 이용할 수 있습니다.");
      navigate("/login");
      return;
    }

    navigate(
      `/my-medicine/add?itemName=${encodeURIComponent(
        drug.itemName,
      )}&itemSeq=${encodeURIComponent(itemSeq ?? "")}`,
    );
  };

  const handleDurCheck = () => {
    if (!drug) return;

    navigate(`/dur-check?drug1=${encodeURIComponent(drug.itemName)}`);
  };

  if (loading) {
    return <p className="detail-message">상세 정보를 불러오는 중입니다...</p>;
  }

  if (!drug) {
    return <p className="detail-message">약 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="drug-detail-page">
      <section className="detail-card">
        <img
          className="detail-image"
          src={drug.itemImage}
          alt={drug.itemName}
        />

        <h1 className="detail-title">
          {drug.itemName} - {drug.entpName}
        </h1>

        <table className="detail-table">
          <tbody>
            <tr>
              <th>효능</th>
              <td>{drug.efcyQesitm}</td>
            </tr>
            <tr>
              <th>사용법</th>
              <td>{drug.useMethodQesitm}</td>
            </tr>
            <tr>
              <th>주의사항</th>
              <td>{drug.atpnQesitm}</td>
            </tr>
            <tr>
              <th>상호작용</th>
              <td>{drug.intrcQesitm}</td>
            </tr>
            <tr>
              <th>부작용</th>
              <td>{drug.seQesitm}</td>
            </tr>
            <tr>
              <th>보관법</th>
              <td>{drug.depositMethodQesitm}</td>
            </tr>
          </tbody>
        </table>

        <div className="detail-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>
            이전으로
          </button>
        </div>
      </section>

      <div className="bottom-actions two-buttons">
        <button className="register-btn" onClick={handleRegisterMedicine}>
          내 복용약 등록
        </button>

        <button className="dur-btn" onClick={handleDurCheck}>
          DUR 체크하기
        </button>
      </div>

      <p className="notice-text">
        본 정보는 참고용이며 의학적 진단을 대체하지 않습니다.
      </p>
    </div>
  );
}

export default DrugDetail;
