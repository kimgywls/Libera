"use client";

import UniversityListDisplay from "./_component/UniversityListDisplay";
import LoadingState from "../../_components/LoadingState";
import ErrorState from "../../_components/ErrorState";
import { useFetchRecommandUniversityList } from "./_hooks/useFetchRecommandUniversity";
import { useFetchStudents } from "@/app/main/_hooks/useFetchStudents";
import StudentNotFound from "../../_components/StudentNotFound";
import { useParams } from "next/navigation";
import { Student } from "@/app/types/students";

export default function UniversityListPage() {
    const params = useParams();
    const studentId = params.id as string;

    const { recommandUniversityList, loading: universityListLoading, error: universityListError } = useFetchRecommandUniversityList();
    const { students, loading: studentsLoading, error: studentsError } = useFetchStudents();

    // 학생과 추천 대학 목록 로딩 중인 경우
    if (studentsLoading || universityListLoading) {
        return <LoadingState data="학생과 추천 대학 목록 데이터" />;
    }

    // 학생 목록 에러가 발생한 경우
    if (studentsError) {
        return <ErrorState message={studentsError} />;
    }

    // 현재 학생 정보 찾기
    const currentStudent = students.find((student: Student) => student.id === studentId);

    // 학생을 찾을 수 없는 경우
    if (!currentStudent) {
        return <StudentNotFound />;
    }

    // 대학 목록 로딩 중인 경우
    if (universityListLoading) {
        return <LoadingState data="대학 목록" />;
    }

    // 대학 목록 에러가 발생한 경우
    if (universityListError) {
        return <ErrorState message={universityListError} />;
    }

    // 대학 목록 데이터가 있는 경우
    return <UniversityListDisplay student={currentStudent} recommandUniversityList={recommandUniversityList} />;
} 