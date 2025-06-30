"use client";

import { ScoreRowData } from "@/app/types/scores";
import { SEMESTER, SUBJECT_TYPES, SubjectType } from "@/app/constants";
import { Student } from "@/app/types/students";
import GradeTable from "./GradeTable";
import ScoreSubmission3Modal from "@/app/main/_components/_modal/ScoreSubmission3Modal";

interface StudentGradeSectionProps {
    gradesBySemester: Record<string, ScoreRowData[]>;
    student: Student;
    modalState: {
        isModalOpen: (key: string) => boolean;
        openModal: (key: string) => void;
        closeModal: (key: string) => void;
    };
}

export default function StudentGradeSection({
    gradesBySemester,
    student,
    modalState,
}: StudentGradeSectionProps) {
    const handleScoreSubmissionModalOpen = (semester: string) => {
        modalState.openModal(`score-${semester}`);
    };

    const handleScoreSubmissionModalClose = (semester: string) => {
        modalState.closeModal(`score-${semester}`);
    };

    return (
        <>
            <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">학기별 성적표</h2>

                {Object.values(SEMESTER).map((semester) => {
                    const semesterGrades = gradesBySemester[semester];

                    return (
                        <div key={semester} className="bg-white rounded-lg p-4 space-y-2">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {semester}학기
                                </h3>
                                <button
                                    onClick={() => handleScoreSubmissionModalOpen(semester)}
                                    className="bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded-md mr-3"
                                >
                                    성적 관리하기
                                </button>
                            </div>
                            {SUBJECT_TYPES.map((type) => {
                                const filtered = semesterGrades?.filter((g) => g.subjectType === type) || [];
                                return (
                                    <GradeTable
                                        key={`${semester}-${type}`}
                                        semester={semester}
                                        subjectType={type as SubjectType}
                                        grades={filtered}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* 성적 제출 모달 */}
            {Object.values(SEMESTER).map((semester) => (
                <ScoreSubmission3Modal
                    key={semester}
                    isOpen={modalState.isModalOpen(`score-${semester}`)}
                    onClose={() => handleScoreSubmissionModalClose(semester)}
                    student={student}
                    initialScores={gradesBySemester[semester] || []}
                    onSubmit={(status) => {
                        console.log("성적 제출 완료:", status);
                        handleScoreSubmissionModalClose(semester);
                    }}
                    onSave={(status) => {
                        console.log("성적 임시 저장:", status);
                        handleScoreSubmissionModalClose(semester);
                    }}
                />
            ))}
        </>
    );
} 