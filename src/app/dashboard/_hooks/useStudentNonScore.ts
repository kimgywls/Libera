import { useEffect, useState, useCallback } from "react";
import { getStudentNonScores } from "../_actions/fetch-parsed-non-scores";
import { NonScoreSummary } from "../../types/scores";

// 특정 학생의 비교과 데이터를 관리하는 훅
export function useStudentAllNonScore(studentId: string) {
    const [studentNonScores, setStudentNonScores] = useState<NonScoreSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudentGrades = useCallback(async () => {
        if (!studentId) {
            setStudentNonScores(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getStudentNonScores(studentId);
            setStudentNonScores({
                studentId: data.nonScoreRows.studentId,
                bySchoolYear: data.nonScoreRows.bySchoolYear,
            });
        } catch (err) {
            setError("학생 성적 데이터를 불러오는데 실패했습니다.");
            console.error("Failed to fetch student grades:", err);
        } finally {
            setLoading(false);
        }
    }, [studentId]);

    useEffect(() => {
        fetchStudentGrades();
    }, [fetchStudentGrades]);

    return {
        studentNonScores,
        loading,
        error,
        reload: fetchStudentGrades,
    };
} 