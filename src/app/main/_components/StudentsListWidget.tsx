"use client";

import { useEffect, useState } from "react";
import StudentsHeader from "./StudentsHeader";
import StudentsTable from "./StudentsTable";
import { useStudents } from "../_hooks/useStudents";
import { Student } from "@/app/types/students";

export default function StudentsListWidget() {
    const { students, loading, error, reload } = useStudents();
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

    useEffect(() => {
        setFilteredStudents(students); // 초기에는 전체 목록
    }, [students]);

    const handleFilteredStudentsChange = (filteredStudents: Student[]) => {
        setFilteredStudents(filteredStudents);
    };

    return (
        <div className="flex flex-col items-center w-full max-h-screen">
            <section className="w-full flex flex-col space-y-5">
                <StudentsHeader
                    students={students}
                    onFilteredStudentsChange={handleFilteredStudentsChange}
                />
                <StudentsTable
                    students={filteredStudents}
                    loading={loading}
                    error={error}
                    reload={reload}
                />
            </section>
        </div>
    );
}
