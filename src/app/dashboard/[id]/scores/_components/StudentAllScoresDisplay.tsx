"use client";

import { ScoreRowData, StudentCombinedScores } from "@/app/types/scores";
import { Student } from "@/app/types/students";
import { useStudentTotalGrade } from "@/app/dashboard/_hooks/useStudentTotalGrade";
import StudentInfo from "../../../_components/StudentInfo";
import StudentAttendanceSection from "./StudentAttendanceSection";
import StudentGradeSection from "./StudentGradeSection";
import MockTestSection from "./MockTestSection";
import SemesterRankGradeSection from "./SemesterRankGradeSection";
import SemesterGradeChartSection from "./SemesterRankGradeChartSection";

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

            <StudentAttendanceSection
                student={student}
            />

            <StudentGradeSection
                gradesBySemester={gradesBySemester}
                student={student}
            />

            <MockTestSection
                mockTestScores={mockTestScores}
                student={student}
            />

            <SemesterRankGradeSection
                totalGrade={studentTotalGrade!}
                student={student}
            />

            <SemesterGradeChartSection
                totalGrade={studentTotalGrade!}
            />
        </div>
    );
}
