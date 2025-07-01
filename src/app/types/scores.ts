// ---------------------------------------------
// ENUM 의존성 타입 임포트
// ---------------------------------------------
import { Month, Semester, Subject } from "../constants";

// ---------------------------------------------
// 1. PDF 파일 제출용 타입 정의 (2-2)
// ---------------------------------------------
export interface PdfSubmissionData {
  file: File;
}

// ---------------------------------------------
// 2. 성적 테이블 제출용 타입 정의 (3-1)
// ---------------------------------------------
export type SubjectType = '일반선택' | '진로선택' | '체육/예술';

export interface ScoreRowData {
  studentId: string;
  semester: string;
  subjectType: SubjectType;
  subject: string;
  course: string;
  unit: number;
  rawScore?: number;
  averageSubject?: number;
  stdDev?: number;
  totalStudents?: string;
  achievement: string;
  achievementPercentage?: number;
  grade?: string;
}

export const defaultScoreRowData: ScoreRowData = {
  studentId: "",
  semester: "",
  subjectType: "일반선택",
  subject: "",
  course: "",
  unit: 0,
  rawScore: 0,
  averageSubject: 0,
  totalStudents: "",
  achievement: "",
  achievementPercentage: 0,
  grade: "",
};

export interface TableSubmissionData {
  studentName: string;
  contact: string;
  rows: ScoreRowData[];
}

// ---------------------------------------------
// 3. 모의고사 제출용 타입 정의
// ---------------------------------------------
export interface MonthlyMockTestGrade {
  korean: string;
  math: string;
  english: string;
  inquiry1Type: string;
  inquiry1Subject: string;
  inquiry1Grade: string;
  inquiry2Type: string;
  inquiry2Subject: string;
  inquiry2Grade: string;
  koreanHistory: string;
}

export const defaultMonthlyScore: MonthlyMockTestGrade = {
  korean: '',
  math: '',
  english: '',
  inquiry1Type: '',
  inquiry1Subject: '',
  inquiry1Grade: '',
  inquiry2Type: '',
  inquiry2Subject: '',
  inquiry2Grade: '',
  koreanHistory: '',
};

export interface MockTestSubmissionData {
  studentId: string;
  scores: Partial<Record<Month, MonthlyMockTestGrade>>;
}

// ---------------------------------------------
// 4. 성적 통합 제출 타입 정의 (Union)
// ---------------------------------------------
export type ScoreSubmissionData =
  | { type: 'pdf'; data: PdfSubmissionData }
  | { type: 'mock'; data: MockTestSubmissionData }
  | { type: 'table'; data: TableSubmissionData };

// ---------------------------------------------
// 5. 성적 제출 상태
// ---------------------------------------------
export interface ScoreSubmissionStatus {
  contact: string;
  scoreSubmission_2: string;
  scoreSubmission_3: string;
  scoreSubmission_mockTest: string;
}

// ---------------------------------------------
// 6. 내신과 모의고사 성적 통합
// ---------------------------------------------
export interface StudentCombinedScores {
  studentId: string;
  subjectScores: ScoreRowData[]; // 교과 성적 (내신)
  mockTestScores: Partial<Record<Month, MonthlyMockTestGrade>>; // 모의고사 성적
}

// ---------------------------------------------
// 7. 성적 분석용 구조
// ---------------------------------------------
export type SubjectGrade = {
  [subject in Subject]?: number;
};

export type SemesterGrade = {
  [semester in Semester]?: SubjectGrade;
};

export interface TotalScores {
  studentId: string;
  bySemester: SemesterGrade;
  overallGrade: number;
}

export interface OverallGradeForChart {
  semester: string;
  grade: number | null;
  originalGrade: number | null;
}

// ---------------------------------------------
// 8. 비교과(서술형) 평가 타입 정의
// ---------------------------------------------
export interface NonScoreRowData {
  creativeActive: string;
  detailedAndSpecial: string;
  generalOpinion?: string;
}

export type SemesterNonScore = {
  [semester in Semester]?: NonScoreRowData;
};

export interface NonScoreSummary {
  studentId: string;
  bySemester: SemesterNonScore;
}