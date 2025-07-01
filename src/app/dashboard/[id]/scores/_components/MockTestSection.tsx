"use client";

import { MonthlyMockTestGrade } from "@/app/types/scores";
import { Month, MOCK_TEST_MONTHS } from "@/app/constants";
import { Student } from "@/app/types/students";
import MockTestTable from "./MockTestTable";
import ScoreSubmissionMockTestModal from "@/app/main/_components/_modal/ScoreSubmissionMockTestModal";

interface MockTestSectionProps {
    mockTestScores: Partial<Record<"march" | "june" | "september" | "november", MonthlyMockTestGrade>>;
    student: Student;
    modalState: {
        isModalOpen: (key: string) => boolean;
        openModal: (key: string) => void;
        closeModal: (key: string) => void;
    };
}

export default function MockTestSection({
    mockTestScores,
    student,
    modalState,
}: MockTestSectionProps) {
    const handleMockTestModalOpen = () => {
        modalState.openModal('mockTest');
    };

    const handleMockTestModalClose = () => {
        modalState.closeModal('mockTest');
    };

    return (
        <>
            <div className="space-y-5">
                <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold text-gray-900">모의고사 성적</h2>
                        <button
                            onClick={handleMockTestModalOpen}
                            className="bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded-md mr-3"
                        >
                            성적 관리하기
                        </button>
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

            {/* 모의고사 성적 모달 */}
            <ScoreSubmissionMockTestModal
                isOpen={modalState.isModalOpen('mockTest')}
                onClose={handleMockTestModalClose}
                student={student}
                initialScores={mockTestScores}
                onSubmit={(status) => {
                    console.log("모의고사 성적 제출 완료:", status);
                    handleMockTestModalClose();
                }}
                onSave={(status) => {
                    console.log("모의고사 성적 임시 저장:", status);
                    handleMockTestModalClose();
                }}
            />
        </>
    );
} 