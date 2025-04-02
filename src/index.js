import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from "App.js";
import {BrowserRouter} from "react-router-dom";




class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        if (
            error.message.includes("TextModel got disposed before DiffEditorWidget model got reset")
        ) {
            return { hasError: false }; // 이 에러는 무시
        }

        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught by ErrorBoundary:", error);
    }

    render() {
        if (this.state.hasError) {
            return <h1>문제가 발생했어요. 나중에 다시 시도해 주세요.</h1>;
        }

        return this.props.children;
    }
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
