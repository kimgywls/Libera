export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GRADE_HEADER_STRUCTURE: Record<string, string[]> = {
    "1학년": ["1-1", "1-2"],
    "2학년": ["2-1", "2-2"],
    "3학년": ["3-1"],
};

// 학기 상수
export const SEMESTER = {
    FIRST_SEMESTER: '1-1',
    SECOND_SEMESTER: '1-2',
    THIRD_SEMESTER: '2-1',
    FOURTH_SEMESTER: '2-2',
    FIFTH_SEMESTER: '3-1',
} as const;

export type Semester = typeof SEMESTER[keyof typeof SEMESTER];

// 전체 과목 상수
export const SUBJECTS = [
    "국어",
    "영어",
    "수학",
    "사회(한국사)",
    "과학",
    "국+영+사",
    "수+영+과",
    "수+과",
    "국+수+영+사(한)",
    "국+수+영+과",
    "국+수+영+사(한)+과",
    "전과목",
] as const;

export type Subject = (typeof SUBJECTS)[number];

// 차트 표시 과목 상수
export const DISPLAY_SUBJECTS = [
    "전과목",
    "국+수+영+사(한)+과",
    "국+수+영+과",
    "국+수+영+사(한)",
    "수학",
    "영어",
    "국어",
] as const;

export type DisplayChartSubject = (typeof DISPLAY_SUBJECTS)[number];

export const SUBJECT_TYPES = ["일반선택", "진로선택", "체육/예술"] as const;
export type SubjectType = (typeof SUBJECT_TYPES)[number];

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

