import React, {Fragment} from "react";
import { useNavigate} from "react-router-dom";

function Header(){
    const navigate = useNavigate();

    const goHome = () =>{

        navigate("/");
    }
   return (
    <Fragment >
        <div className="header" onClick={goHome}>
            <h1>개발 2팀 R&D AI를 사용한 CodeReview</h1>
        </div>
    </Fragment>
   );
}

export default Header;