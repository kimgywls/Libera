import axios from "axios";
import { API_URL } from "@/app/constants";
import { FetchStudentsListParams, FetchStudentsListResponse } from "@/app/types/students";

const api = axios.create({
    baseURL: API_URL,
});

// 학생 목록을 가져오는 API 요청 함수
export async function fetchStudentsListAction(params: FetchStudentsListParams = {}): Promise<FetchStudentsListResponse> {
    try {
        const response = await api.get<FetchStudentsListResponse>("/api/v1/students", { params: { ...params, limit: 10 } });
        return response.data;
    } catch (error) {
        console.error("Error fetching students list:", error);

        return {
            success: false,
            total: 0,
            students: [],
        };
    }
}

// 전체 학생 목록 조회
export const getAllStudentsAction = async () => {
    return fetchStudentsListAction();
};

// 복합 조건 검색
export const getStudentsByParamsAction = async (params: FetchStudentsListParams) => {
    return fetchStudentsListAction(params);
};

// 학생 생성 API (POST)
export const createStudentAction = async () => {
    // TODO: 구현 예정
};