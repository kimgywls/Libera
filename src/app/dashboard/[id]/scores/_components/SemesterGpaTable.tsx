import React from "react";
import { StudentTrendResponse } from "@/app/types/scores";

interface SemesterGpaTableProps {
    trend: StudentTrendResponse;
    loading: boolean;
    error: string | null;
}

const GRADES = [1, 2, 3];
const SEMESTERS = [1, 2];
const CURRICULUM_KEYS = [
    "국어_성적_등급_추이",
    "수학_성적_등급_추이",
    "영어_성적_등급_추이",
    "국수영+사(한)_성적_등급_추이",
    "국수영과_성적_등급_추이",
    "국수영+사(한)과_성적_등급_추이",
    "전과목_성적_등급_추이",
];

const CURRICULUM_LABELS: Record<string, string> = {
    "국어_성적_등급_추이": "국어",
    "수학_성적_등급_추이": "수학",
    "영어_성적_등급_추이": "영어",
    "국수영+사(한)_성적_등급_추이": "국수영+사(한)",
    "국수영과_성적_등급_추이": "국수영과",
    "국수영+사(한)과_성적_등급_추이": "국수영+사(한)과",
    "전과목_성적_등급_추이": "전과목",
};

export default function SemesterGpaTable({ trend, loading, error }: SemesterGpaTableProps) {
    if (loading) return <div>교과 GPA 불러오는 중...</div>;
    if (error) return <div>교과 GPA 조회 오류: {error}</div>;

    return (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">전학기 내신 성적</h3>
            <table className="w-full border text-sm text-black">
                <thead className="bg-gray-100">
                    <tr>
                        <th rowSpan={2} className="border px-3 py-2">교과</th>
                        {GRADES.map((grade) => (
                            <th key={`grade-${grade}`} colSpan={2} className="border px-3 py-2 text-center">
                                {grade}학년
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {GRADES.map((grade) => (
                            SEMESTERS.map((sem) => (
                                grade === 3 && sem === 2 ? null : (
                                    <th key={`semester-${grade}-${sem}`} className="border px-3 py-2 text-center">
                                        {sem}학기
                                    </th>
                                )
                            ))
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {CURRICULUM_KEYS.map((key) => (
                        <tr key={key}>
                            <td className="border px-3 py-1 text-center font-semibold bg-gray-50">
                                {CURRICULUM_LABELS[key] ?? key}
                            </td>
                            {GRADES.map((grade) => (
                                SEMESTERS.map((sem) => {
                                    if (grade === 3 && sem === 2) return null;
                                    const periodKey = `${grade}학년${sem}학기`;
                                    const data = trend[key as keyof StudentTrendResponse]?.[periodKey];
                                    return (
                                        <td key={`${key}-${grade}-${sem}`} className="border px-3 py-1 text-center">
                                            {data?.gpa != null ? data.gpa.toFixed(2) : "-"}
                                        </td>
                                    );
                                })
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
