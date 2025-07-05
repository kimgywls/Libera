import React from "react";
import StudentExportPDF from "./StudentExportPDF";
import { useStudentAllScores } from "@/app/dashboard/[id]/scores/_hooks/use-student-all-scores";
import { useStudentTotalGrade } from "@/app/dashboard/[id]/scores/_hooks/use-student-total-grade";
import { getChartDataBySubject } from "@/app/dashboard/[id]/scores/_utils/getChartDataBySubject";
import { DISPLAY_SUBJECTS } from "@/app/constants";
import { Student } from "@/app/types/students";

interface HiddenStudentPDFProps {
    student: Student;
    pdfRef: React.RefObject<HTMLDivElement>;
}

export default function HiddenStudentPDF({ student, pdfRef }: HiddenStudentPDFProps) {
    const { studentCombinedScores } = useStudentAllScores(student.id);
    const { studentTotalGrade } = useStudentTotalGrade(student.id);

    const grades = studentCombinedScores?.subjectScores ?? [];
    const mockTests = studentCombinedScores?.mockTestScores ?? {};
    const overallGrade = studentTotalGrade?.overallGrade ?? 0;
    const semesterGrades = studentTotalGrade?.bySemester ? studentTotalGrade.bySemester : undefined;
    const chartData = DISPLAY_SUBJECTS.map(subject => ({
        subject,
        data: studentTotalGrade ? getChartDataBySubject(studentTotalGrade as import("@/app/types/scores").TotalScores, subject) ?? [] : [],
    }));

    return (
        <div style={{ position: "absolute", left: -9999, top: 0 }}>
            <StudentExportPDF
                ref={pdfRef}
                student={student}
                overallGrade={overallGrade}
                grades={grades}
                mockTests={mockTests}
                semesterGrades={semesterGrades}
                chartData={chartData}
            />
        </div>
    );
} 