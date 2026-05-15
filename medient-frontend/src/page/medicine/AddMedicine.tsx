import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  addMedicine,
  getMedicine,
  updateMedicine,
} from "../../api/medicineApi";
import { searchDrugs } from "../../api/drugApi";
import type { DrugSearchResponse } from "../../types/Drug";
import "../../styles/AddMedicine.css";

function AddMedicine() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isEdit = Boolean(id);

  const [itemName, setItemName] = useState("");
  const [itemSeq, setItemSeq] = useState("");
  const [suggestions, setSuggestions] = useState<DrugSearchResponse[]>([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyCount, setDailyCount] = useState(1);
  const [doseTime, setDoseTime] = useState("아침");
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMedicine = async () => {
    if (!id) return;

    try {
      const data = await getMedicine(Number(id));

      setItemName(data.itemName);
      setItemSeq(data.itemSeq);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setDailyCount(data.dailyCount);
      setDoseTime(data.doseTime);
      setMemo(data.memo ?? "");
    } catch (error) {
      console.error(error);
      alert("복용약 정보를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchMedicine();
      return;
    }

    const queryItemName = searchParams.get("itemName");
    const queryItemSeq = searchParams.get("itemSeq");

    if (queryItemName) {
      setItemName(queryItemName);
    }

    if (queryItemSeq) {
      setItemSeq(queryItemSeq);
    }
  }, [id, isEdit, searchParams]);

  const handleDrugChange = async (value: string) => {
    setItemName(value);
    setItemSeq("");

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const data = await searchDrugs(value);
      setSuggestions(data.slice(0, 5));
    } catch (error) {
      console.error(error);
      setSuggestions([]);
    }
  };

  const handleSelectDrug = (drug: DrugSearchResponse) => {
    setItemName(drug.itemName);
    setItemSeq(drug.itemSeq);
    setSuggestions([]);
  };

  const handleSubmit = async () => {
    if (!itemName || !startDate || !endDate) {
      alert("약 이름, 복용 시작일, 종료일을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const medicineData = {
        itemSeq,
        itemName,
        startDate,
        endDate,
        dailyCount,
        doseTime,
        status: "복용중",
        memo,
      };

      if (isEdit && id) {
        await updateMedicine(Number(id), medicineData);
        alert("복용약이 수정되었습니다.");
      } else {
        await addMedicine(medicineData);
        alert("복용약이 등록되었습니다.");
      }

      navigate("/my-medicine");
    } catch (error) {
      console.error(error);
      alert(
        isEdit ? "복용약 수정에 실패했습니다." : "복용약 등록에 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-med-page">
      <section className="add-med-card">
        <div className="add-med-header">
          <div>
            <h1>{isEdit ? "복용약 수정" : "약 추가하기"}</h1>
            <p>
              {isEdit
                ? "복용 중인 약 정보를 수정해보세요."
                : "복용 중인 약 정보를 등록하고 관리해보세요."}
            </p>
          </div>
          <button className="back-btn" onClick={() => navigate("/my-medicine")}>
            목록으로
          </button>
        </div>

        <div className="form-grid">
          <div className="form-group full">
            <label>약 이름</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => handleDrugChange(e.target.value)}
              placeholder="예: 타이레놀정"
              autoComplete="off"
            />

            {suggestions.length > 0 && (
              <ul className="add-suggestion-list">
                {suggestions.map((drug) => (
                  <li key={drug.itemSeq} onClick={() => handleSelectDrug(drug)}>
                    <strong>{drug.itemName}</strong>
                    {drug.entpName && <span>{drug.entpName}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-group">
            <label>복용 시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>복용 종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>하루 복용 횟수</label>
            <select
              value={dailyCount}
              onChange={(e) => setDailyCount(Number(e.target.value))}
            >
              <option value={1}>1일 1회</option>
              <option value={2}>1일 2회</option>
              <option value={3}>1일 3회</option>
              <option value={4}>1일 4회</option>
            </select>
          </div>

          <div className="form-group">
            <label>복용 시간</label>
            <input
              type="text"
              value={doseTime}
              onChange={(e) => setDoseTime(e.target.value)}
              placeholder="예: 아침, 점심, 저녁"
            />
          </div>

          <div className="form-group full">
            <label>메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="예: 감기약, 식후 복용"
            />
          </div>
        </div>

        <button
          className="submit-med-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? isEdit
              ? "수정 중..."
              : "등록 중..."
            : isEdit
              ? "복용약 수정하기"
              : "복용약 등록하기"}
        </button>
      </section>
    </main>
  );
}

export default AddMedicine;
