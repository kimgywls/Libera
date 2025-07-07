import axios from "axios";
import { API_URL } from "@/app/constants";
import { SearchRecommendedUniversityListParams, SearchRecommendedUniversityListResponse } from "@/app/types/university";

const api = axios.create({
    baseURL: API_URL,
});

// 추천 대학 검색 API 요청 함수
export async function searchRecommendedUniversityAction(params: SearchRecommendedUniversityListParams = { student_id: 0 }): Promise<SearchRecommendedUniversityListResponse> {
    try {
        const response = await api.get<SearchRecommendedUniversityListResponse>("/api/v1/university-list/recommended", { params: { ...params, limit: 10 } });
        return response.data;
    } catch (error) {
        console.error("Error fetching recommended university list:", error);

        return {
            success: false,
            total: 0,
            universities: [],
        };
    }
}
