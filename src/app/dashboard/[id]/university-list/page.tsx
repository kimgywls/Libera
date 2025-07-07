"use client";

import UniversityListDisplay from "./_component/UniversityListDisplay";
import LoadingState from "../../_components/LoadingState";
import ErrorState from "../../_components/ErrorState";
import { useParams } from "next/navigation";
import { useFetchRecommendedUniversityList } from "./_hooks/use-fetch-recommended-university";

export default function UniversityListPage() {
    const params = useParams();
    const studentId = Number(params.id);

    const { recommendedUniversityList, loading: universityListLoading, error: universityListError } = useFetchRecommendedUniversityList(studentId);

    // 대학 목록 로딩 중인 경우
    if (universityListLoading) {
        return <LoadingState data="대학 목록" />;
    }

    // 대학 목록 에러가 발생한 경우
    if (universityListError) {
        return <ErrorState message={universityListError} />;
    }

    return <UniversityListDisplay studentId={studentId} recommendedUniversityList={recommendedUniversityList} />;
} 