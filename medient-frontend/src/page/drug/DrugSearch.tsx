import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchDrugs } from "../../api/drugApi";
import type { DrugSearchResponse } from "../../types/Drug";
import "../../styles/DrugSearch.css";

function DrugSearch() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [drugs, setDrugs] = useState<DrugSearchResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("약 이름을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const data = await searchDrugs(keyword);
      setDrugs(data);
    } catch (error) {
      console.error(error);
      alert("약 검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="drug-search-page">
      <h1 className="page-title">약 검색</h1>

      <section className="search-card">
        <label>약 이름 검색</label>

        <div className="search-input-row">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          <button onClick={handleSearch}>검색</button>
        </div>
      </section>

      <h2 className="result-title">검색 결과</h2>

      <section className="drug-result-list">
        {loading && <p className="empty-text">검색 중입니다...</p>}

        {!loading &&
          drugs.map((drug) => (
            <div className="drug-card" key={drug.itemSeq}>
              <img
                className="drug-image"
                src={drug.itemImage}
                alt={drug.itemName}
              />

              <div className="drug-info">
                <div className="info-row">
                  <span>제품명</span>
                  <p>{drug.itemName}</p>
                </div>

                <div className="info-row">
                  <span>업체명</span>
                  <p>{drug.entpName}</p>
                </div>

                <div className="info-row">
                  <span>효능</span>
                  <p>{drug.efcyQesitm}</p>
                </div>

                <div className="info-row">
                  <span>사용법</span>
                  <p>{drug.useMethodQesitm}</p>
                </div>

                <button
                  className="detail-btn"
                  onClick={() => navigate(`/drugs/${drug.itemSeq}`)}
                >
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default DrugSearch;
