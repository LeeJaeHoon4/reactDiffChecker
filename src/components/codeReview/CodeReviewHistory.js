import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, IconButton, Button } from '@mui/material';
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
                <Accordion key={item.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <Box className="accordion-header">
                            <Typography variant="subtitle1">
                                {item.title}
                            </Typography>
                            <Box className="accordion-actions">
                                <Button
                                    className="compare-button"
                                    variant="outlined"
                                    size="small"
                                    startIcon={<CompareIcon />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCompare(item.code, item.review);
                                    }}
                                >
                                    비교
                                </Button>
                                <IconButton 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(item.id);
                                    }}
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
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
                                    value={item.code}
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
                                    value={item.review}
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