import { SUBMISSION_STATUS, SubmissionStatus, ScoreSubmissionType } from "@/app/constants";
import { Student } from "@/app/types/students";

interface Props {
    label: string; // 성적표 종류 레이블 (2-2, 3-1, 모의고사)
    status: SubmissionStatus; // 현재 제출 상태
    type: ScoreSubmissionType; // 성적표 종류 
    student: Student; // 대상 학생
    onChange: (type: ScoreSubmissionType, status: SubmissionStatus) => void; // 상태 변경 핸들러
    onOpenModal: (student: Student, type: ScoreSubmissionType) => void; // 제출 모달 열기 핸들러
}

export default function SubmissionStatusBadge({ label, status, type, student, onOpenModal }: Props) {
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
        <div className="flex items-center justify-center mb-1 last:mb-0 w-full gap-2">
            <span className="text-sm text-gray-600 mr-4">{label}</span>
            <span className={`px-2 py-1 rounded text-sm font-medium ${getColor(status)}`}>{status}</span>
            {/*
            {status === SUBMISSION_STATUS.NOT_SUBMITTED && (
                <button
                    onClick={() => onOpenModal(student, type)}
                    className="px-2 py-1 bg-violet-500 text-white text-xs rounded hover:bg-violet-600"
                >
                    제출하기
                </button>
            )}
            */}
        </div>
    );
}
