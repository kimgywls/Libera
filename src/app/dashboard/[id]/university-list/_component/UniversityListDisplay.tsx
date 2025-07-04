"use client";

import { useStudentTotalGrade } from "@/app/dashboard/_hooks/useStudentTotalGrade";
import StudentInfo from "../../../_components/StudentInfo";
import { StudentRecommendedUniversityList } from "@/app/types/university";
import { Student } from "@/app/types/students";
import UniversityListSection from "./UniversityListSection";

interface UniversityListDisplayProps {
    student: Student;
    recommandUniversityList: StudentRecommendedUniversityList[];
}

export default function UniversityListDisplay({
    recommandUniversityList,
    student,
}: UniversityListDisplayProps) {
    const { studentTotalGrade } = useStudentTotalGrade(student.id);

    return (
        <div className="space-y-6">
            <StudentInfo student={student} overallGrade={studentTotalGrade!.overallGrade} />

            <UniversityListSection
                recommandUniversityList={recommandUniversityList}
            />
        </div>
    );
}
