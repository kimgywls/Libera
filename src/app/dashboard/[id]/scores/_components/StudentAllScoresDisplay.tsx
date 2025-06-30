"use client";

import { ScoreRowData, StudentAllScores } from "@/app/types/scores";
import { Student } from "@/app/types/students";
import { useStudentTotalGrade } from "@/app/dashboard/_hooks/useStudentTotalGrade";
import { useModalState } from "@/app/hooks/useModalState";
import StudentInfo from "./StudentInfo";
import StudentGradeSection from "./StudentGradeSection";
import MockTestSection from "./MockTestSection";
import SemesterRankGradeSection from "./SemesterRankGradeSection";

interface StudentAllScoresDisplayProps {
    studentAllScores: StudentAllScores;
    student: Student;
}

export default function StudentAllScoresDisplay({
    studentAllScores,
    student,
}: StudentAllScoresDisplayProps) {
    const { scores, mockTests } = studentAllScores;
    const { studentTotalGrade } = useStudentTotalGrade(student.id);
    const modalState = useModalState();

    const gradesBySemester = scores.reduce((acc, score) => {
        if (!acc[score.semester]) {
            acc[score.semester] = [];
        }
        acc[score.semester].push(score);
        return acc;
    }, {} as Record<string, ScoreRowData[]>);

    return (
        <div className="space-y-6">
            <StudentInfo student={student} grade={studentTotalGrade?.overallGrade || null} />

            <StudentGradeSection
                gradesBySemester={gradesBySemester}
                student={student}
                modalState={modalState}
            />

            <MockTestSection
                mockTests={mockTests}
                student={student}
                modalState={modalState}
            />

            <SemesterRankGradeSection
                totalGrade={studentTotalGrade}
                student={student}
                modalState={modalState}
            />
        </div>
    );
}
