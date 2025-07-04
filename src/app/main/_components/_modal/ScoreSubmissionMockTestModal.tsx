import { useState } from "react";
import SubmitModal from "@/app/components/modal/SubmitModal";
import ScoreSubmissionMockTest from "./_contents/ScoreSubmissionMockTest";
import { Student } from "@/app/types/students";
import { SCORE_SUBMISSION_TYPE, SUBMISSION_STATUS } from "@/app/constants";
import { getModalConfig } from "../../_utils/submitModalConfig";
import { MonthlyMockTestGradeMap } from "@/app/types/scores";

interface ScoreSubmissionMockTestModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
    onSubmit?: (status: typeof SUBMISSION_STATUS.DONE) => void;
    onSave?: (status: typeof SUBMISSION_STATUS.IN_PROGRESS) => void;
    initialScores?: MonthlyMockTestGradeMap;
}

export default function ScoreSubmissionMockTestModal({
    isOpen,
    onClose,
    student,
    onSubmit,
    onSave,
    initialScores,
}: ScoreSubmissionMockTestModalProps) {
    const [isFormValid, setIsFormValid] = useState(true); // 기본값 true로 변경
    const modalConfig = getModalConfig(student as Student, SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_MOCK_TEST); // 모달 설정값 동적 구성 (타이틀, 설명 등)

    // 최종 제출 시 (완료)
    const handleSubmit = () => {
        console.log('제출 버튼 클릭됨, isFormValid:', isFormValid);
        if (isFormValid) {
            onSubmit?.(SUBMISSION_STATUS.DONE); // 제출 상태 상위에 전달
            onClose(); // 모달 닫기
        }
    };

    // 임시 저장 시
    const handleSave = () => {
        onSave?.(SUBMISSION_STATUS.IN_PROGRESS); // 저장 상태 전달
        onClose(); // 모달 닫기
    };

    return (
        <SubmitModal
            isOpen={isOpen}
            onClose={onClose}
            modalType={modalConfig.modalType}
            modalTitle={modalConfig.title}
            modalDescription={modalConfig.description}
            modalSize={modalConfig.modalSize}
            onSubmit={handleSubmit}
            onSave={handleSave}
        >
            <ScoreSubmissionMockTest
                studentName={student.studentName}
                contact={student.contact}
                initialScores={initialScores as MonthlyMockTestGradeMap}
                onDataChange={(data) => {
                    console.log("모의고사 제출 데이터:", data);
                    setIsFormValid(true); // 모의고사는 모든 데이터가 필수가 아니므로 기본적으로 유효
                }}
            />
        </SubmitModal>
    );
} 