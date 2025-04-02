import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

function MonacoEditor() {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const getCodeValue = () => {
        const value = editorRef.current.getValue();
        console.log('🚀 입력된 코드:', value);
    };

    return (
        <div>
            <h2>💻 코드 입력</h2>
            <Editor
                height="500px"
                defaultLanguage="javascript"
                defaultValue={`function hello() {\n  console.log("Hello world!");\n}`}
                theme="vs-dark" // or 'light', 'hc-black'
                onMount={handleEditorDidMount}
            />

            <button className="submit-btn" onClick={getCodeValue}>
                전송
            </button>
        </div>
    );
}

export default MonacoEditor;