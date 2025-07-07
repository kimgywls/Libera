import axios from "axios";
import { ScoreRequest, ScoreResponseData, ScoreDeleteResponse } from "@/app/types/scores";
import { API_URL } from "@/app/constants";
import { StudentScoreEditState } from "@/app/types/scores";

const api = axios.create({ baseURL: API_URL });

// GET: 학생별 성적 조회
export async function fetchStudentScores(student_id: string): Promise<ScoreResponseData> {
    const response = await api.get(`/api/v1/scores/students/${student_id}`);
    //console.log("fetchStudentScores", response.data.data);
    return response.data.data as ScoreResponseData;
}

// POST: 성적 등록
export async function createStudentScores(data: ScoreRequest): Promise<ScoreResponseData> {
    const response = await api.post(`/api/v1/scores/students/${data.student_id}/scores`, data);
    //console.log("createStudentScores", response.data);

    return response.data.data as ScoreResponseData;
}

// PUT: 성적 개별 수정
export async function updateStudentScore(student_id: string, score_id: string, data: Partial<StudentScoreEditState>): Promise<ScoreResponseData> {
    const response = await api.put(`/api/v1/scores/students/${student_id}/scores/${score_id}`, data);
    //console.log("updateStudentScore", response.data);

    return response.data.data as ScoreResponseData;
}

// PUT: 성적 일괄 수정
export async function updateBulkStudentScores(student_id: string): Promise<ScoreResponseData> {
    const response = await api.put(`/api/v1/scores/students/${student_id}/scores`);
    //console.log("updateBulkStudentScores", response.data);

    return response.data.data as ScoreResponseData;
}

// DELETE: 성적 삭제
export async function deleteStudentScores(student_id: string): Promise<ScoreDeleteResponse> {
    const response = await api.delete(`/api/v1/scores/students/${student_id}/scores`);
    //console.log("deleteStudentScores", response.data);

    return response.data.data as ScoreDeleteResponse;
} 