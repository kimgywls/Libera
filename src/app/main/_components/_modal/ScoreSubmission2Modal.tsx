import { useState } from "react";
import SubmitModal from "@/app/components/modal/SubmitModal";
import ScoreSubmission2 from "./content/ScoreSubmission2";
import { Student } from "@/app/types/students";
import { SCORE_SUBMISSION_TYPE, SUBMISSION_STATUS } from "@/app/constants";
import { getModalConfig } from "../../_utils/submitModalConfig";

// 모달 Props 정의
interface ScoreSubmission2ModalProps {
    isOpen: boolean; // 모달 열림 여부
    onClose: () => void; // 모달 닫기 핸들러
    student?: Student | null; // 학생 정보
    onSubmit?: (status: typeof SUBMISSION_STATUS.DONE) => void; // 제출 완료 콜백
    onSave?: (status: typeof SUBMISSION_STATUS.IN_PROGRESS) => void; // 저장 콜백
}

// 2-2 성적 제출 모달 (PDF 업로드 기반)
export default function ScoreSubmission2Modal({
    isOpen,
    onClose,
    student,
    onSubmit,
    onSave
}: ScoreSubmission2ModalProps) {
    const [isFormValid, setIsFormValid] = useState(false); // 3-1 성적 데이터 유효성 상태
    const modalConfig = getModalConfig(student as Student, SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_2); // 모달 설정값 동적 구성 (타이틀, 설명 등)

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
            <ScoreSubmission2
                studentName={student?.studentName || ""}
                contact={student?.contact || ""}
                onDataChange={(data, isValid) => {
                    console.log("2-2 제출 데이터:", data, isValid);
                    setIsFormValid(isValid); // 유효성 상태 저장
                }}
            />
        </SubmitModal>
    );
}
