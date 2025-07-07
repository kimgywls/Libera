"use client";

import { useState, useMemo } from "react";
import { University, FetchDepartmentRecommendationListResponse, UniversityRecommendation, DepartmentRecommendation } from "@/app/types/university";
import { useStudentContext } from "@/app/dashboard/contexts/StudentContext";
import StudentInfo from "../../../_components/StudentInfo";
import { useOverallGpa } from "@/app/dashboard/[id]/scores/_hooks/use-gpa-scores";
import UniversityListSection from "./UniversityListSection";

interface UniversityListDisplayProps {
    studentId: number;
    recommendedUniversityList: FetchDepartmentRecommendationListResponse | null;
}

export default function UniversityListDisplay({
    studentId,
    recommendedUniversityList,
}: UniversityListDisplayProps) {
    const { student } = useStudentContext();
    const { overallGpa } = useOverallGpa(studentId);
    const [selectedDeptIdx, setSelectedDeptIdx] = useState(0);

    if (!recommendedUniversityList || !recommendedUniversityList.departments.length) {
        return <div>추천 대학 데이터가 없습니다.</div>;
    }

    const departments = recommendedUniversityList.departments;

    // 전체보기용 department 생성
    const allDepartment: DepartmentRecommendation = useMemo(() => {
        const allChallenge = departments.flatMap(dep => dep.challenge ?? []);
        const allSuitable = departments.flatMap(dep => dep.suitable ?? []);
        const allSafe = departments.flatMap(dep => dep.safe ?? []);
        return {
            department_name: "전체보기",
            priority: 0,
            challenge: allChallenge,
            suitable: allSuitable,
            safe: allSafe,
            challenge_count: allChallenge.length,
            suitable_count: allSuitable.length,
            safe_count: allSafe.length,
            total_count: allChallenge.length + allSuitable.length + allSafe.length,
        };
    }, [departments]);

    // 탭 목록: 전체보기 + 각 학과
    const tabDepartments = [allDepartment, ...departments];
    const selectedDepartment = tabDepartments[selectedDeptIdx];

    // UniversityRecommendation[]을 University[]로 변환
    function mapToUniversity(arr: UniversityRecommendation[]): University[] {
        return arr.map((u: UniversityRecommendation) => ({
            region: '',
            universityName: u.university_name ?? '',
            admissionType: '',
            admissionCategory: '',
            departmentName: '',
            evaluationRatio: '',
            entryScore2024: '',
            judgement2024: '',
            entryScore2025: '',
            judgement2025: ''
        }));
    }

    // departments의 모든 challenge/suitable/safe를 평탄화하여 하나의 배열로 합침
    const universityList = recommendedUniversityList?.departments
        ? recommendedUniversityList.departments.flatMap(dep => [
            ...mapToUniversity(dep.challenge ?? []),
            ...mapToUniversity(dep.suitable ?? []),
            ...mapToUniversity(dep.safe ?? [])
        ])
        : [];

    return (
        <div className="space-y-6">
            <StudentInfo student={student} overallGrade={overallGpa?.gpa ?? 0} />
            {/* 학과별 탭 */}
            <div className="flex gap-2 mb-4">
                {tabDepartments.map((dept, idx) => (
                    <button
                        key={dept.department_name}
                        className={`px-4 py-2 rounded ${selectedDeptIdx === idx ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setSelectedDeptIdx(idx)}
                    >
                        {dept.department_name}
                    </button>
                ))}
            </div>
            {/* 추천 대학 테이블 */}
            <UniversityListSection department={selectedDepartment} />
        </div>
    );
}
