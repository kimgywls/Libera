"use client";

import { useParams } from 'next/navigation';
import { useFetchStudents } from '@/app/main/_hooks/useFetchStudents';
import { Student } from '@/app/types/students';
import { useStudentAllNonScore } from '../../_hooks/useStudentNonScore';
import NoGradesMessage from '../scores/_components/NoGradesMessage';
import LoadingState from '../scores/_components/LoadingState';
import ErrorState from '../scores/_components/ErrorState';
import StudentNotFound from '../scores/_components/StudentNotFound';
import StudentNonScoreSummaryDisplay from './StudentNonScoreSummaryDisplay';

export default function NonScoresPage() {
    const params = useParams();
    const studentId = params.id as string;
    const { students, loading: studentsLoading, error: studentsError } = useFetchStudents();
    const { studentNonScores, loading: nonScoresLoading, error: nonScoresError } = useStudentAllNonScore(studentId);

    // 학생 목록 로딩 중인 경우
    if (studentsLoading) {
        return <LoadingState />;
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

    // 성적 데이터 로딩 중인 경우
    if (nonScoresLoading) {
        return <LoadingState />;
    }

    // 성적 데이터 에러가 발생한 경우
    if (nonScoresError) {
        return <ErrorState message={nonScoresError} />;
    }

    // 성적 데이터가 없는 경우
    if (!studentNonScores) {
        return (
            <NoGradesMessage
                message={`${currentStudent.studentName} 학생의 성적 데이터가 없습니다.`}
            />
        );
    }

    // 성적 데이터가 있는 경우
    return <StudentNonScoreSummaryDisplay studentNonScores={studentNonScores} student={currentStudent} />;
} 