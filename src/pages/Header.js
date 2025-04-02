import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }
    return (
        <div className="header">
            <div className="page-title" onClick={goHome}>creamCms 홈페이지 관리자 페이지</div>
            <div className="user-info">
                <span className="user-icon">👤</span>
                <span className="user-name">cms 님께서 로그인했습니다.</span>
                <button className="mypage">MY PAGE</button>
                <button className="logout">LOGOUT</button>
            </div>
            <div className="menu-tabs">
                <span>회원(관리자,사용자) 관리</span>
                <span>메뉴 관리</span>
                <span>컨텐츠 관리</span>
                <span>게시판 관리</span>
            </div>
        </div>
    );
}

export default Header;