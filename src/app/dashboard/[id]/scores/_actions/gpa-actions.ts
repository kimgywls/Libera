import axios from "axios";
import { API_URL } from "@/app/constants";

const api = axios.create({
    baseURL: API_URL,
});


// 전체 내신평균 조회
export async function getOverallGpa(studentId: number) {
    const res = await api.get(`/api/v1/scores/students/${studentId}/gpa/overall`);
    //console.log("getOverallGpa", res.data);
    return res.data;
}

// 학기별 내신평균 조회
export async function getSemesterGpa(studentId: number, grade: number, semester: number) {
    const res = await api.get(`/api/v1/scores/students/${studentId}/gpa/semester`, {
        params: { grade, semester },
    });
    //console.log("getSemesterGpa", res.data);
    return res.data;
}

// 교과별 내신평균 조회
export async function getCurriculumGpa(studentId: number, curriculum: string) {
    const res = await api.get(`/api/v1/scores/students/${studentId}/gpa/curriculum/${curriculum}`);
    //console.log("getCurriculumGpa", res.data);
    return res.data;
}
