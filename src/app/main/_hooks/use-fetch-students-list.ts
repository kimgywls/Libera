import { useEffect, useState, useCallback } from "react";
import { fetchStudentsListAction } from "../_actions/fetch-students-list";
import { Student, FetchStudentsListResponse } from "@/app/types/students";

export function useFetchStudentsList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data: FetchStudentsListResponse = await fetchStudentsListAction();
            setStudents(data.students);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { students, loading, error, refetch: fetch };
} 