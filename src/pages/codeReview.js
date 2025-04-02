import {lazy, Suspense, useEffect, useRef, useState} from 'react';
import "@/css/codeReview.css";
import Editor from '@monaco-editor/react';

const DiffEditorWrapper = lazy(() => import('@/components/DiffEditorWrapper'));

function CodeReview(){
    const [displayText,setText] = useState(false);
    const [index, setIndex] = useState(0);
    const editorRef = useRef(null);
    const responseRef = useRef(null);
    const [showDiff, setShowDiff] = useState(false);
    const [originalCode, setOriginalCode] = useState('');
    const [modifiedCode, setModifiedCode] = useState('');

    const responseText = `
# 📢 PR 리뷰 요약

## 1️⃣ PR 개요
- **기능:** [어떤 기능/버그 수정인지 간략히 설명]
- **주요 변경 사항:**
  - [주요 코드 수정 내용 (ex. 함수 추가, 로직 변경, 리팩토링 등)]
  - [중요한 아키텍처 변경사항이 있다면 설명]

## 2️⃣ 코드 품질 리뷰
✅ **잘된 점**:
- [코드의 좋은 점 (ex. 가독성, 모듈화, 재사용성 등)]
- [효율적인 알고리즘/디자인 패턴 사용 여부]

⚠️ **개선 필요 사항**:
- [명확하지 않은 코드 또는 개선이 필요한 부분]
- [성능 최적화가 가능한 부분]
- [예외 처리 누락, 보안 문제, 사이드 이펙트 발생 가능성]

## 3️⃣ 추가 피드백 & 추천
💡 **제안하는 개선 사항**:
- [더 나은 코드 구조/설계 제안]
- [리팩토링 제안]

📌 **요청 사항**:
- [추가 확인이 필요한 부분 (ex. 문서화, 주석 추가 등)]
- [수정 후 다시 리뷰 요청할지 여부]

✅ **최종 결론**:
- [🔹 LGTM (Looks Good To Me) / ⏳ Needs Changes / ❌ Request Changes]

되도록이면 동작확인에 대한 리뷰는 제외하고 코드 품질, 개선 사항 등 위의 양식 위주로 진행합니다.
`;
    // Monaco editor 인스턴스가 마운트될 때 참조 저장
    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleResultDidMount = (editor) => {
        responseRef.current = editor;
    };

    useEffect(() => {
        if (displayText && index < responseText.length && responseRef.current) {
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


    const codeSubmit = () => {
        console.log(editorRef.current.getValue());

        // DiffEditor 먼저 unmount
        setShowDiff(false);

        // 언마운트가 끝났을 시간쯤에 텍스트 처리 시작
        setTimeout(() => {
            if (responseRef.current?.getValue()) {
                responseRef.current.setValue('');
            }
            setIndex(0);
            setText(true);
        }, 100); // 1ms → 100ms 정도로 여유 있게
    };

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
    return (
        <div className="container">
            <div className="section-title">
                <h2>CodeReview With GPT</h2>
            </div>
            <div className="panel">
                <div className="editor-container">
                    <Editor
                        className="code-block"
                        height="400px"
                        defaultLanguage="markdown"
                        theme="vs-dark"
                        onMount={handleEditorDidMount}
                        options={{
                            automaticLayout: true  // 요거 중요!
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
                <Suspense fallback={<div style={{color: 'white'}}>Diff 로딩 중...</div>}>
                    <DiffEditorWrapper original={originalCode} modified={modifiedCode}/>
                </Suspense>
            )}
        </div>
    );
}

export default CodeReview;