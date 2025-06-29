import { useState, useEffect } from "react";
import { Student } from "@/app/types/students";
import { getStudentsAction } from "@/app/main/_actions/fetch-all-students";

// 학생 목록 조회 훅
export function useFetchStudents() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudents = async () => {
        try {
            const data = await getStudentsAction();
            setStudents(data);
        } catch {
            setError("불러오기 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStudents(); }, []);

    return { students, loading, error, reload: fetchStudents };
}
