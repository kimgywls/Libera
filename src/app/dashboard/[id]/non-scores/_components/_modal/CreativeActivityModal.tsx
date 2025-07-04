"use client";

import { useState } from "react";
import SubmitModal from "@/app/components/modal/SubmitModal";
import CreativeActivityTable from "../../_components/CreativeActiveTable";
import { CreativeActivity } from "@/app/types/scores";

interface CreativeActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    schoolYear: string;
    initialData?: CreativeActivity;
    onSubmit?: (data: CreativeActivity) => void;
    onSave?: (data: CreativeActivity) => void;
}

export default function CreativeActivityModal({
    isOpen,
    onClose,
    schoolYear,
    initialData,
    onSubmit,
    onSave
}: CreativeActivityModalProps) {
    const [formData, setFormData] = useState(initialData || {
        freeActivity: "",
        clubActivity: "",
        careerActivity: ""
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
                <CreativeActivityTable
                    schoolYear={schoolYear}
                    creativeActivity={formData}
                    isEditable={true}
                    onChange={handleDataChange}
                />
            </SubmitModal>
        </>
    );
}