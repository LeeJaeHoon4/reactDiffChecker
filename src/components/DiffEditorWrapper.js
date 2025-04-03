import { DiffEditor } from '@monaco-editor/react';
import { useRef, useEffect } from 'react';

function DiffEditorWrapper({ original, modified }) {
    const editorRef = useRef(null);

    useEffect(() => {
        return () => {
            try {
                if (editorRef.current) {
                    editorRef.current.dispose?.(); // 안전하게 dispose
                }
            } catch (e) {
                // 무시
                console.warn('Editor dispose 중 에러 무시:', e.message);
            }
        };
    }, []);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    return (
        <DiffEditor
            className="diff-block"
            original={original}
            modified={modified}
            language="markdown"
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
                readOnly: true,
                automaticLayout: true
            }}
        />
    );
}

export default DiffEditorWrapper;