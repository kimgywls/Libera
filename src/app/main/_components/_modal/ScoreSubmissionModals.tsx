import React from "react";
import { Student } from "@/app/types/students";
import { SCORE_SUBMISSION_TYPE, ScoreSubmissionType } from "@/app/constants";
import ScoreSubmission2Modal from "./ScoreSubmission2Modal";
import ScoreSubmission3Modal from "./ScoreSubmission3Modal";
import ScoreSubmissionMockTestModal from "./ScoreSubmissionMockTestModal";

interface ScoreSubmissionModalsProps {
    isOpen: boolean;
    submissionType: ScoreSubmissionType;
    student: Student;
    onClose: () => void;
    onSubmit: () => void;
    onSave: () => void;
}

export default function ScoreSubmissionModals({
    isOpen,
    submissionType,
    student,
    onClose,
    onSubmit,
    onSave
}: ScoreSubmissionModalsProps) {
    // 공통 props 정의
    const commonProps = {
        isOpen,
        onClose,
        student,
        onSubmit,
        onSave
    };

    // 타입별 모달 렌더링
    const renderModal = () => {
        switch (submissionType) {
            case SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_2:
                return <ScoreSubmission2Modal {...commonProps} />;

            case SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_3:
                return <ScoreSubmission3Modal {...commonProps} />;

            case SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_MOCK_TEST:
                return <ScoreSubmissionMockTestModal {...commonProps} />;

            default:
                console.warn(`Unknown submission type: ${submissionType}`);
                return null;
        }
    };

    return renderModal();
}