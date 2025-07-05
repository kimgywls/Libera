import { TotalScores } from "@/app/types/scores";
import { useEffect, useState } from "react";
import { getStudentTotalGrade } from "../_actions/fetch-total-grade";

export function useStudentTotalGrade(studentId: string) {
    const [studentTotalGrade, setStudentTotalGrade] = useState<TotalScores | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudentTotalScores = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getStudentTotalGrade(studentId);
            if (!data.totalScores) {
                setStudentTotalGrade(null);
            } else {
                setStudentTotalGrade({
                    studentId: data.totalScores.studentId,
                    bySemester: data.totalScores.bySemester,
                    overallGrade: data.totalScores.overallGrade,
                });
            }
        } catch (err) {
            console.error("학생 성적 데이터를 불러오는데 실패했습니다:", err);
            setError("학생 성적 데이터를 불러오는데 실패했습니다.");
            setStudentTotalGrade(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentTotalScores();
    }, [studentId]);

    return {
        studentTotalGrade,
        loading,
        error,
        reload: fetchStudentTotalScores,
    };
}
