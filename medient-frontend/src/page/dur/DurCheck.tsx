import { useState } from "react";
import { checkDur } from "../../api/durApi";
import { searchDrugs } from "../../api/drugApi";
import type { DurCheckResponse } from "../../api/durApi";
import type { DrugSearchResponse } from "../../types/Drug";
import "../../styles/DurCheck.css";

function DurCheck() {
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [result, setResult] = useState<DurCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const [drug1Suggestions, setDrug1Suggestions] = useState<
    DrugSearchResponse[]
  >([]);
  const [drug2Suggestions, setDrug2Suggestions] = useState<
    DrugSearchResponse[]
  >([]);

  const handleDrug1Change = async (value: string) => {
    setDrug1(value);
    setResult(null);

    if (value.trim().length < 2) {
      setDrug1Suggestions([]);
      return;
    }

    try {
      const data = await searchDrugs(value);
      setDrug1Suggestions(data.slice(0, 5));
    } catch (error) {
      console.error(error);
      setDrug1Suggestions([]);
    }
  };

  const handleDrug2Change = async (value: string) => {
    setDrug2(value);
    setResult(null);

    if (value.trim().length < 2) {
      setDrug2Suggestions([]);
      return;
    }

    try {
      const data = await searchDrugs(value);
      setDrug2Suggestions(data.slice(0, 5));
    } catch (error) {
      console.error(error);
      setDrug2Suggestions([]);
    }
  };

  const handleSelectDrug1 = (itemName: string) => {
    setDrug1(itemName);
    setDrug1Suggestions([]);
  };

  const handleSelectDrug2 = (itemName: string) => {
    setDrug2(itemName);
    setDrug2Suggestions([]);
  };

  const handleCheck = async () => {
    if (!drug1.trim() || !drug2.trim()) {
      alert("확인할 약 2개를 모두 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const data = await checkDur({
        drug1,
        drug2,
      });

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("DUR 분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dur-check-page">
      <h1 className="dur-title">DUR 안전체크</h1>

      <p className="dur-description">
        약 조합의 병용금기(함께 먹으면 위험한 약), 효능군중복(비슷한 효과의 약
        중복 복용), 용량주의 등 DUR 안전 정보를 확인할 수 있습니다.
      </p>

      <section className="dur-check-container">
        <div className="dur-card">
          <h2>안전체크 입력</h2>

          <div className="input-group">
            <label>확인할 약 1</label>
            <input
              type="text"
              value={drug1}
              onChange={(e) => handleDrug1Change(e.target.value)}
              placeholder="예: 씨코나졸정"
              autoComplete="off"
            />

            {drug1Suggestions.length > 0 && (
              <ul className="suggestion-list">
                {drug1Suggestions.map((drug) => (
                  <li
                    key={drug.itemSeq}
                    onClick={() => handleSelectDrug1(drug.itemName)}
                  >
                    <strong>{drug.itemName}</strong>
                    {drug.entpName && <span>{drug.entpName}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="input-group">
            <label>확인할 약 2</label>
            <input
              type="text"
              value={drug2}
              onChange={(e) => handleDrug2Change(e.target.value)}
              placeholder="예: 심바스타틴"
              autoComplete="off"
            />

            {drug2Suggestions.length > 0 && (
              <ul className="suggestion-list">
                {drug2Suggestions.map((drug) => (
                  <li
                    key={drug.itemSeq}
                    onClick={() => handleSelectDrug2(drug.itemName)}
                  >
                    <strong>{drug.itemName}</strong>
                    {drug.entpName && <span>{drug.entpName}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="dur-submit-btn"
            onClick={handleCheck}
            disabled={loading}
          >
            {loading ? "분석 중..." : "DUR 분석하기"}
          </button>
        </div>

        <div className="dur-card result-card">
          <h2>분석 결과</h2>

          {!result && (
            <div className="empty-result">
              <p>약 정보를 입력하고 DUR 분석을 진행해주세요.</p>
            </div>
          )}

          {result && result.hasDanger && (
            <div className="danger-box">
              <h3>DUR 주의 정보 발견</h3>
              <p>
                입력한 약물에서 DUR 기준상 주의가 필요한 항목이 발견되었습니다.
              </p>
            </div>
          )}

          {result && !result.hasDanger && (
            <div className="safe-box">
              <h3>DUR 주의 정보 없음</h3>
              <p>
                현재 입력한 약물 조합에서는 주요 DUR 주의 정보가 발견되지
                않았습니다.
              </p>
            </div>
          )}

          {result && (
            <div className="warning-list">
              {result.warnings.map((warning, index) => (
                <div
                  key={index}
                  className={
                    warning.danger ? "warning-item danger" : "warning-item safe"
                  }
                >
                  <span>{warning.danger ? "!" : "✓"}</span>
                  <div>
                    <strong>
                      {warning.danger ? "⚠ " : "✓ "}
                      {warning.type}
                    </strong>
                    <p>{warning.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default DurCheck;
