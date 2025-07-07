import axios from "axios";
import { API_URL } from "@/app/constants";

const api = axios.create({ baseURL: API_URL });

// GET: 학생별 성적 조회
export async function fetchStudentSemesterTrend(student_id: string) {
    const response = await api.get(`/api/v1/scores/students/${student_id}/semester-trend`);
    //console.log("fetchStudentSemesterTrend", response.data);
    return response.data;
}