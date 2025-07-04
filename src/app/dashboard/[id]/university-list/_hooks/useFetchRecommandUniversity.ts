import { useState, useEffect } from "react";
import { getRecommandUniversityListAction } from "../_actions/fetch-recommand-university-list";
import { StudentRecommendedUniversityList } from "@/app/types/university";

// 추천 대학 목록 조회 훅
export function useFetchRecommandUniversityList() {
    const [recommandUniversityList, setRecommandUniversityList] = useState<StudentRecommendedUniversityList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommandUniversityList = async () => {
        try {
            const data = await getRecommandUniversityListAction();
            setRecommandUniversityList(data);
        } catch {
            setError("불러오기 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRecommandUniversityList(); }, []);

    return { recommandUniversityList, loading, error, reload: fetchRecommandUniversityList };
}
