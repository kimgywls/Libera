"use server";

import axios from "axios";
import { StudentGrade } from "@/app/types/student";

// 실제 API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// 목데이터
const mockStudentsGradeSubmission: StudentGrade[] = [
    {
      contact: "010-1234-5678",
      gradeSubmission_2: true,
      gradeSubmission_3: false,
      gradeSubmission_mockTest: false,
    },
    {
      contact: "010-9876-5432",
      gradeSubmission_2: false,
      gradeSubmission_3: false,
      gradeSubmission_mockTest: false,
    },
    {
      contact: "010-1111-2222",
      gradeSubmission_2: true,
      gradeSubmission_3: true,
      gradeSubmission_mockTest: true,
    },
  ];  

export const getStudentsGradeSubmission = async () => {
  // 추후 fetch("/api/students") 등으로 대체 예정
  return mockStudentsGradeSubmission;
};