"use server";

import { StudentScoreSubmission, SUBMISSION_STATUS } from "../../constants";

// 실제 API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// 목데이터
const mockStudentsScoreSubmission: StudentScoreSubmission[] = [
  {
    contact: "010-1234-5678",
    scoreSubmission_2: SUBMISSION_STATUS.DONE,
    scoreSubmission_3: SUBMISSION_STATUS.NOT_SUBMITTED,
    scoreSubmission_mockTest: SUBMISSION_STATUS.NOT_SUBMITTED,
  },
  {
    contact: "010-9876-5432",
    scoreSubmission_2: SUBMISSION_STATUS.DONE,
    scoreSubmission_3: SUBMISSION_STATUS.IN_PROGRESS,
    scoreSubmission_mockTest: SUBMISSION_STATUS.DONE,
  },
  {
    contact: "010-1111-2222",
    scoreSubmission_2: SUBMISSION_STATUS.DONE,
    scoreSubmission_3: SUBMISSION_STATUS.DONE,
    scoreSubmission_mockTest: SUBMISSION_STATUS.DONE,
  },
];
export const getStudentsScoreSubmission = async () => {
  // 추후 fetch("/api/students") 등으로 대체 예정
  return mockStudentsScoreSubmission;
};