import { useNavigate } from "react-router-dom";
import "../styles/LoginRequiredCard.css";

interface Props {
  title?: string;
  description?: string;
}

function LoginRequiredCard({
  title = "로그인 후 이용할 수 있습니다",
  description = "회원 전용 서비스입니다.",
}: Props) {
  const navigate = useNavigate();

  return (
    <section className="login-required-box">
      <h2>{title}</h2>

      <p>{description}</p>

      <button className="login-move-btn" onClick={() => navigate("/login")}>
        로그인하러 가기
      </button>
    </section>
  );
}

export default LoginRequiredCard;
