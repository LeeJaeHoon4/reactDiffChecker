import {useState} from "react";
import "@/css/SidebarMenu.css";

function SidebarMenu(){
    const menuData = [
        {
            title: '콘텐츠 관리',
            children: ['게시판 관리', '이미지 관리', '팝업 관리'],
        },
        {
            title: '회원 관리',
            children: ['사용자 목록', '권한 설정'],
        },
        {
            title: '환경 설정',
            children: ['사이트 설정', '메뉴 설정'],
        }
    ];

    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (index) => {
        setOpenMenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };


    return (
        <ul className="sidebar-menu">
            {menuData.map((menu, index) => (
                <li key={index} className="menu-item">
                    <button onClick={() => toggleMenu(index)}>
                        {menu.title}
                    </button>
                    <ul className={`submenu ${openMenus[index] ? 'open' : ''}`}>
                        {menu.children.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}

export default SidebarMenu;