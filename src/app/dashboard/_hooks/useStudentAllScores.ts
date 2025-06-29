import { useEffect, useState } from "react";
import { getStudentAllScores } from "../_actions/fetch-parsed-grades";
import { ScoreRowData, MockTestSubmissionData } from "../../types/scores";

type StudentAllScores = {
    scoreRows: ScoreRowData[];
    mockTest: MockTestSubmissionData;
};

// 특정 학생의 성적 데이터를 관리하는 훅
export function useStudentAllScores(studentId: string) {
    const [studentGrades, setStudentGrades] = useState<StudentAllScores | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudentGrades = async () => {
        if (!studentId) {
            setStudentGrades(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getStudentAllScores(studentId);
            setStudentGrades(data);
        } catch (err) {
            setError("학생 성적 데이터를 불러오는데 실패했습니다.");
            console.error("Failed to fetch student grades:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentGrades();
    }, [studentId]);

    return {
        studentGrades,
        loading,
        error,
        reload: fetchStudentGrades,
    };
} 