"use client";

import { MonthlyMockTestGrade } from "@/app/types/scores";
import { Month, MOCK_TEST_MONTHS } from "@/app/constants";
import { Student } from "@/app/types/students";
import MockTestTable from "./MockTestTable";
import EditRecordButton from "@/app/components/ui/EditRecordButton";

interface MockTestSectionProps {
    mockTestScores: Partial<Record<"march" | "june" | "september" | "november", MonthlyMockTestGrade>>;
    student: Student;
}

export default function MockTestSection({
    mockTestScores,
    student,
}: MockTestSectionProps) {

    return (
        <>
            <div className="space-y-5">
                <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold text-gray-900">모의고사 성적</h2>
                        <EditRecordButton
                            recordType="mockTest"
                            initialData={mockTestScores}
                            student={student}
                            onSubmit={(data) => { console.log("성적 저장", data); }}
                            onSave={(data) => { console.log("성적 임시저장", data); }}
                        />

                    </div>
                    <div className="flex flex-col gap-4">
                        {MOCK_TEST_MONTHS.map((month) => (
                            <MockTestTable
                                key={month}
                                month={month}
                                testData={mockTestScores[month as Month]!}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
} 