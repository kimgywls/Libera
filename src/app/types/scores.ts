import { Month } from "../constants"; // "March" | "June" | "September" | "November" 같은 문자열 enum

// ---------------------------------------------
//1. [2-2] PDF 파일 제출용 타입 정의
// ---------------------------------------------

// PDF 제출 데이터 구조: 단일 파일만 제출
export interface PdfSubmissionData {
  file: File;
}

// ---------------------------------------------
// 2. [3-1] 성적 테이블 제출용 타입 정의
// ---------------------------------------------

// 개별 행(과목)에 대한 성적 데이터 구조
export interface ScoreRowData {
  subjectType: "일반선택" | "진로선택"; // 이수 구분
  subject: string;         // 교과명 (예: 수학)
  course: string;          // 과목명 (예: 수학 I)
  rawScore: string;        // 원점수
  average: string;         // 평균
  unit: string;            // 단위 수
  totalStudents: string;   // 이수자 수
  grade?: string;          // 등급 (선택)
  achievement?: string;    // 성취도 (선택)
}

// ScoreRowData의 초기값
export const defaultScoreRowData: ScoreRowData = {
  subjectType: "일반선택",
  subject: "",
  course: "",
  rawScore: "",
  average: "",
  unit: "",
  totalStudents: "",
  grade: "",
  achievement: "",
};

// 전체 테이블 제출 데이터 구조
export interface TableSubmissionData {
  studentName: string;
  contact: string;
  rows: ScoreRowData[]; // 여러 과목 입력
}

// ---------------------------------------------
// 3. 모의고사 제출용 타입 정의
// ---------------------------------------------

// 월별 모의고사 성적 구조 (3~6과목)
export interface MonthlyMockTestScore {
  korean: string;             // 국어
  math: string;               // 수학
  english: string;            // 영어
  inquiry1Type: string;       // 탐구1 영역 (사회/과학)
  inquiry1Subject: string;    // 탐구1 과목
  inquiry1Grade: string;      // 탐구1 등급
  inquiry2Type: string;       // 탐구2 영역
  inquiry2Subject: string;    // 탐구2 과목
  inquiry2Grade: string;      // 탐구2 등급
  koreanHistory: string;      // 한국사
}

// 초기값 정의
export const defaultMonthlyScore: MonthlyMockTestScore = {
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

// 전체 모의고사 제출 데이터
export interface MockTestSubmissionData {
  studentName: string;
  contact: string;
  scores: Record<Month, MonthlyMockTestScore>; // 월별 모의고사 점수
}

// ---------------------------------------------
// 4. 모든 성적 제출 타입 통합 정의 (Union Type)
// ---------------------------------------------

// type은 'pdf', 'mock', 'table' 중 하나이며, 각각에 맞는 데이터 구조가 필요
export type ScoreSubmissionData =
  | { type: 'pdf'; data: PdfSubmissionData }
  | { type: 'mock'; data: MockTestSubmissionData }
  | { type: 'table'; data: TableSubmissionData };
