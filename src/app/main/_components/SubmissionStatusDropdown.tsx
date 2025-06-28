import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { SUBMISSION_STATUS, SubmissionStatus, ScoreSubmissionType } from "@/app/constants";
import { Student } from "@/app/types/students";

interface Props {
    label: string; // 성적표 종류 레이블 (2-2, 3-1, 모의고사)
    status: SubmissionStatus; // 현재 제출 상태
    type: ScoreSubmissionType; // 성적표 종류 (gradeSubmission_2 등)
    student: Student; // 대상 학생
    onChange: (type: ScoreSubmissionType, status: SubmissionStatus) => void; // 상태 변경 핸들러
    onOpenModal: (student: Student, type: ScoreSubmissionType) => void; // 제출 모달 열기 핸들러
}

export default function SubmissionStatusDropdown({
    label, status, type, student, onChange, onOpenModal,
}: Props) {
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 여부
    const ref = useRef<HTMLDivElement>(null); // 외부 클릭 감지를 위한 ref

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    // 제출 상태에 따른 색상 클래스 반환
    const getColor = (s: SubmissionStatus) => {
        switch (s) {
            case SUBMISSION_STATUS.NOT_SUBMITTED:
                return "bg-red-100 text-red-800";
            case SUBMISSION_STATUS.IN_PROGRESS:
                return "bg-yellow-100 text-yellow-800";
            case SUBMISSION_STATUS.DONE:
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        // 전체 드롭다운 래퍼
        <div className="flex items-center justify-center mb-1 last:mb-0 relative w-full" ref={ref}>
            {/* 레이블 텍스트 */}
            <span className="text-sm text-gray-600 mr-4">{label}</span>

            {/* 상태 버튼 + 드롭다운 영역 */}
            <div className="relative">
                {/* 완료 상태면 그냥 텍스트 표시 */}
                {status === SUBMISSION_STATUS.DONE ? (
                    <div className={`px-2 py-1 rounded text-sm font-medium ${getColor(status)}`}>
                        {status}
                    </div>
                ) : (
                    // NOT_SUBMITTED 또는 IN_PROGRESS 상태
                    <div className="flex items-center space-x-2">
                        {/* 상태 표시 및 열기 버튼 */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen((prev) => !prev);
                            }}
                            className={`flex items-center px-2 py-1 rounded text-sm font-medium ${getColor(status)} hover:opacity-80`}
                        >
                            {status}
                            <ChevronDown className="h-3 w-3 ml-1" />
                        </button>

                        {/* 제출하기 버튼 (미제출 상태일 때만 노출) */}
                        {status === SUBMISSION_STATUS.NOT_SUBMITTED && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenModal(student, type);
                                }}
                                className="px-2 py-1 bg-violet-500 text-white text-xs rounded hover:bg-violet-600"
                            >
                                제출하기
                            </button>
                        )}
                    </div>
                )}

                {/* 드롭다운 메뉴 */}
                {isOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow z-10 min-w-24">
                        {Object.values(SUBMISSION_STATUS).map((s) => (
                            <button
                                key={s}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onChange(type, s); // 상태 변경 트리거
                                    setIsOpen(false); // 닫기
                                }}
                                className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${s === status
                                        ? "bg-violet-50 text-violet-600"
                                        : "text-gray-700"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
