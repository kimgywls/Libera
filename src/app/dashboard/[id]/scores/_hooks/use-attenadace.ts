import { useState, useEffect } from "react";
import { fetchAttendance } from "../_actions/fetch-attendace";
import type { StudentAttendance } from "@/app/types/scores";

export function useAttendance(student_id: number | undefined) {
    const [attendance, setAttendance] = useState<StudentAttendance[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!student_id) return;
        setLoading(true);
        setError(null);
        fetchAttendance(student_id)
            .then((data) => setAttendance(data))
            .catch((e) => setError(e.response?.status === 404 ? "출결 정보를 찾을 수 없습니다" : e.message))
            .finally(() => setLoading(false));
    }, [student_id]);

    return { attendance, loading, error };
}
