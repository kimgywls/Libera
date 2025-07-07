import React from "react";
import { useAttendance } from "../_hooks/use-attenadace";
import type { StudentAttendance } from "@/app/types/scores";

interface Props {
    student_id: number;
}

function displayValue(value: any) {
    return value == null || value === "" ? "-" : value;
}

export default function StudentAttendanceTable({ student_id }: Props) {
    const { attendance, loading, error } = useAttendance(student_id);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!attendance || attendance.length === 0) return <div>출결 정보가 없습니다.</div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-1">학기</th>
                        <th className="border px-2 py-1">총 수업일수</th>
                        <th className="border px-2 py-1">결석</th>
                        <th className="border px-2 py-1">지각</th>
                        <th className="border px-2 py-1">조퇴</th>
                        <th className="border px-2 py-1">기타</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((row) => (
                        <tr key={row.id}>
                            <td className="border px-2 py-1">{displayValue(row.semester)}</td>
                            <td className="border px-2 py-1">{displayValue(row.total_days)}</td>
                            <td className="border px-2 py-1">{displayValue(row.absent_days)}</td>
                            <td className="border px-2 py-1">{displayValue(row.late_days)}</td>
                            <td className="border px-2 py-1">{displayValue(row.early_leave_days)}</td>
                            <td className="border px-2 py-1">{displayValue(row.etc_days)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
