// 코드 리뷰 관련 상수
export const CODE_HISTORY_KEY = 'codeReviewHistory';

// 에디터 관련 상수
export const TYPING_SPEED = 10;  // 1글자 타이핑 속도 (ms)
export const PROGRESS_STEP = 5;  // 진행 상태 업데이트 간격 (%)
export const PROGRESS_DELAY = 50;  // 진행 상태 업데이트 지연 시간 (ms)
export const PROGRESS_MAX1 = 40;  // 최대 진행 상태 (%)
export const PROGRESS_MAX2 = 60;  // 최대 진행 상태 (%)
export const PROGRESS_MAX3 = 80;  // 최대 진행 상태 (%)


// 에디터 옵션
export const EDITOR_OPTIONS = {
    automaticLayout: true,
    minimap: { enabled: false },
    readOnly: true
};

// 에러 메시지
export const ERROR_MESSAGES = {
    EMPTY_CODE: '코드를 입력해주세요.',
    SERVER_ERROR: '서버로부터 응답을 받을 수 없습니다.',
    COMPARE_ERROR: '두 영역 모두에 값이 있어야 차이점을 비교할 수 있습니다.'
}; 