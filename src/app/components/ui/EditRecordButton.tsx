"use client";

import { useModalState } from "@/app/hooks/useModalState";

import ScoreSubmission3Modal from "@/app/main/_components/_modal/ScoreSubmission3Modal";
import ScoreSubmissionMockTestModal from "@/app/main/_components/_modal/ScoreSubmissionMockTestModal";
import EditSemesterRankGradeModal from "@/app/dashboard/[id]/scores/_components/_modals/EditSemesterRankGradeModal";
import CreativeActivityModal from "@/app/dashboard/[id]/non-scores/_components/_modal/CreativeActivityModal";
import DetailedAndSpecialModal from "@/app/dashboard/[id]/non-scores/_components/_modal/DetailedAndSpecialModal";
import GeneralOpinionModal from "@/app/dashboard/[id]/non-scores/_components/_modal/GeneralOpinionModal";

import {
    ScoreRowData,
    MonthlyMockTestGradeMap,
    CreativeActivity,
    DetailedAndSpecial,
    GeneralOpinion,
    TotalScores,
} from "@/app/types/scores";
import { Student } from "@/app/types/students";

export type EditRecordData =
    | ScoreRowData[]
    | MonthlyMockTestGradeMap
    | TotalScores
    | CreativeActivity
    | DetailedAndSpecial[]
    | GeneralOpinion;


interface EditRecordButtonProps {
    recordType: "grade" | "mockTest" | "rank" | "creativeActivity" | "detailedAndSpecial" | "generalOpinion";
    student?: Student;
    schoolYear?: string;
    initialData: EditRecordData;
    onSubmit: (data: EditRecordData) => void;
    onSave: (data: EditRecordData) => void;
}

export default function EditRecordButton({
    recordType,
    student,
    schoolYear,
    initialData,
    onSubmit,
    onSave,
}: EditRecordButtonProps) {
    // 1. 모달 상태들을 map으로 통합
    const modalStateMap = {
        grade: useModalState(),
        mockTest: useModalState(),
        rank: useModalState(),
        creativeActivity: useModalState(),
        detailedAndSpecial: useModalState(),
        generalOpinion: useModalState(),
    };

    const modal = modalStateMap[recordType];

    const handleOpen = () => modal.openModal(recordType);
    const handleClose = () => modal.closeModal(recordType);

    // 2. recordType에 따라 모달을 렌더링
    const renderModal = () => {
        switch (recordType) {
            case "grade":
                return (
                    <ScoreSubmission3Modal
                        isOpen={modal.isModalOpen(recordType)}
                        onClose={handleClose}
                        student={student!}
                        initialScores={initialData as ScoreRowData[]}
                        onSubmit={() => {
                            onSubmit(initialData);
                            handleClose();
                        }}
                        onSave={() => {
                            onSave(initialData);
                            handleClose();
                        }}
                    />
                );
            case "mockTest":
                return (
                    <ScoreSubmissionMockTestModal
                        isOpen={modal.isModalOpen(recordType)}
                        onClose={handleClose}
                        student={student!}
                        initialScores={initialData as MonthlyMockTestGradeMap}
                        onSubmit={() => {
                            onSubmit(initialData);
                            handleClose();
                        }}
                        onSave={() => {
                            onSave(initialData);
                            handleClose();
                        }}
                    />
                );
            case "rank":
                return (
                    <EditSemesterRankGradeModal
                        isOpen={modal.isModalOpen(recordType)}
                        onClose={handleClose}
                        initialGrade={initialData as TotalScores}
                        onSubmit={(data) => {
                            onSubmit(data);
                            handleClose();
                        }}
                        onSave={(data) => {
                            onSave(data);
                            handleClose();
                        }}
                    />
                );
            case "creativeActivity":
                return (
                    <CreativeActivityModal
                        isOpen={modal.isModalOpen(recordType)}
                        onClose={handleClose}
                        schoolYear={schoolYear || ''}
                        initialData={initialData as CreativeActivity}
                        onSubmit={(data) => {
                            onSubmit(data);
                            handleClose();
                        }}
                        onSave={(data) => {
                            onSave(data);
                            handleClose();
                        }}
                    />
                );
            case "detailedAndSpecial":
                return (
                    <DetailedAndSpecialModal
                        isOpen={modal.isModalOpen(recordType)}
                        onClose={handleClose}
                        schoolYear={schoolYear || ''}
                        initialData={initialData as DetailedAndSpecial[]}
                        onSubmit={(data) => {
                            onSubmit(data);
                            handleClose();
                        }}
                        onSave={(data) => {
                            onSave(data);
                            handleClose();
                        }}
                    />
                );
            case "generalOpinion":
                return (
                    <GeneralOpinionModal
                        isOpen={modal.isModalOpen(recordType)}
                        onClose={handleClose}
                        schoolYear={schoolYear || ''}
                        initialData={initialData as GeneralOpinion}
                        onSubmit={(data) => {
                            onSubmit(data);
                            handleClose();
                        }}
                        onSave={(data) => {
                            onSave(data);
                            handleClose();
                        }}
                    />
                );
        }
    };

    // 3. 버튼 + 모달 렌더링
    return (
        <>
            <button
                className="hover:underline text-gray-700 hover:text-indigo-500 px-3 py-1 font-semibold cursor-pointer"
                onClick={handleOpen}
            >
                수정 하기
            </button>
            {renderModal()}
        </>
    );
}
