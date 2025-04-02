import {Fragment, useEffect, useRef} from "react";
import { useNavigate } from 'react-router-dom';

function Body(){
    const leftEyeRef = useRef(null);
    const rightEyeRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (event) => {
            const moveEye = (eyeRef) => {
                if (!eyeRef.current) return;

                const eye = eyeRef.current;
                const rect = eye.getBoundingClientRect();
                const eyeX = rect.left + rect.width / 2;
                const eyeY = rect.top + rect.height / 2;

                const deltaX = event.clientX - eyeX;
                const deltaY = event.clientY - eyeY;
                const angle = Math.atan2(deltaY, deltaX); // 마우스 방향으로 각도 계산

                const maxMove = 5; // 눈동자가 최대 이동할 거리 (픽셀)
                const moveX = Math.cos(angle) * maxMove;
                const moveY = Math.sin(angle) * maxMove;

                eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
            };

            moveEye(leftEyeRef);
            moveEye(rightEyeRef);
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <Fragment>
            <form className="AppLogo">
                <img src="/bear.png" alt="곰돌이" className="bear" onClick={() => navigate("/codeReview")}/>
                <div className="eye left-eye" ref={leftEyeRef}></div>
                <div className="eye right-eye" ref={rightEyeRef}></div>
            </form>
        </Fragment>
    );
}

export default Body;