"use client";

import { useStudentTotalGrade } from "@/app/dashboard/[id]/scores/_hooks/use-student-total-grade";
import { Student } from "@/app/types/students";
import StudentInfo from "./StudentInfo";

export default function StudentInfoWithGrade({ student }: { student: Student }) {
    const { studentTotalGrade, loading } = useStudentTotalGrade(student.id);

    if (loading || !studentTotalGrade) return null;

    return (
        <StudentInfo
            student={student}
            overallGrade={studentTotalGrade.overallGrade}
        />
    );
}
