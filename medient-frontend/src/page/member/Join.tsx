import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/userApi";
import "../../styles/Auth.css";

function Join() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [isPregnant, setIsPregnant] = useState("");

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !password || !userName || !gender || !age || !isPregnant) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await signup({
        userId,
        password,
        userName,
        gender,
        age: Number(age),
        isPregnant: isPregnant === "true",
      });

      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page-title">로그인 / 회원가입</h1>

      <section className="auth-card join-card">
        <h2>회원가입</h2>

        <form className="auth-form" onSubmit={handleJoin}>
          <label>아이디</label>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} />

          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="form-grid">
            <div>
              <label>이름</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label>성별</label>
              <select
                className="select-input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">선택</option>
                <option value="male">남자</option>
                <option value="female">여자</option>
              </select>
            </div>

            <div>
              <label>나이</label>
              <select
                className="select-input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">선택</option>
                {Array.from({ length: 101 }, (_, i) => i).map((age) => (
                  <option key={age} value={age}>
                    {age}세
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>임신 여부 선택</label>
              <select
                className="select-input"
                value={isPregnant}
                onChange={(e) => setIsPregnant(e.target.value)}
              >
                <option value="">선택</option>
                <option value="true">예</option>
                <option value="false">아니오</option>
              </select>
            </div>
          </div>

          <p className="join-guide">
            닉네임은 개인정보 보호를 위해 랜덤 생성됩니다. 예: 신나는 호랑이
          </p>

          <button type="submit" className="join-submit-btn">
            가입하기
          </button>
        </form>
      </section>
    </div>
  );
}

export default Join;
