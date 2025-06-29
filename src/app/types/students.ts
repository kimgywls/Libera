// ---------------------------------------------
// 학생 기본 정보 타입
// ---------------------------------------------

export interface Student {
  id: string;              // 선택적 ID (백엔드에서 생성됨)
  studentName: string;      // 학생 이름
  birthdate: string;        // 생년월일
  contact: string;          // 연락처 (주로 부모님)
  currentSchool: string;    // 현재 재학 중인 학교
  desiredSchool: string;    // 희망 진학 학교
  desiredMajor: string;     // 희망 전공 / 학과
  overallGrade: number;       // 전체 내신 성적
  consultationDate: string;    // 상담 날짜
}

// ---------------------------------------------
// 유틸 타입들
// ---------------------------------------------

// 전체 학생 목록 타입
export type StudentList = Student[];

// 검색 필터용 타입 (전체 필드 optional)
// - 일부 필드만 조건으로 검색할 수 있도록 설정
export type StudentFilter = Partial<Student>;

// 학생 입력용 타입
// - ID는 제외하고 입력폼에 필요한 필드만 사용
export type StudentInput = Omit<Student, "id">;

// ---------------------------------------------
// 빈 학생 객체 템플릿 (Form 초기값 등에서 사용)
// ---------------------------------------------

export const defaultStudent: StudentInput = {
  studentName: "",       // 이름
  birthdate: "",         // 생년월일
  contact: "",           // 연락처
  currentSchool: "",     // 현재 학교
  desiredSchool: "",     // 희망 학교
  desiredMajor: "",      // 희망 학과
  overallGrade: 0,         // 전체 내신 성적
  consultationDate: "",    // 상담 날짜
};
