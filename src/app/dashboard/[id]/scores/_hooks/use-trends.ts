import { useState, useEffect } from "react";
import { fetchStudentSemesterTrend } from "../_actions/trend-actions";
import type { StudentTrendResponse } from "@/app/types/scores";

export function useStudentTrend(studentId: string | undefined) {
    const [trend, setTrend] = useState<StudentTrendResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!studentId) return;
        setLoading(true);
        setError(null);
        fetchStudentSemesterTrend(studentId)
            .then((data) => setTrend(data.data.semester_trends))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [studentId]);
    //console.log("useStudentTrend", trend);
    return { trend, loading, error };
}
