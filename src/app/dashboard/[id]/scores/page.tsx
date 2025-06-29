"use client";

import { useParams } from "next/navigation";
import { useFetchStudents } from "../../../main/_hooks/useFetchStudents";
import { useStudentAllScores } from "../../_hooks/useStudentAllScores";
import { Student } from "../../../types/students";
import StudentAllScoresDisplay from "./_components/StudentAllScoresDisplay";
import NoGradesMessage from "./_components/NoGradesMessage";
import LoadingState from "./_components/LoadingState";
import ErrorState from "./_components/ErrorState";
import StudentNotFound from "./_components/StudentNotFound";

export default function ScoresPage() {
    const params = useParams();
    const studentId = params.id as string;
    const { students } = useFetchStudents();
    const { studentGrades, loading: gradesLoading, error: gradesError } = useStudentAllScores(studentId);

    // 현재 학생 정보 찾기
    const currentStudent = students.find((student: Student) => student.id === studentId);

    // 학생을 찾을 수 없는 경우
    if (!currentStudent) {
        return <StudentNotFound />;
    }

    // 로딩 중인 경우
    if (gradesLoading) {
        return <LoadingState />;
    }

    // 에러가 발생한 경우
    if (gradesError) {
        return <ErrorState message={gradesError} />;
    }

    // 성적 데이터가 없는 경우
    if (!studentGrades) {
        return (
            <NoGradesMessage
                message={`${currentStudent.studentName} 학생의 성적 데이터가 없습니다.`}
            />
        );
    }

    // 성적 데이터가 있는 경우
    return <StudentAllScoresDisplay studentAllScores={studentGrades} student={currentStudent} />;
} 