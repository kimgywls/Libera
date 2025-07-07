import axios from "axios";
import { API_URL } from "@/app/constants";
import { FetchDepartmentRecommendationListResponse } from "@/app/types/university";

const api = axios.create({
    baseURL: API_URL,
});

export async function fetchRecommendedUniversityListAction(student_id: number): Promise<FetchDepartmentRecommendationListResponse> {
    try {
        const response = await api.get(`/api/v1/school-recommendations/${student_id}/by-desired-departments`);
        console.log("fetchRecommendedUniversityListAction", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching recommended university list:", error);
        return {
            student_id,
            student_name: "",
            student_grade: 0,
            departments: [],
        };
    }
}