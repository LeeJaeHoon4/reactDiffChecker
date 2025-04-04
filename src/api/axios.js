import axios from 'axios';
const AXIOS_BASE_URL = process.env.REACT_APP_AXIOS_BASE_URL || 'http://localhost';
const AXIOS_PORT = process.env.REACT_APP_AXIOS_API_PORT || '8080';
const API_URL = `${AXIOS_BASE_URL}:${AXIOS_PORT}`;

const instance = axios.create({
    baseURL: API_URL,
    timeout: 55000,
    withCredentials: true,            // 세션/쿠키 사용 시 반드시 필요
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;

