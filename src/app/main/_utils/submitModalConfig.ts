import { Student } from "@/app/types/students";
import { ScoreSubmissionType } from "@/app/constants";

interface ModalConfig {
    title: string;
    description: string;
    modalType: "submit" | "saveAndSubmit";
    modalSize: "small" | "medium" | "large";
}

// 성적 제출 모달 설정 함수
export const getModalConfig = (student: Student | null, type: ScoreSubmissionType): ModalConfig => {
    const configs: Record<ScoreSubmissionType, ModalConfig> = {
        scoreSubmission_2: {
            title: `2-2 성적 제출${student?.studentName ? ` - ${student.studentName}` : ''}`,
            description: "2-2 성적표를 PDF 파일로 업로드해주세요.",
            modalType: "submit",
            modalSize: "medium"
        },
        scoreSubmission_3: {
            title: `3-1 성적 입력${student?.studentName ? ` - ${student.studentName}` : ''}`,
            description: "3-1 성적을 직접 입력해주세요. 저장 버튼을 누르면 임시 저장되고, 제출 버튼을 누르면 최종 제출됩니다.",
            modalType: "saveAndSubmit",
            modalSize: "large"
        },
        scoreSubmission_mockTest: {
            title: `모의고사 성적 입력${student?.studentName ? ` - ${student.studentName}` : ''}`,
            description: "3월, 6월 모의고사 성적을 직접 입력해주세요. 저장 버튼을 누르면 임시 저장되고, 제출 버튼을 누르면 최종 제출됩니다.",
            modalType: "saveAndSubmit",
            modalSize: "large"
        }
    };

    return configs[type];
};