import { useState } from "react";
import { searchRecommendedUniversityAction } from "../_actions/search-recommended-university-list";
import { SearchRecommendedUniversityListParams, SearchRecommendedUniversityListResponse } from "@/app/types/university";

export function useSearchRecommendedUniversity(params: SearchRecommendedUniversityListParams) {
    const [searchRecommendedUniversityList, setSearchRecommendedUniversityList] = useState<SearchRecommendedUniversityListResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await searchRecommendedUniversityAction(params);
            setSearchRecommendedUniversityList(res);
        } catch (e) {
            setError("불러오기 실패");
        } finally {
            setLoading(false);
        }
    };

    return { searchRecommendedUniversityList, loading, error, reload: fetch };
}
