// 성적 제출 상태 상수
export const SUBMISSION_STATUS = {
    NOT_SUBMITTED: '미제출',
    IN_PROGRESS: '입력중',
    DONE: '완료',
} as const;

export type SubmissionStatus = typeof SUBMISSION_STATUS[keyof typeof SUBMISSION_STATUS];

// 
export interface StudentScoreSubmission {
    contact: string;
    scoreSubmission_2: SubmissionStatus;
    scoreSubmission_3: SubmissionStatus;
    scoreSubmission_mockTest: SubmissionStatus;
}

// 성적 제출 타입 정의
export const SCORE_SUBMISSION_TYPE = {
    SCORE_SUBMISSION_2: 'scoreSubmission_2',
    SCORE_SUBMISSION_3: 'scoreSubmission_3',
    SCORE_SUBMISSION_MOCK_TEST: 'scoreSubmission_mockTest',
} as const;
export type ScoreSubmissionType = typeof SCORE_SUBMISSION_TYPE[keyof typeof SCORE_SUBMISSION_TYPE];

export const MOCK_TEST_MONTHS = ['march', 'june', 'september', 'november'] as const;
export type Month = typeof MOCK_TEST_MONTHS[number];

export const monthLabelMap: Record<Month, string> = {
    march: '3월 모의고사',
    june: '6월 모의고사',
    september: '9월 모의고사',
    november: '11월 모의고사',
};

export const inquiryOptions = {
    science: [
        { value: 'physics1', label: '물리학 I' },
        { value: 'physics2', label: '물리학 II' },
        { value: 'chemistry1', label: '화학 I' },
        { value: 'chemistry2', label: '화학 II' },
        { value: 'biology1', label: '생명과학 I' },
        { value: 'biology2', label: '생명과학 II' },
        { value: 'earth1', label: '지구과학 I' },
        { value: 'earth2', label: '지구과학 II' },
    ],
    social: [
        { value: 'ethics1', label: '생활과 윤리' },
        { value: 'ethics2', label: '윤리와 사상' },
        { value: 'geography1', label: '한국지리' },
        { value: 'geography2', label: '세계지리' },
        { value: 'history1', label: '동아시아사' },
        { value: 'history2', label: '세계사' },
        { value: 'politics', label: '정치와 법' },
        { value: 'economics', label: '경제' },
        { value: 'society', label: '사회·문화' },
    ]
};

