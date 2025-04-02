import {useNavigate} from "react-router-dom";
import "@/css/Header.css";

function Header() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }
    return (
        <div className="header">
            <div className="page-title" onClick={goHome}>개발 2팀 R&D CodeReview</div>
            <div className="user-info">
                <span className="user-icon">👤</span>
                <span className="user-name">개발2팀 님께서 로그인했습니다.</span>
                <button className="mypage">MY PAGE</button>
                <button className="logout">LOGOUT</button>
            </div>
        </div>
    );
}

export default Header;