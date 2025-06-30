import { useEffect, useState, useCallback } from "react";
import { getStudentAllScores } from "../_actions/fetch-parsed-scores";
import { StudentAllScores } from "../../types/scores";

// 특정 학생의 성적 데이터를 관리하는 훅
export function useStudentAllScores(studentId: string) {
    const [studentAllScores, setStudentAllScores] = useState<StudentAllScores | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudentGrades = useCallback(async () => {
        if (!studentId) {
            setStudentAllScores(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getStudentAllScores(studentId);
            setStudentAllScores({
                studentId: data.studentId,
                scores: data.scoreRows,
                mockTests: [data.mockTest]
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
        studentAllScores,
        loading,
        error,
        reload: fetchStudentGrades,
    };
} 