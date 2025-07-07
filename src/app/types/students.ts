// 학생 목록 조회 관련 타입
export interface FetchStudentsListParams {
  id?: number;
  name?: string;
  phone_number?: string;
  birth_date?: string;
  school?: string;
  limit?: number;
  offset?: number;
}

export interface Student {
  id: number;
  name: string;
  phone_number: string;
  current_school_name: string;
  desired_school: string;
  desired_department: string;
  completion_status: string;
  result_file?: string | null;
  consultationDate?: string;
}

export interface FetchStudentsListResponse {
  success: boolean;
  total: number;
  students: Student[];
}
