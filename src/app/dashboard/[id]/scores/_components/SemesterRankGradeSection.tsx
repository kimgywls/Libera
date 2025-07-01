"use client";

import { TotalScores } from "@/app/types/scores";
import { Student } from "@/app/types/students";
import SemesterGradeTable from "./SemesterGradeTable";
import EditSemesterGradeModal from "./_modals/EditSemesterGradeModal";

interface SemesterRankGradeSectionProps {
    totalGrade: TotalScores;
    student: Student;
    modalState: {
        isModalOpen: (key: string) => boolean;
        openModal: (key: string) => void;
        closeModal: (key: string) => void;
    };
}

export default function SemesterRankGradeSection({
    totalGrade,
    student,
    modalState,
}: SemesterRankGradeSectionProps) {
    const handleSemesterGradeModalOpen = () => {
        modalState.openModal('semesterGrade');
    };

    const handleSemesterGradeModalClose = () => {
        modalState.closeModal('semesterGrade');
    };

    return (
        <>
            <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">학기별 석차 등급</h2>
                <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold text-gray-900">
                            전학기 내신 성적 : {totalGrade?.overallGrade}
                        </h2>
                        <button
                            onClick={handleSemesterGradeModalOpen}
                            className="bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded-md mr-3"
                        >
                            석차 등급 관리하기
                        </button>
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

            {/* 학기별 석차 등급 모달 */}
            <EditSemesterGradeModal
                isOpen={modalState.isModalOpen('semesterGrade')}
                onClose={handleSemesterGradeModalClose}
                initialGrade={totalGrade! || {
                    studentId: student.id,
                    bySemester: {},
                    overallGrade: 0,
                }}
                onSubmit={(status) => {
                    console.log("학기별 석차 등급 제출 완료:", status);
                    handleSemesterGradeModalClose();
                }}
                onSave={(status) => {
                    console.log("학기별 석차 등급 임시 저장:", status);
                    handleSemesterGradeModalClose();
                }}
            />
        </>
    );
} 