"use client";

import { useParams } from 'next/navigation';
import { useFetchStudents } from '@/app/main/_hooks/use-fetch-students';
import { Student } from '@/app/types/students';
import { useStudentAllNonScore } from './_hooks/useStudentNonScore';
import NoDataMessage from '../../_components/NoDataMessage';
import LoadingState from '../../_components/LoadingState';
import ErrorState from '../../_components/ErrorState';
import StudentNotFound from '../../_components/StudentNotFound';
import StudentNonScoreSummaryDisplay from './_components/StudentNonScoreSummaryDisplay';

export default function NonScoresPage() {
    const params = useParams();
    const studentId = params.id as string;
    const { students, loading: studentsLoading, error: studentsError } = useFetchStudents();
    const { studentNonScores, loading: nonScoresLoading, error: nonScoresError } = useStudentAllNonScore(studentId);

    // 학생 목록 로딩 중인 경우
    if (studentsLoading || nonScoresLoading) {
        return <LoadingState data="학생과 비교과 성적" />;
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
    if (nonScoresError) {
        return <ErrorState message={nonScoresError} />;
    }

    // 성적 데이터가 없는 경우
    if (!studentNonScores) {
        return (
            <NoDataMessage
                title={`${currentStudent.studentName} 학생의 비교과 성적 없음`}
                message={`${currentStudent.studentName} 학생의 성적 데이터가 없습니다.`}
            />
        );
    }

    // 성적 데이터가 있는 경우
    return <StudentNonScoreSummaryDisplay studentNonScores={studentNonScores} student={currentStudent} />;
} 