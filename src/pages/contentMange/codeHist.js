import { useState, useEffect } from 'react';
import "@/css/codeHist.css";
import { Box } from '@mui/material';
import { CODE_HISTORY_KEY } from '@/constants/codeReview';
import CodeReviewHistory from '@/components/codeReview/CodeReviewHistory';
import { useNavigate } from 'react-router-dom';
import { getCodeReviewHistory, deleteCodeReviewHistory } from '@/api/codeReview';

function CodeHist() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const savedHistory = await getCodeReviewHistory();
        console.log("savedHistory",savedHistory);
        setHistory(savedHistory.content);
    };

    const handleDelete = async (seq) => {
        const updatedHistory = await deleteCodeReviewHistory(+seq);
        loadHistory();
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