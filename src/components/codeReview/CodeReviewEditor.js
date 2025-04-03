import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { EDITOR_OPTIONS } from '@/constants/codeReview';

function CodeReviewEditor({ onEditorMount }) {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
        onEditorMount(editor);
    };

    return (
        <div className="editor-container">
            <Editor
                className="code-block"
                defaultLanguage="markdown"
                theme="vs-dark"
                onMount={handleEditorDidMount}
                options={{
                    ...EDITOR_OPTIONS,
                    readOnly: false
                }}
            />
        </div>
    );
}

export default CodeReviewEditor; 