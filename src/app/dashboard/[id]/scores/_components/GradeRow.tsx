"use client";

import { ScoreRowData, SubjectType } from "@/app/types/scores";

interface GradeRowProps {
    grade: ScoreRowData;
    subjectType: SubjectType;
    index: number;
}

export default function GradeRow({ grade, subjectType, index }: GradeRowProps) {
    const isEven = index % 2 === 0;
    const rowClass = isEven ? "bg-white" : "bg-gray-50";

    return (
        <tr className={rowClass + " text-black"}>
            {subjectType === "일반선택" && (
                <>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.subjectType}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.subject}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.course}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.unit ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.rawScore ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.averageSubject ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.stdDev ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.achievement ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.totalStudents ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.grade ?? "-"}</td>
                </>
            )}

            {subjectType === "진로선택" && (
                <>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.subjectType}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.subject}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.course}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.unit ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.rawScore ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.averageSubject ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.achievement ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.totalStudents ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.achievementPercentage ?? "-"}</td>
                </>
            )}

            {subjectType === "체육/예술" && (
                <>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.subjectType}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.subject}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.unit ?? "-"}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{grade.achievement ?? "-"}</td>
                </>
            )}
        </tr>
    );
}
