import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLoginUser, isTokenExpired, logoutUser } from "../utils/auth";
import "../styles/Layout.css";

interface LoginUser {
  userNo: number;
  userId: string;
  userName: string;
  age: number;
  gender: string;
  isPregnant: boolean;
}

function Layout() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    const savedUser = getLoginUser();

    if (!savedUser) {
      setLoginUser(null);
      return;
    }

    if (isTokenExpired(savedUser.token)) {
      logoutUser();
      setLoginUser(null);
      alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    setLoginUser(savedUser);
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event("loginStateChange"));
    setLoginUser(null);
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div className="app-layout">
      <header className="navbar">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">💊</span>
          <span>Medient</span>
        </Link>

        <nav className="navbar-menu">
          <NavLink to="/">홈</NavLink>
          <NavLink to="/drugs">약검색</NavLink>
          <NavLink to="/my-medicine">내복용약</NavLink>
          <NavLink to="/dur-check">안전체크</NavLink>
          <NavLink to="/statistics">통계</NavLink>
        </nav>

        <div className="navbar-auth">
          {loginUser && (
            <span className="login-user-name">{loginUser.userName}님</span>
          )}

          {loginUser ? (
            <button className="navbar-login" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <Link to="/login" className="navbar-login">
              로그인
            </Link>
          )}
        </div>
      </header>

      <main className="layout-content">
        <Outlet />
      </main>

      <footer className="global-footer">
        <div>
          <h3>💊 Medient</h3>
          <p>DUR 공공데이터 기반 개인 맞춤 복약 안전 관리 서비스</p>
        </div>

        <p className="footer-copy">© 2026 Medient. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
