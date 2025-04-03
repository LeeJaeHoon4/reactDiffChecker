import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 55000,
    withCredentials: true,            // 세션/쿠키 사용 시 반드시 필요
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;