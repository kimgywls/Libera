import { useEffect, useState, useCallback } from "react";
import { getStudentTotalGrade } from "../_actions/fetch-total-grade";
import { TotalScores } from "../../types/scores";

export function useStudentTotalGrade(studentId: string) {
    const [studentTotalGrade, setStudentTotalGrade] = useState<TotalScores | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudentTotalScores = useCallback(async () => {
        if (!studentId) {
            setStudentTotalGrade(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getStudentTotalGrade(studentId);
            setStudentTotalGrade({
                studentId: data.totalScores.studentId,
                bySemester: data.totalScores.bySemester,
                overallGrade: data.totalScores.overallGrade
            });
        } catch (err) {
            setError("학생 성적 데이터를 불러오는데 실패했습니다.");
            console.error("Failed to fetch student grades:", err);
        } finally {
            setLoading(false);
        }
    }, [studentId]);

    useEffect(() => {
        fetchStudentTotalScores();
    }, [fetchStudentTotalScores]);

    return {
        studentTotalGrade,
        loading,
        error,
        reload: fetchStudentTotalScores,
    };
}