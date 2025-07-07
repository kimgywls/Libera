import { useState } from "react";
import { StudentCreate, StudentSummary } from "@/app/types/students";
import { createStudentAction } from "../_actions/fetch-students-list";

export function useCreateStudent(onSuccess?: (student: StudentSummary) => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createStudent = async (student: StudentCreate) => {
        setLoading(true);
        setError(null);
        try {
            const result = await createStudentAction(student);
            onSuccess?.(result);
            console.log(result);
        } catch (err: any) {
            if (err?.response?.status === 400) {
                setError("요청 데이터 오류입니다.");
            } else if (err?.response?.status === 500) {
                setError("서버 내부 오류입니다.");
            } else {
                setError("학생 추가에 실패했습니다.");
            }
            console.error("Create error:", err);
        } finally {
            setLoading(false);
        }
    };

    return { createStudent, loading, error, setError };
}