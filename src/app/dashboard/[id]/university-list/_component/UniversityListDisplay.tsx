"use client";

import { useStudentTotalGrade } from "@/app/dashboard/[id]/scores/_hooks/use-student-total-grade";
import StudentInfo from "../../../_components/StudentInfo";
import { University } from "@/app/types/university";
import { Student } from "@/app/types/students";
import UniversityListSection from "./UniversityListSection";

interface UniversityListDisplayProps {
    student: Student;
    universityList: University[];
}

export default function UniversityListDisplay({
    universityList,
    student,
}: UniversityListDisplayProps) {
    const { studentTotalGrade } = useStudentTotalGrade(student.id);

    return (
        <div className="space-y-6">
            <StudentInfo student={student} overallGrade={studentTotalGrade!.overallGrade} />
            <UniversityListSection universityList={universityList} />
        </div>
    );
}
