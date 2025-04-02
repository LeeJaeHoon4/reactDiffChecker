import React from 'react';
import '@/css/Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">
                <h1>CREAMHOUSE</h1>
                <p>Enjoy our creative dream</p>
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

export default Sidebar;