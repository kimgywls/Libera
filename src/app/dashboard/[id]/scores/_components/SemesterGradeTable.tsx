"use client";

import { SemesterGrade } from "@/app/types/scores";
import { GRADE_HEADER_STRUCTURE, Semester, SUBJECTS } from "@/app/constants";

interface SemesterGradeTableProps {
    grade: SemesterGrade;
    isEditable?: boolean;
    onChange?: (semester: string, subject: string, value: number | undefined) => void;
}

export default function SemesterGradeTable({
    grade,
    isEditable = false,
    onChange,
}: SemesterGradeTableProps) {
    if (!grade) {
        return <div className="text-gray-500 text-center py-4">등급 데이터가 없습니다.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm text-black">
                <thead>
                    {/* 상단: 학년 헤더 */}
                    <tr className="bg-gray-100">
                        <th rowSpan={2} className="border border-gray-300 px-4 py-2 text-left font-semibold bg-gray-100">
                            과목
                        </th>
                        {Object.entries(GRADE_HEADER_STRUCTURE).map(([gradeYear, semesters]) => (
                            <th
                                key={gradeYear}
                                colSpan={semesters.length}
                                className="border border-gray-300 px-4 py-2 text-center font-semibold bg-gray-100"
                            >
                                {gradeYear}
                            </th>
                        ))}
                    </tr>

                    {/* 하단: 학기 헤더 */}
                    <tr className="bg-gray-50">
                        {Object.values(GRADE_HEADER_STRUCTURE).flat().map((semesterKey) => (
                            <th
                                key={semesterKey}
                                className="border border-gray-300 px-4 py-2 text-center font-semibold"
                            >
                                {semesterKey}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {SUBJECTS.map((subject) => (
                        <tr key={subject} className="bg-white hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 font-medium">{subject}</td>
                            {Object.values(GRADE_HEADER_STRUCTURE).flat().map((semesterKey) => {
                                const semesterData = grade[semesterKey as Semester];
                                const value = semesterData?.[subject];

                                return (
                                    <td key={semesterKey} className="border border-gray-300 px-2 py-1 text-center">
                                        {isEditable ? (
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-violet-500"
                                                value={value ?? ""}
                                                onChange={(e) => {
                                                    const parsed = parseFloat(e.target.value);
                                                    onChange?.(
                                                        semesterKey,
                                                        subject,
                                                        isNaN(parsed) ? undefined : parsed
                                                    );
                                                }}
                                            />
                                        ) : (
                                            value !== undefined ? value.toFixed(2) : "-"
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
