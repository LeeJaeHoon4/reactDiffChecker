import {lazy, startTransition, Suspense, useEffect, useRef, useState} from 'react';
import {getCodeReview} from "@/api/codeReview";
import "@/css/codeReview.css";
import Editor from '@monaco-editor/react';
import {  Box, LinearProgress, Typography } from '@mui/material';

const DiffEditorWrapper = lazy(() => import('@/components/DiffEditorWrapper'));

function CodeReview(){
    const editorRef = useRef(null);             // code-block side 값 ref
    const [index, setIndex] = useState(0);                  // result-block side 타이핑 효과를 위한 index
    const responseRef = useRef(null);           //  axios 이후 result-block side에 표시될 값 ref
    const [displayText,setText] = useState(false);          // result-block side 랜더링 처리를 위한 useState
    const [showDiff, setShowDiff] = useState(false);       //  Diff checker side 랜더링 처리를 위한 flag
    const [originalCode, setOriginalCode] = useState('');   // Diff Checker 비교값 - code-block side
    const [modifiedCode, setModifiedCode] = useState('');   // Diff Checker 비교값 - result-block side
    const [responseText, setResponseText] = useState('');   // GPT Code Review 값 처리
    const [loading, setLoading] = useState(false);        // MUI를 사용한 로딩바 처리
    const [progress, setProgress] = useState(0);          // 로딩바 progress 처리

    //code-block 쪽 입력 값 처리 - start
    const handleEditorDidMount = (editor) => {
        // Monaco editor 인스턴스가 마운트될 때 참조 저장
        editorRef.current = editor;
    };

    const codeSubmit = async () => {
        //코드 전송 버튼 클릭시 동작
        setLoading(true);

        await (async () => {
            const inputCode = editorRef.current.getValue();
            //result-block 쪽 텍스트 reference 를 초기화 하여 재 랜더링 유도
            responseRef.current.setValue('');

            try {
                // DiffEditor 먼저 unmount - 하지 않으면 에러 발생
                setShowDiff(false);
                for (let i = 0; i <= 80; i += 5) {
                    await new Promise((res) => setTimeout(res, 50)); // 딜레이
                    setProgress(i);
                }
                //실제로 응답을 받은 시점 이후로 체이닝을 걸어서 로딩바 동작을 현실성 있게 조작
                await getCodeReview(inputCode).then((review) =>{
                    setLoading(false); //로딩창 닫기
                    setResponseText(review);
                    setIndex(0);
                    setText(true);
                });

            } catch (error) {
                alert("백엔드 서버로 부터 응답을 받을 수 없습니다.");
            } finally {
                setLoading(false); //로딩창 닫기
                setProgress(0); // 초기화
            }
        })();
    };
    //code-block 쪽 입력 값 처리 - end

    //result-block 쪽 입력 값 처리 - start
    const handleResultDidMount = (editor) => {
        // Monaco editor 인스턴스가 마운트될 때 참조 저장
        responseRef.current = editor;
    };

    useEffect(() => {
        if (displayText && index < responseText?.length && responseRef.current) {
            const timeout = setTimeout(() => {
                if(responseRef.current){
                    const currentText = responseRef.current.getValue();
                    responseRef.current.setValue(currentText +responseText[index]);
                }
                setIndex((prev) => prev+1);
            }, 10); // 속도 조절 (ms)

            return () => clearTimeout(timeout);
        }
    }, [index, displayText,responseText]);
    //result-block 쪽 입력 값 처리 - end

    //DiffChecker 기능 -start
    const diffCheck = () =>{
        const original = editorRef.current.getValue();
        const modified = responseRef.current.getValue();

        if (original.trim() && modified.trim()) {
            setOriginalCode(original);
            setModifiedCode(modified);
            setShowDiff(true);
        } else {
            alert('두 영역 모두에 값이 있어야 차이점을 비교할 수 있어요.');
        }
    }
    //DiffChecker 기능 -end
    return (
        <div className="container">
            {loading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1300,
                    }}
                >
                    <Box sx={{ width: '50%', mb: 2 }}>
                        <LinearProgress variant="determinate" value={progress} />
                    </Box>
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                        {progress < 50
                            ? `${progress}% 분석 중...`
                            : progress < 100
                                ? <>분석 완료!!<br/>코드 개선 사항 작성중~</>
                                : '작업 완료!!!'}
                    </Typography>
                </Box>
            )}
            <div className="section-title">
                <h2>CodeReview With GPT</h2>
            </div>
            <div className="panel">
                <div className="editor-container">
                    <Editor
                        className="code-block"
                        defaultLanguage="markdown"
                        theme="vs-dark"
                        onMount={handleEditorDidMount}
                        options={{
                            automaticLayout: true
                        }}
                    />
                </div>

                <div className="result-container">
                    <Editor
                        className="result-block"
                        theme="vs-dark"
                        language="markdown"
                        options={{
                            readOnly: true,
                            automaticLayout: true
                        }}
                        onMount={handleResultDidMount}
                    />
                </div>
            </div>

            <button className="submit-btn" onClick={codeSubmit}>전송</button>
            <button className="diff-check-btn" onClick={diffCheck}>차이점 찾기</button>

            {showDiff && (
                <div className="panel">
                    <div className="editor-container">
                        <Suspense fallback={<div style={{color: 'white'}}>Diff 로딩 중...</div>}>
                            <DiffEditorWrapper original={originalCode} modified={modifiedCode}/>
                        </Suspense>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CodeReview;