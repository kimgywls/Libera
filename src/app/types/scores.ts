export interface AchievementDistribution {
  A?: number;
  B?: number;
  C?: number;
}

export interface StudentScore {
  id: number;
  student_id: number;
  grade: number;
  semester: number;
  curriculum: string;
  subject: string;
  subject_type: "일반선택" | "진로선택" | "체육/예술";
  raw_score: number;
  subject_average: number;
  standard_deviation: number | null;
  achievement_level: string;
  student_count: number;
  grade_rank: number | null;
  achievement_distribution: AchievementDistribution;
  credit_hours: number;
  notes: string | null;
}

export interface ScoreRequest {
  student_id: string;
  semester_scores: { [semester: string]: { [subject: string]: number } };
  mock_test_scores: { [month: string]: { [subject: string]: number } };
}

export interface ScoreResponseData {
  student_id: string;
  scores: StudentScore[];
  total_scores: number;
}

export interface ScoreDeleteResponse {
  success: boolean;
  message: string;
}

// 실제 성적 row 타입 (API 응답 구조와 일치)
export interface StudentScoreRow {
  id: number;
  student_id: number;
  semester: string | number;
  subject_type: string;
  curriculum: string;
  subject: string;
  credit_hours: number;
  raw_score?: number;
  subject_average?: number;
  standard_deviation?: number;
  grade_rank?: string;
  student_count?: number;
  grade?: string;
  achievement_level?: string;
  achievement_distribution?: string | null;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// 성적 테이블 컴포넌트 props 타입
export interface StudentScoresTableProps {
  rows: StudentScoreRow[];
}

export interface StudentAttendance {
  id: number;
  student_id: number;
  semester: string; // 예: "2023-1"
  total_days: number;
  absent_days: number;
  late_days: number;
  early_leave_days: number;
  etc_days?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GpaResult {
  student_id: number;
  grade: number;
  semester: number;
  gpa: number;
  total_scores: number;
  valid_scores: number;
}

export interface UseAllSemesterGpasResult {
  semesterGpaMap: Record<string, { gpa: number | null } | null>;
  loading: boolean;
  error: string | null;
}

export interface CurriculumGpaResult {
  student_id: number;
  curriculum: string;
  gpa: number;
  total_scores: number;
  valid_scores: number;
}

export interface StudentTrendItem {
  gpa: number;
  grade: number;
  semester: number;
  score_count: number;
  // 필요시 추가 필드
}

export interface StudentTrendResponse {
  "전과목_성적_등급_추이": Record<string, StudentTrendItem>;
  "국수영+사(한)과_성적_등급_추이": Record<string, StudentTrendItem>;
  "국수영과_성적_등급_추이": Record<string, StudentTrendItem>;
  "국수영+사(한)_성적_등급_추이": Record<string, StudentTrendItem>;
  "수학_성적_등급_추이": Record<string, StudentTrendItem>;
  "영어_성적_등급_추이": Record<string, StudentTrendItem>;
  "국어_성적_등급_추이": Record<string, StudentTrendItem>;
}

export const CURRICULUMS = ["국어", "수학", "영어", "사회(한국사 포함)", "과학", "국+영+사(한)", "수+영+과", "수+과", "국+수+영+사(한)", "국+수+영+과", "국+수+영+사(한)+과", "전교과"];

export interface StudentScoreEditState {
  grade: number;
  semester: number;
  curriculum: string;
  subject: string;
  subject_type: "일반선택" | "진로선택" | "체육/예술";
  raw_score?: number;
  subject_average?: number;
  standard_deviation?: number | null;
  achievement_level?: string;
  student_count?: number;
  grade_rank?: number | null;
  achievement_distribution?: AchievementDistribution;
  credit_hours?: number;
  notes?: string | null;
}

export interface StudentScoreEditFormProps {
  initial?: StudentScoreEditState;
  onSave: (data: StudentScoreEditState) => void;
  onCancel: () => void;
  loading?: boolean;
}

