"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Student } from "@/app/types/students";
import { fetchStudentsListAction } from "@/app/main/_actions/fetch-students-list";

interface StudentContextValue {
    student: Student | null;
    loading: boolean;
    error: string | null;
}

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export const StudentProvider = ({
    studentId,
    children,
}: {
    studentId: number;
    children: React.ReactNode;
}) => {
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        // id 파라미터로 검색
        fetchStudentsListAction({ id: studentId })
            .then((res) => {
                if (res.students && res.students.length > 0) {
                    setStudent(res.students[0]);
                } else {
                    setStudent(null);
                    setError("학생 정보를 찾을 수 없습니다.");
                }
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [studentId]);

    return (
        <StudentContext.Provider value={{ student, loading, error }}>
            {children}
        </StudentContext.Provider>
    );
};

export function useStudentContext() {
    const ctx = useContext(StudentContext);
    if (!ctx) throw new Error("useStudentContext must be used within StudentProvider");
    return ctx;
}
