"use client";

import { useParams } from "next/navigation";
import { useStudentScores } from "./_hooks/use-scores";
import StudentAllScoresDisplay from "./_components/StudentAllScoresDisplay";
import LoadingState from "../../_components/LoadingState";
import ErrorState from "../../_components/ErrorState";
import NoGradesMessage from "../../_components/NoDataMessage";

export default function ScoresPage() {
    const params = useParams();
    const studentId = params.id as string;
    const { scores, loading: scoresLoading, error: scoresError } = useStudentScores(studentId);

    if (scoresLoading) {
        return <LoadingState data="학생과 성적 데이터" />;
    }

    if (scoresError) {
        return <ErrorState message={scoresError.message} />;
    }

    if (!scores || scores.length === 0) {
        return <NoGradesMessage message={"학생의 성적 데이터가 없습니다."} />;
    }

    return <StudentAllScoresDisplay studentId={studentId} />;
} 