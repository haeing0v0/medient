import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/userApi";
import "../../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login({ userId, password });

      localStorage.setItem("loginUser", JSON.stringify(data));

      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page-title">로그인 / 회원가입</h1>

      <section className="auth-card">
        <h2>로그인</h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>아이디</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">로그인</button>
        </form>

        <Link to="/join" className="auth-link">
          아직 계정이 없나요? 회원가입하기
        </Link>
      </section>
    </div>
  );
}

export default Login;
