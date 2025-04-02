import './css/App.css';
import React, {Fragment} from "react";
import Header from '@/pages/Header';
import Sidebar from '@/pages/Sidebar';
import RouterConfig from "@/router";

function App() {
    return (
        <Fragment>
            <div className="app-layout">
                <Header/>
                <div className="body-layout">
                    <Sidebar/>
                    <div className="main-content">
                        <RouterConfig/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
