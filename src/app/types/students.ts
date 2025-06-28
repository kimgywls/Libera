// 학생 기본 정보 타입
export interface Student {
    id?: string; // optional ID (백엔드에서 식별용)
    studentName: string;
    birthdate: string;
    contact: string;
    currentSchool: string;
    desiredSchool: string;
    desiredMajor: string;
  }
  
  // 학생 목록 타입 (배열)
  export type StudentList = Student[];
  
  // 검색 필터용 타입 (모든 필드 optional)
  export type StudentFilter = Partial<Student>;
  
  // 입력용 타입 (id 제외)
  export type StudentInput = Omit<Student, "id">;
  
  // 빈 학생 객체 템플릿
  export const defaultStudent: StudentInput = {
    studentName: "",
    birthdate: "",
    contact: "",
    currentSchool: "",
    desiredSchool: "",
    desiredMajor: "",
  };
  
  // 학생 성적 제출 타입
  export interface StudentGrade {
    contact: string;
    gradeSubmission_2: boolean;
    gradeSubmission_3: boolean;
    gradeSubmission_mockTest: boolean;
  }
  