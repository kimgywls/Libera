"use client";

import { useState } from "react";
import SubmitModal from "@/app/components/modal/SubmitModal";
import DetailedAndSpecialTable from "../../_components/DetailedAndSpecialTable";
import { DetailedAndSpecial } from "@/app/types/scores";

interface DetailedAndSpecialModalProps {
    isOpen: boolean;
    onClose: () => void;
    schoolYear: string;
    initialData?: DetailedAndSpecial[];
    onSubmit?: (data: DetailedAndSpecial[]) => void;
    onSave?: (data: DetailedAndSpecial[]) => void;
}

export default function DetailedAndSpecialModal({
    isOpen,
    onClose,
    schoolYear,
    initialData,
    onSubmit,
    onSave
}: DetailedAndSpecialModalProps) {
    const [formData, setFormData] = useState(initialData || []);

    const handleDataChange = (key: string, value: string) => {
        setFormData(prev => {
            const index = prev.findIndex(item => item.subject === key);
            if (index >= 0) {
                const newData = [...prev];
                newData[index] = { ...newData[index], comment: value };
                return newData;
            }
            return prev;
        });
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
                <DetailedAndSpecialTable
                    schoolYear={schoolYear}
                    detailedAndSpecial={formData}
                    isEditable={true}
                    onChange={handleDataChange}
                />
            </SubmitModal>
        </>
    );
}