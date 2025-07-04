"use client";

import { useState } from "react";
import SubmitModal from "@/app/components/modal/SubmitModal";
import GeneralOpinionTable from "../../_components/GeneralOpinionTable";
import { GeneralOpinion } from "@/app/types/scores";

interface GeneralOpinionModalProps {
    isOpen: boolean;
    onClose: () => void;
    schoolYear: string;
    initialData?: GeneralOpinion;
    onSubmit?: (data: GeneralOpinion) => void;
    onSave?: (data: GeneralOpinion) => void;
}

export default function GeneralOpinionModal({
    isOpen,
    onClose,
    schoolYear,
    initialData,
    onSubmit,
    onSave
}: GeneralOpinionModalProps) {
    const [formData, setFormData] = useState(initialData || {
        generalOpinion: ""
    });

    const handleDataChange = (key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };
    return (
        <>
            <SubmitModal
                isOpen={isOpen}
                onClose={onClose}
                modalType="saveAndSubmit"
                modalSize="large"
                modalTitle="창의적 체험활동 관리"
                modalDescription="창의적 체험활동 데이터를 수정하고 저장 또는 제출할 수 있습니다."
                onSubmit={onSubmit ? () => onSubmit(formData) : () => { }}
                onSave={onSave ? () => onSave(formData) : () => { }}
            >
                <GeneralOpinionTable
                    schoolYear={schoolYear}
                    generalOpinion={formData}
                    isEditable={true}
                    onChange={handleDataChange}
                />
            </SubmitModal>
        </>
    );
}