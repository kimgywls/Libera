import { useState } from "react";
import SubmitModal from "@/app/components/modal/SubmitModal";
import ScoreSubmission3 from "./_contents/ScoreSubmission3";
import { Student } from "@/app/types/students";
import { SCORE_SUBMISSION_TYPE, SUBMISSION_STATUS } from "@/app/constants";
import { getModalConfig } from "../../_utils/submitModalConfig";
import { ScoreRowData } from "@/app/types/scores";

interface ScoreSubmission3ModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
    onSubmit?: (status: typeof SUBMISSION_STATUS.DONE) => void;
    onSave?: (status: typeof SUBMISSION_STATUS.IN_PROGRESS) => void;
    initialScores?: ScoreRowData[]; // 초기 성적 데이터
}

export default function ScoreSubmission3Modal({
    isOpen,
    onClose,
    student,
    onSubmit,
    onSave,
    initialScores
}: ScoreSubmission3ModalProps) {
    const [isFormValid, setIsFormValid] = useState(false); // 폼 데이터 유효성 상태
    const modalConfig = getModalConfig(student as Student, SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_3); // 모달 설정값 동적 구성 (타이틀, 설명 등)

    // 최종 제출 시 (완료)
    const handleSubmit = () => {
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
            <ScoreSubmission3
                studentName={student.studentName}
                contact={student.contact}
                onDataChange={(data, isValid) => {
                    console.log("3-1 제출 데이터:", data, isValid);
                    setIsFormValid(isValid);
                }}
                initialScores={initialScores}
            />
        </SubmitModal>
    );
} 