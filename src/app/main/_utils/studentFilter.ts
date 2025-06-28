import { Student } from "@/app/types/students";

// 학생 검색 필터링 함수
export function filterStudents(
  students: Student[],
  searchType: string,
  searchValue: string
): Student[] {
  if (!searchValue.trim()) return students;

  return students.filter((student) => {
    switch (searchType) {
      case "name":
        return student.studentName.toLowerCase().includes(searchValue.toLowerCase());
      case "phone":
        return student.contact.includes(searchValue);
      case "school":
        return student.currentSchool.toLowerCase().includes(searchValue.toLowerCase());
      default:
        return true;
    }
  });
} 