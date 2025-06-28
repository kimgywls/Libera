import { useEffect, useState } from "react";
import StudentSearchFilter from "./StudentSearchFilter";
import StudentsAddButton from "./StudentsAddButton";
import { Student } from "@/app/types/students";

interface StudentsHeaderProps {
    students: Student[];
    onFilteredStudentsChange: (filteredStudents: Student[]) => void;
}

export default function StudentsHeader({ students, onFilteredStudentsChange }: StudentsHeaderProps) {
    const handleFilteredStudents = (filtered: Student[]) => {
        onFilteredStudentsChange(filtered);
    };

    return (
        <div className="flex flex-col items-center w-full px-3 pt-5 max-h-screen">
            <header className="w-full mb-5">
                <h1 className="text-3xl font-bold text-black">학생 목록</h1>
            </header>

            <section className="w-full flex flex-row">
                <div className="flex-1">
                    <StudentSearchFilter
                        allStudents={students}
                        onFiltered={handleFilteredStudents}
                    />
                </div>
                <div className="w-1/3 flex justify-end">
                    <StudentsAddButton />
                </div>
            </section>
        </div>
    );
}
