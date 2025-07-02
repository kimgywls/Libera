import { useEffect, useState, useCallback } from "react";
import { getStudentCombinedScores } from "../_actions/fetch-parsed-scores";
import { MonthlyMockTestGrade, MockTestSubmissionData, StudentCombinedScores } from "@/app/types/scores";

// 특정 학생의 성적 데이터를 관리하는 훅
export function useStudentAllScores(studentId: string) {
    const [studentCombinedScores, setStudentCombinedScores] = useState<StudentCombinedScores | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudentGrades = useCallback(async () => {
        if (!studentId) {
            setStudentCombinedScores(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await getStudentCombinedScores(studentId);
            setStudentCombinedScores({
                studentId: data.studentId,
                subjectScores: data.subjectScores,
                mockTestScores: convertMockTestScores(data.mockTestScores),
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
        studentCombinedScores,
        loading,
        error,
        reload: fetchStudentGrades,
    };
}

function convertMockTestScores(submission: MockTestSubmissionData): Partial<Record<"march" | "june" | "september" | "november", MonthlyMockTestGrade>> {
    return {
        march: submission.scores?.march,
        june: submission.scores?.june,
        september: submission.scores?.september,
        november: submission.scores?.november,
    };
} 