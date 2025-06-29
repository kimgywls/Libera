"use client";

import { ScoreRowData, SubjectType } from "@/app/types/scores";
import GradeRow from "./GradeRow";
import { useModal } from "@/app/hooks/useModal"; // 커스텀 훅 사용

interface GradeTableProps {
    semester: string;
    subjectType: SubjectType;
    grades: ScoreRowData[];
}

export default function GradeTable({
    semester,
    subjectType,
    grades,
}: GradeTableProps) {
    if (!grades) return null;

    // ✅ 정확한 필터링: 학기 + 과목 유형
    const filteredGrades = grades.filter(
        (g) => g.semester === semester && g.subjectType === subjectType
    );

    const hasData = filteredGrades.length > 0;

    let headers: string[] = [];
    if (subjectType === "일반선택") {
        headers = ["교과", "과목", "과목명", "단위수", "원점수", "과목평균", "표준편차", "성취도", "수강자 수", "석차등수"];
    } else if (subjectType === "진로선택") {
        headers = ["교과", "과목", "과목명", "단위수", "원점수", "과목평균", "성취도", "수강자 수", "성취도별 분포 비율"];
    } else if (subjectType === "체육/예술") {
        headers = ["교과", "과목", "단위수", "성취도"];
    }

    return (
        <div className="rounded-lg p-4 bg-white shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    {semester} {subjectType} 성적표
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            {headers.map((header) => (
                                <th key={header} className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGrades.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length} className="text-center text-gray-500 py-6">
                                    성적이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredGrades.map((grade, index) => (
                                <GradeRow
                                    key={`${grade.subject}-${index}`}
                                    grade={grade}
                                    subjectType={subjectType}
                                    index={index}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
