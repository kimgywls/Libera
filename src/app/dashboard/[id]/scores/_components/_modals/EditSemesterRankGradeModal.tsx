"use client";

import SubmitModal from "@/app/components/modal/SubmitModal";
import { TotalScores } from "@/app/types/scores";
import SemesterGradeTable from "../SemesterGradeTable";

interface EditSemesterRankGradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialGrade: TotalScores;
    onSubmit: (updated: TotalScores) => void;
    onSave: (updated: TotalScores) => void;
}

export default function EditSemesterRankGradeModal({
    isOpen,
    onClose,
    initialGrade,
    onSubmit,
    onSave,
}: EditSemesterRankGradeModalProps) {
    return (
        <SubmitModal
            isOpen={isOpen}
            onClose={onClose}
            modalType="saveAndSubmit"
            modalSize="xlarge"
            modalTitle="학기별 석차 등급 관리"
            modalDescription="학기별 석차 등급 데이터를 수정하고 저장 또는 제출할 수 있습니다."
            onSubmit={() => onSubmit(initialGrade)}
            onSave={() => onSave(initialGrade)}
        >
            <SemesterGradeTable grade={initialGrade.bySemester} isEditable={true} />
        </SubmitModal>
    );
}
