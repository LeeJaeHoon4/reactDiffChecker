import {lazy, Suspense, useEffect, useRef, useState} from 'react';
import {sendCodeReview} from "@/api/codeReview";
import "@/css/codeReview.css";
import Editor from '@monaco-editor/react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import {
    CODE_HISTORY_KEY,
    TYPING_SPEED,
    PROGRESS_STEP,
    PROGRESS_DELAY,
    PROGRESS_MAX1,
    PROGRESS_MAX2,
    PROGRESS_MAX3,
    EDITOR_OPTIONS,
    ERROR_MESSAGES
} from '@/constants/codeReview';
import CodeReviewEditor from '@/components/codeReview/CodeReviewEditor';
import CodeReviewResult from '@/components/codeReview/CodeReviewResult';
import CodeReviewProgress from '@/components/codeReview/CodeReviewProgress';
import { useLocation } from 'react-router-dom';
import CodeHist from "@/pages/contentMange/codeHist";

const DiffEditorWrapper = lazy(() => import('@/components/DiffEditorWrapper'));

/**
 * GPT를 활용한 코드 리뷰 기능을 제공하는 컴포넌트
 * @component
 */
function CodeReview(){
    const editorRef = useRef(null);                         // 입력 코드 에디터 참조
    const [index, setIndex] = useState(0);                  // 타이핑 애니메이션 인덱스
    const responseRef = useRef(null);                       // 결과 코드 에디터 참조
    const [displayText, setText] = useState(false);         // 타이핑 애니메이션 표시 여부
    const [showDiff, setShowDiff] = useState(false);        // 차이점 표시 여부
    const [originalCode, setOriginalCode] = useState('');   // 원본 코드
    const [modifiedCode, setModifiedCode] = useState('');   // 수정된 코드
    const [responseText, setResponseText] = useState('');   // 결과 코드
    const [loading, setLoading] = useState(false);          // 로딩 상태
    const [progress, setProgress] = useState(0);            // 진행 상태
    const [error, setError] = useState(null);               // 오류 메시지
    const location = useLocation();

    useEffect(() => {
        // 히스토리에서 전달받은 코드와 리뷰가 있는 경우
        if (location.state?.originalCode && location.state?.reviewCode) {
            setOriginalCode(location.state.originalCode);
            setModifiedCode(location.state.reviewCode);
            setShowDiff(true);
        }
    }, [location.state]);

    /**
     * 에디터 마운트 이벤트 처리
     * @param {Object} editor - Monaco 에디터 인스턴스
     */
    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    /**
     * 결과 에디터 마운트 이벤트 처리
     * @param {Object} editor - Monaco 에디터 인스턴스
     */
    const handleResultDidMount = (editor) => {
        responseRef.current = editor;
    };

    /**
     * 코드 리뷰 제출 처리
     * @async
     */
    const codeSubmit = async () => {
        setLoading(true);
        setError(null);
        setProgress(0);

        try {
            const inputCode = editorRef.current?.getValue();
            if (!inputCode?.trim()) {
                throw new Error(ERROR_MESSAGES.EMPTY_CODE);
            }

            responseRef.current?.setValue('');
            setShowDiff(false);

            // 0~40%: 분석 중 진행 상태
            await new Promise((resolve) => {
                let currentProgress = 0;
                const interval = setInterval(() => {
                    currentProgress += PROGRESS_STEP;
                    setProgress(currentProgress);
                    
                    if (currentProgress >= PROGRESS_MAX1) {
                        clearInterval(interval);
                        resolve();
                    }
                }, PROGRESS_DELAY);
            });

            // 40~60%: 분석 완료 및 코드 개선 중
            await new Promise((resolve) => {
                let currentProgress = PROGRESS_MAX1;
                const interval = setInterval(() => {
                    currentProgress += PROGRESS_STEP;
                    setProgress(currentProgress);
                    
                    if (currentProgress >= PROGRESS_MAX2) {
                        clearInterval(interval);
                        resolve();
                    }
                }, PROGRESS_DELAY);
            });

            // API 호출
            const review = await sendCodeReview(inputCode);

            // 60~80%: 코드 개선 완료 및 리뷰 저장 중
            await new Promise((resolve) => {
                let currentProgress = PROGRESS_MAX2;
                const interval = setInterval(() => {
                    currentProgress += PROGRESS_STEP;
                    setProgress(currentProgress);
                    
                    if (currentProgress >= PROGRESS_MAX3) {
                        clearInterval(interval);
                        resolve();
                    }
                }, PROGRESS_DELAY);
            });

            // 히스토리 저장
            const historyItem = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                code: inputCode,
                review: review,
                title: `Code Review ${new Date().toLocaleString()}`
            };

            const existingHistory = JSON.parse(localStorage.getItem(CODE_HISTORY_KEY) || '[]');
            const updatedHistory = [historyItem, ...existingHistory];
            localStorage.setItem(CODE_HISTORY_KEY, JSON.stringify(updatedHistory));

            // 모든 진행이 완료된 후에만 리뷰 표시
            await new Promise((resolve) => {
                setTimeout(() => {
                    setResponseText(review);
                    setIndex(0);
                    setText(true);
                    setLoading(false);
                    setProgress(0);
                    resolve();
                }, 500);
            });

        } catch (error) {
            console.error('Code review error:', error);
            setError(error.message || ERROR_MESSAGES.SERVER_ERROR);
            setLoading(false);
            setProgress(0);
        }
    };

    /**
     * 타이핑 애니메이션 효과 처리
     */
    useEffect(() => {
        let timeout;
        if (displayText && index < responseText?.length && responseRef.current) {
            timeout = setTimeout(() => {
                if(responseRef.current){
                    const currentText = responseRef.current.getValue();
                    responseRef.current.setValue(currentText + responseText[index]);
                }
                setIndex((prev) => prev + 1);
            }, TYPING_SPEED);
        }
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [index, displayText, responseText]);

    /**
     * 원본 코드와 수정된 코드 비교
     */
    const diffCheck = () => {
        const original = editorRef.current?.getValue();
        const modified = responseRef.current?.getValue();

        if (!original?.trim() || !modified?.trim()) {
            setError(ERROR_MESSAGES.COMPARE_ERROR);
            return;
        }

        setOriginalCode(original);
        setModifiedCode(modified);
        setShowDiff(true);
        setError(null);
    };

    return (
        <div className="container">
            <CodeReviewProgress progress={progress} loading={loading} />

            {error && (
                <Box className="error-box">
                    {error}
                </Box>
            )}

            <div className="section-title">
                <h2>CodeReview With GPT</h2>
            </div>

            <div className="panel">
                <CodeReviewEditor onEditorMount={handleEditorDidMount} />
                <CodeReviewResult onResultMount={handleResultDidMount} />
            </div>

            <div className="button-container">
                <button 
                    className="submit-btn" 
                    onClick={codeSubmit}
                    disabled={loading}
                    aria-label="Submit code for review"
                >
                    전송
                </button>
                <button 
                    className="diff-check-btn" 
                    onClick={diffCheck}
                    disabled={loading}
                    aria-label="Compare code differences"
                >
                    차이점 찾기
                </button>
            </div>

            {showDiff && (
                <div className="panel">
                    <div className="editor-container">
                        <Suspense fallback={<div style={{color: 'white'}}>Diff 로딩 중...</div>}>
                            <DiffEditorWrapper 
                                original={originalCode} 
                                modified={modifiedCode}
                            />
                        </Suspense>
                    </div>
                </div>
            )}
        </div>
    );
}

CodeReview.propTypes = {
    // 필요한 경우 PropTypes 추가
};

export default CodeReview;