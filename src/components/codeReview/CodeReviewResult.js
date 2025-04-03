import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { EDITOR_OPTIONS } from '@/constants/codeReview';

function CodeReviewResult({ onResultMount }) {
    const responseRef = useRef(null);

    const handleResultDidMount = (editor) => {
        responseRef.current = editor;
        onResultMount(editor);
    };

    return (
        <div className="result-container">
            <Editor
                className="result-block"
                theme="vs-dark"
                language="markdown"
                options={EDITOR_OPTIONS}
                onMount={handleResultDidMount}
            />
        </div>
    );
}

export default CodeReviewResult; 