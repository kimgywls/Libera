"use client";

import { TotalScores } from "@/app/types/scores";
import { Student } from "@/app/types/students";
import SemesterGradeTable from "./SemesterGradeTable";
import EditRecordButton from "@/app/components/ui/EditRecordButton";

interface SemesterRankGradeSectionProps {
    totalGrade: TotalScores;
    student: Student;

}

export default function SemesterRankGradeSection({
    totalGrade,
    student,
}: SemesterRankGradeSectionProps) {

    return (
        <>
            <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">학기별 석차 등급</h2>
                <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold text-gray-900">
                            전학기 내신 성적 : {totalGrade?.overallGrade}
                        </h2>
                        <EditRecordButton
                            recordType="rank"
                            initialData={totalGrade}
                            student={student}
                            onSubmit={(data) => { console.log("성적 저장", data); }}
                            onSave={(data) => { console.log("성적 임시저장", data); }}
                        />

                    </div>
                    <div className="flex flex-col gap-4">
                        {totalGrade ? (
                            <SemesterGradeTable grade={totalGrade.bySemester} />
                        ) : (
                            <div className="text-gray-500 text-center py-4">석차 등급 데이터를 불러오는 중...</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
} 