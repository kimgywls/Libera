import { useState, useEffect } from "react";
import { getRecommendedUniversityListAction } from "../_actions/fetch-recommended-university-list";
import { University } from "@/app/types/university";

// 추천 대학 목록 조회 훅
export function useFetchRecommendedUniversityList(studentId: string) {
    const [universityList, setUniversityList] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommendedUniversityList = async () => {
        try {
            const data = await getRecommendedUniversityListAction(studentId);
            setUniversityList(data);
        } catch {
            setError("불러오기 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRecommendedUniversityList(); }, [studentId]);

    return { universityList, loading, error, reload: fetchRecommendedUniversityList };
}
