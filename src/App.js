import './css/App.css';
import React, {Fragment} from "react";
import Header from '@/pages/Header';
import RouterConfig from "@/router";

function App() {
    return (
        <Fragment>
            <Header/>
            <RouterConfig />
        </Fragment>
    );
}

export default App;
