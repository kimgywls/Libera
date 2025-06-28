import { useState } from "react";
import { Student } from "@/app/types/students";
import { createStudentAction } from "../_actions/fetch-all-students";

export function useCreateStudent(onSuccess?: (student: Student) => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createStudent = async (student: Student) => {
        setLoading(true);
        setError(null);
        try {
            await createStudentAction(student);
            onSuccess?.(student);
        } catch (err) {
            setError("학생 추가에 실패했습니다.");
            console.error("Create error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { createStudent, loading, error };
}