// 성적 제출 타입 정의
export type ScoreType = '2' | '3' | 'mockTest';

// 2-2 PDF 파일 제출 데이터
export interface PdfSubmissionData {
  file: File;
}

// 3-1 성적 입력 타입 정의
export interface ScoreRowData {
  subjectType: "일반선택" | "진로선택";
  subject: string;
  course: string;
  rawScore: string;
  average: string;
  unit: string;
  totalStudents: string;
  grade: string;
  achievement: string;

}

// mocktest 폼 데이터 제출 타입 정의
export interface FormSubmissionData {
  [key: string]: string | number;
}


// 성적 제출 데이터 통합 타입
export type ScoreSubmissionData = PdfSubmissionData | FormSubmissionData | ScoreRowData; 


