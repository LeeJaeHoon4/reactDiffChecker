import { useState, useEffect } from 'react';
import "@/css/codeHist.css";
import { Box } from '@mui/material';
import { CODE_HISTORY_KEY } from '@/constants/codeReview';
import CodeReviewHistory from '@/components/codeReview/CodeReviewHistory';
import { useNavigate } from 'react-router-dom';

function CodeHist() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // localStorage에서 히스토리 로드
        const loadHistory = () => {
            const savedHistory = JSON.parse(localStorage.getItem(CODE_HISTORY_KEY) || '[]');
            setHistory(savedHistory);
        };

        loadHistory();
    }, []);

    const handleDelete = (id) => {
        const updatedHistory = history.filter(item => item.id !== id);
        setHistory(updatedHistory);
        localStorage.setItem(CODE_HISTORY_KEY, JSON.stringify(updatedHistory));
    };

    const handleCompare = (code, review) => {
        // codeReview 페이지로 이동하면서 코드와 리뷰를 전달
        navigate('/codeReview', { 
            state: { 
                originalCode: code,
                reviewCode: review
            }
        });
    };

    return (
        <div className="container">
            <div className="section-title">
                <h2>Code Review History</h2>
            </div>

            <CodeReviewHistory 
                history={history}
                onDelete={handleDelete}
                onCompare={handleCompare}
            />
        </div>
    );
}

export default CodeHist;