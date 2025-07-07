import { useState, useEffect, useCallback } from "react";
import { getStudentsByParamsAction } from "../_actions/fetch-students-list";
import { FetchStudentsListParams, Student } from "@/app/types/students";

export function useSearchStudents(initialParams: FetchStudentsListParams = {}) {
    const [params, setParams] = useState<FetchStudentsListParams>(initialParams);
    const [students, setStudents] = useState<Student[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSearchStudents = useCallback(async () => {
        setIsSearching(true);
        setError(null);
        try {
            const res = await getStudentsByParamsAction(params);
            setStudents(res.students);
            setTotal(res.total);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("검색 실패");
            }
            setStudents([]);
            setTotal(0);
        } finally {
            setIsSearching(false);
        }
    }, [params]);

    useEffect(() => {
        fetchSearchStudents();
    }, [fetchSearchStudents]);

    return { students, total, isSearching, error, params, setParams, reload: fetchSearchStudents };
} 