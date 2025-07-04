"use client";

import EditRecordButton from "@/app/components/ui/EditRecordButton";
import { ScoreRowData } from "@/app/types/scores";
import { SEMESTER, SUBJECT_TYPES, SubjectType } from "@/app/constants";
import { Student } from "@/app/types/students";
import GradeTable from "./GradeTable";


interface StudentGradeSectionProps {
    gradesBySemester: Record<string, ScoreRowData[]>;
    student: Student;
}

export default function StudentGradeSection({
    gradesBySemester,
    student,
}: StudentGradeSectionProps) {

    return (
        <>
            <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">학기별 성적표</h2>

                {Object.values(SEMESTER).map((semester) => {
                    const semesterGrades = gradesBySemester[semester];

                    return (
                        <div key={semester} className="bg-white rounded-lg p-4 space-y-2">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {semester}학기
                                </h3>
                                <EditRecordButton
                                    recordType="grade"
                                    initialData={gradesBySemester[semester] || []}
                                    student={student}
                                    onSubmit={(data) => { console.log("성적 저장", data); }}
                                    onSave={(data) => { console.log("성적 임시저장", data); }}
                                />

                            </div>
                            {SUBJECT_TYPES.map((type) => {
                                const filtered = semesterGrades?.filter((g) => g.subjectType === type) || [];
                                return (
                                    <GradeTable
                                        key={`${semester}-${type}`}
                                        semester={semester}
                                        subjectType={type as SubjectType}
                                        grades={filtered}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
} 