import { Box, LinearProgress, Typography } from '@mui/material';

function CodeReviewProgress({ progress, loading }) {
    if (!loading) return null;

    return (
        <Box className="loadingOverlay">
            <Box sx={{ width: '50%', mb: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Typography variant="h6" sx={{ color: '#fff' }}>
                {progress < 40
                    ? `${progress}% 분석 중...`
                    : progress < 61 
                        ? <>분석 완료!!<br/>코드 개선 사항 작성중~</>
                        : progress <= 80 
                        ? <>코드 개선 사항 작성완료!! <br/> 코드 리뷰 이력 저장중~</> 
                        : progress > 80
                        ? <>저장 완료!!<br/>최종 처리중~</>
                        : null}
            </Typography>
        </Box>
    );
}

export default CodeReviewProgress; 