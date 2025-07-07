import { useEffect, useState } from "react";
import { fetchRecommendedUniversityListAction } from "../_actions/fetch-recommened-university-list";
import { FetchDepartmentRecommendationListResponse } from "@/app/types/university";

export function useFetchRecommendedUniversityList(student_id: number) {
    const [recommendedUniversityList, setRecommendedUniversityList] = useState<FetchDepartmentRecommendationListResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchRecommendedUniversityListAction(student_id);
            console.log("useFetchRecommendedUniversityList", res);
            setRecommendedUniversityList(res);
        } catch (e) {
            setError("불러오기 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, [student_id]);

    return { recommendedUniversityList, loading, error, reload: fetch };
}
