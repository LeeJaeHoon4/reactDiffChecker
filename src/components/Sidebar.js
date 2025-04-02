import React from 'react';
import '@/css/Sidebar.css'
import SidebarMenu from "@/components/SidebarMenu.js"

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src="/logo_w.png" alt="흰색 로고"/>
            </div>
            <div className="menu-tabs">
                <SidebarMenu/>
            </div>
        </div>
    );
}

export default Sidebar;