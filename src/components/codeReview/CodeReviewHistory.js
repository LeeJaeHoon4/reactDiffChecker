import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CompareIcon from '@mui/icons-material/Compare';
import Editor from '@monaco-editor/react';
import { EDITOR_OPTIONS } from '@/constants/codeReview';


function CodeReviewHistory({ history, onDelete, onCompare }) {
    if (history.length === 0) {
        return (
            <Box className="empty-state">
                <Typography variant="h6" color="text.secondary">
                    아직 저장된 코드 리뷰가 없습니다.
                </Typography>
            </Box>
        );
    }

    return (
        <Box className="history-list">
            {history.map((item) => (
                <Accordion key={item.reviewSeq}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <Box className="accordion-header">
                            <Typography variant="subtitle1">
                                {item.regDt.split('T')[0] + " " + item.reviewSeq + "번째 리뷰"}
                            </Typography>
                            <Box className="accordion-actions">
                                <div
                                    className="compare-button MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeSmall"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCompare(item.originalCode, item.reviewCode);
                                    }}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <CompareIcon className="MuiButton-startIcon" />
                                    비교
                                </div>
                                <div 
                                    className="MuiIconButton-root MuiIconButton-sizeSmall"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(item.reviewSeq);
                                    }}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <DeleteIcon />
                                </div>
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box className="code-section">
                            <Typography variant="subtitle2" className="editor-title">
                                원본 코드
                            </Typography>
                            <Paper className="editor-paper">
                                <Editor
                                    className="history-code-block"
                                    height="200px"
                                    defaultLanguage="markdown"
                                    theme="vs-dark"
                                    value={item.originalCode}
                                    options={EDITOR_OPTIONS}
                                />
                            </Paper>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" className="editor-title">
                                리뷰 결과
                            </Typography>
                            <Paper className="editor-paper">
                                <Editor
                                    className="history-result-block"
                                    height="200px"
                                    defaultLanguage="markdown"
                                    theme="vs-dark"
                                    value={item.reviewCode}
                                    options={EDITOR_OPTIONS}
                                />
                            </Paper>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}

export default CodeReviewHistory; 