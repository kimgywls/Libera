"use server";

import { Student } from "@/app/types/students";

// 목데이터
const mockStudents: Student[] = [
  {
    id: "1",
    studentName: "김하늘",
    birthdate: "2007-03-15",
    contact: "010-1234-5678",
    currentSchool: "서울고등학교",
    desiredSchool: ["서울대학교", "연세대학교", "고려대학교"],
    desiredMajor: ["컴퓨터공학과", "전자공학과"],
    consultationDate: "",
  },
  {
    id: "2",
    studentName: "이준호",
    birthdate: "2007-07-22",
    contact: "010-9876-5432",
    currentSchool: "해솔고등학교",
    desiredSchool: ["연세대학교", "고려대학교", "성균관대"],
    desiredMajor: ["경영학과", "경제학과"],
    consultationDate: "2025-07-09",
  },
  {
    id: "3",
    studentName: "박서연",
    birthdate: "2007-11-09",
    contact: "010-1111-2222",
    currentSchool: "한빛고등학교",
    desiredSchool: ["고려대학교", "성균관대학교", "중앙대학교"],
    desiredMajor: ["국어교육학과"],
    consultationDate: "2025-07-12",
  },
];

export const getStudentsAction = async () => {
  // 추후 fetch("/api/students") 등으로 대체 예정
  return mockStudents;
};

export const createStudentAction = async (mockStudents: Student) => {
  // 추후 fetch("/api/students") 등으로 대체 예정
  return mockStudents;
};