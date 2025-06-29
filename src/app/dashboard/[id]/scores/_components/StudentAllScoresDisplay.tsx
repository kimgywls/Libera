"use client";

import { MockTestSubmissionData, ScoreRowData, SubjectType, MonthlyMockTestScore } from "@/app/types/scores";
import { Month } from "@/app/constants";
import { Student } from "@/app/types/students";
import GradeTable from "./GradeTable";
import StudentInfo from "./StudentInfo";
import MockTestTable from "./MockTestTable";
import { useModal } from "@/app/hooks/useModal";
import ScoreSubmissionMockTestModal from "@/app/main/_components/_modal/ScoreSubmissionMockTestModal";
import ScoreSubmission3Modal from "@/app/main/_components/_modal/ScoreSubmission3Modal";

type StudentAllScores = {
    scoreRows: ScoreRowData[];
    mockTest: MockTestSubmissionData;
};

interface StudentAllScoresDisplayProps {
    studentAllScores: StudentAllScores;
    student: Student;
}

const SUBJECT_TYPES: SubjectType[] = ["일반선택", "진로선택", "체육/예술"];
const SEMESTERS = ["1-1", "1-2", "2-1", "2-2", "3-1"];
const MOCK_TEST_MONTHS = ["march", "june", "september", "november"];

export default function StudentAllScoresDisplay({
    studentAllScores,
    student,
}: StudentAllScoresDisplayProps) {
    const { scoreRows, mockTest } = studentAllScores;

    // 성적 테이블 모달 상태 (각 학기별)
    const scoreModals = {
        "1-1": useModal(),
        "1-2": useModal(),
        "2-1": useModal(),
        "2-2": useModal(),
        "3-1": useModal(),
    };
    // 모의고사 모달 상태
    const mockTestModal = useModal();

    const gradesBySemester = scoreRows.reduce((acc, grade) => {
        if (!acc[grade.semester]) {
            acc[grade.semester] = [];
        }
        acc[grade.semester].push(grade);
        return acc;
    }, {} as Record<string, ScoreRowData[]>);


    const handleScoreSubmissionModalOpen = (semester: string) => {
        scoreModals[semester as keyof typeof scoreModals].open();
    };

    const handleScoreSubmissionModalClose = (semester: string) => {
        scoreModals[semester as keyof typeof scoreModals].close();
    };

    const handleMockTestModalOpen = () => {
        mockTestModal.open();
    };

    const handleMockTestModalClose = () => {
        mockTestModal.close();
    };


    return (
        <div className="space-y-6">
            <StudentInfo student={student} />

            <div className="space-y-5">
                <h2 className="text-2xl font-bold text-gray-900">학기별 성적표</h2>

                {SEMESTERS.map((semester) => {
                    const semesterGrades = gradesBySemester[semester];

                    return (
                        <div key={semester} className="bg-white rounded-lg p-4 space-y-2">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                    {semester}학기
                                </h3>
                                <button
                                    onClick={() => handleScoreSubmissionModalOpen(semester)}
                                    className="bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded-md mr-3 "
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
                                        subjectType={type}
                                        grades={filtered}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            <div className="space-y-5">

                <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-2xl font-bold text-gray-900">모의고사 성적</h2>
                        <button
                            onClick={handleMockTestModalOpen}
                            className="bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded-md mr-3 "
                        >
                            성적 관리하기
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {MOCK_TEST_MONTHS.map((month) => (
                            <MockTestTable
                                key={month}
                                month={month}
                                testData={mockTest.scores[month as Month]}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 성적 제출 모달 */}
            <ScoreSubmission3Modal
                isOpen={scoreModals["1-1"].isOpen}
                onClose={() => handleScoreSubmissionModalClose("1-1")}
                student={student}
                initialScores={scoreRows.filter(row => row.semester === "1-1")}
                onSubmit={(status) => {
                    console.log("성적 제출 완료:", status);
                    handleScoreSubmissionModalClose("1-1");
                }}
                onSave={(status) => {
                    console.log("성적 임시 저장:", status);
                    handleScoreSubmissionModalClose("1-1");
                }}
            />

            <ScoreSubmission3Modal
                isOpen={scoreModals["1-2"].isOpen}
                onClose={() => handleScoreSubmissionModalClose("1-2")}
                student={student}
                initialScores={scoreRows.filter(row => row.semester === "1-2")}
                onSubmit={(status) => {
                    console.log("성적 제출 완료:", status);
                    handleScoreSubmissionModalClose("1-2");
                }}
                onSave={(status) => {
                    console.log("성적 임시 저장:", status);
                    handleScoreSubmissionModalClose("1-2");
                }}
            />

            <ScoreSubmission3Modal
                isOpen={scoreModals["2-1"].isOpen}
                onClose={() => handleScoreSubmissionModalClose("2-1")}
                student={student}
                initialScores={scoreRows.filter(row => row.semester === "2-1")}
                onSubmit={(status) => {
                    console.log("성적 제출 완료:", status);
                    handleScoreSubmissionModalClose("2-1");
                }}
                onSave={(status) => {
                    console.log("성적 임시 저장:", status);
                    handleScoreSubmissionModalClose("2-1");
                }}
            />

            <ScoreSubmission3Modal
                isOpen={scoreModals["2-2"].isOpen}
                onClose={() => handleScoreSubmissionModalClose("2-2")}
                student={student}
                initialScores={scoreRows.filter(row => row.semester === "2-2")}
                onSubmit={(status) => {
                    console.log("성적 제출 완료:", status);
                    handleScoreSubmissionModalClose("2-2");
                }}
                onSave={(status) => {
                    console.log("성적 임시 저장:", status);
                    handleScoreSubmissionModalClose("2-2");
                }}
            />

            <ScoreSubmission3Modal
                isOpen={scoreModals["3-1"].isOpen}
                onClose={() => handleScoreSubmissionModalClose("3-1")}
                student={student}
                initialScores={scoreRows.filter(row => row.semester === "3-1")}
                onSubmit={(status) => {
                    console.log("성적 제출 완료:", status);
                    handleScoreSubmissionModalClose("3-1");
                }}
                onSave={(status) => {
                    console.log("성적 임시 저장:", status);
                    handleScoreSubmissionModalClose("3-1");
                }}
            />

            {/* 모의고사 성적 모달 */}
            <ScoreSubmissionMockTestModal
                isOpen={mockTestModal.isOpen}
                onClose={handleMockTestModalClose}
                student={student}
                initialScores={mockTest.scores}
                onSubmit={(status) => {
                    console.log("모의고사 성적 제출 완료:", status);
                    handleMockTestModalClose();
                }}
                onSave={(status) => {
                    console.log("모의고사 성적 임시 저장:", status);
                    handleMockTestModalClose();
                }}
            />
        </div>
    );
}
