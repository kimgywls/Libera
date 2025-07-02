"use client";

import { ScoreRowData, StudentCombinedScores } from "@/app/types/scores";
import { Student } from "@/app/types/students";
import { useStudentTotalGrade } from "@/app/dashboard/_hooks/useStudentTotalGrade";
import { useModalState } from "@/app/hooks/useModalState";
import StudentInfo from "../../../_components/StudentInfo";
import StudentGradeSection from "./StudentGradeSection";
import MockTestSection from "./MockTestSection";
import SemesterRankGradeSection from "./SemesterRankGradeSection";
import SemesterGradeChartSection from "./SemesterGradeChartSection";

interface StudentAllScoresDisplayProps {
    studentCombinedScores: StudentCombinedScores;
    student: Student;
}

export default function StudentAllScoresDisplay({
    studentCombinedScores,
    student,
}: StudentAllScoresDisplayProps) {
    const { subjectScores, mockTestScores } = studentCombinedScores;
    const { studentTotalGrade } = useStudentTotalGrade(student.id);
    const modalState = useModalState();

    const gradesBySemester = subjectScores.reduce((acc, score) => {
        if (!acc[score.semester]) {
            acc[score.semester] = [];
        }
        acc[score.semester].push(score);
        return acc;
    }, {} as Record<string, ScoreRowData[]>);

    return (
        <div className="space-y-6">
            <StudentInfo student={student} overallGrade={studentTotalGrade!.overallGrade} />

            <StudentGradeSection
                gradesBySemester={gradesBySemester}
                student={student}
                modalState={modalState}
            />

            <MockTestSection
                mockTestScores={mockTestScores}
                student={student}
                modalState={modalState}
            />

            <SemesterRankGradeSection
                totalGrade={studentTotalGrade!}
                student={student}
                modalState={modalState}
            />

            <SemesterGradeChartSection
                totalGrade={studentTotalGrade!}
            />
        </div>
    );
}
