import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from "App.js";
import {BrowserRouter} from "react-router-dom";

// ResizeObserver 에러 처리
const originalError = console.error;
console.error = (...args) => {
    if (args[0]?.includes?.('ResizeObserver') || 
        args[0]?.message?.includes?.('ResizeObserver')) {
        return;
    }
    originalError.apply(console, args);
};

// 웹팩 개발 서버 오버레이 숨기기
if (process.env.NODE_ENV === 'development') {
    const originalError = console.error;
    console.error = (...args) => {
        if (args[0]?.includes?.('ResizeObserver')) {
            return;
        }
        originalError.apply(console, args);
    };

    // 오버레이 요소 제거
    const removeOverlay = () => {
        const overlay = document.getElementById('webpack-dev-server-client-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    };

    // DOMContentLoaded 이벤트에서 오버레이 제거
    document.addEventListener('DOMContentLoaded', removeOverlay);
    // MutationObserver로 동적 추가되는 오버레이도 제거
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                removeOverlay();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
