import './css/App.css';
import React, {Fragment} from "react";
import RouterConfig from "@/router";
import Sidebar from "./pages/Sidebar";
import Header from "./pages/Header";
import {useLocation} from "react-router-dom";

function App() {
    const location = useLocation();

    return (

    <Fragment>
        {location.pathname !== '/' ? (
            <div className="app-layout">
                <Header />
                <div className="body-layout">
                    <Sidebar />
                    <div className="main-content">
                        <RouterConfig />
                    </div>
                </div>
            </div>
        ) : (
            <RouterConfig />
        )}
    </Fragment>
)
    ;
}

export default App;
