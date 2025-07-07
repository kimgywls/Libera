import React from "react";
import { CurriculumGpaResult } from "@/app/types/scores";

interface CurriculumGpaTableProps {
    curriculumGpaMap: Record<string, CurriculumGpaResult | null>;
    loading?: boolean;
    error?: string | null;
}

const CURRICULUMS = ["국어", "수학", "영어", "사회", "과학"];

export default function CurriculumGpaTable({ curriculumGpaMap, loading, error }: CurriculumGpaTableProps) {
    if (loading) return <div>교과 GPA 불러오는 중...</div>;
    if (error) return <div>교과 GPA 조회 오류: {error}</div>;

    return (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">교과별 GPA</h3>
            <table className="w-full border text-sm text-black">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-3 py-2">교과</th>
                        <th className="border px-3 py-2">GPA</th>
                        <th className="border px-3 py-2">전체 성적 수</th>
                        <th className="border px-3 py-2">유효 성적 수</th>
                    </tr>
                </thead>
                <tbody>
                    {CURRICULUMS.map((curriculum) => {
                        const gpa = curriculumGpaMap?.[curriculum];
                        return (
                            <tr key={curriculum}>
                                <td className="border px-3 py-1 text-center">{curriculum}</td>
                                <td className="border px-3 py-1 text-center">
                                    {gpa && typeof gpa.gpa === "number" ? gpa.gpa.toFixed(2) : "-"}
                                </td>
                                <td className="border px-3 py-1 text-center">
                                    {gpa ? gpa.total_scores : "-"}
                                </td>
                                <td className="border px-3 py-1 text-center">
                                    {gpa ? gpa.valid_scores : "-"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}