"use client";

import { Student } from "@/app/types/students";

interface StudentAttendanceSectionProps {
    student: Student;
}

export default function StudentAttendanceSection({
    student,
}: StudentAttendanceSectionProps) {

    return (
        <>
            <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">출결 현황</h2>

                <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold text-gray-900">{student.studentName} 출결 현황</h2>
                    </div>
                </div>
            </div>
        </>
    );
} 