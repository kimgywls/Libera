"use client";

import { useParams } from "next/navigation";
import { useFetchStudents } from "../../../main/_hooks/use-fetch-students";
import { useStudentAllScores } from "./_hooks/use-student-all-scores";
import { Student } from "@/app/types/students";
import StudentAllScoresDisplay from "./_components/StudentAllScoresDisplay";
import NoGradesMessage from "../../_components/NoDataMessage";
import LoadingState from "../../_components/LoadingState";
import ErrorState from "../../_components/ErrorState";
import StudentNotFound from "../../_components/StudentNotFound";

export default function ScoresPage() {
    const params = useParams();
    const studentId = params.id as string;
    const { students, loading: studentsLoading, error: studentsError } = useFetchStudents();
    const { studentCombinedScores, loading: gradesLoading, error: gradesError } = useStudentAllScores(studentId);

    // 학생 목록 로딩 중인 경우

    if (studentsLoading || gradesLoading) {
        return <LoadingState data="학생과 성적 데이터" />;
    }

    // 학생 목록 에러가 발생한 경우
    if (studentsError) {
        return <ErrorState message={studentsError} />;
    }

    // 현재 학생 정보 찾기
    const currentStudent = students.find((student: Student) => student.id === studentId);

    // 학생을 찾을 수 없는 경우
    if (!currentStudent) {
        return <StudentNotFound />;
    }

    // 성적 데이터 에러가 발생한 경우
    if (gradesError) {
        return <ErrorState message={gradesError} />;
    }

    // 성적 데이터가 없는 경우
    if (!studentCombinedScores) {
        return (
            <NoGradesMessage
                message={`${currentStudent.studentName} 학생의 성적 데이터가 없습니다.`}
            />
        );
    }

    // 성적 데이터가 있는 경우
    return <StudentAllScoresDisplay studentCombinedScores={studentCombinedScores} student={currentStudent} />;
} 