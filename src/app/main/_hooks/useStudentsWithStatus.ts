import { Student } from "@/app/types/students";
import { SUBMISSION_STATUS } from "@/app/constants";

// 성적 제출 상태 타입 정의
interface ScoreSubmission {
    contact: string;
    scoreSubmission_2?: string;
    scoreSubmission_3?: string;
    scoreSubmission_mockTest?: string;
}

interface ScoreStatus {
    scoreSubmitted_2: string;
    scoreSubmitted_3: string;
    scoreSubmitted_mockTest: string;
}

interface StudentWithStatus {
    student: Student;
    index: number;
    scoreStatus: ScoreStatus;
}

interface UseStudentsWithStatusReturn {
    studentsWithStatus: StudentWithStatus[];
    totalStudents: number;
}

// 학생 정보 + 제출 상태를 결합하여 반환
export const useStudentsWithStatus = (
    students: Student[],
    scoreSubmissions: ScoreSubmission[]
): UseStudentsWithStatusReturn => {
    const studentsWithStatus: StudentWithStatus[] = students.map((student, index) => {
        const submission = scoreSubmissions.find(s => s.contact === student.contact);

        const scoreStatus: ScoreStatus = {
            scoreSubmitted_2: submission?.scoreSubmission_2 ?? SUBMISSION_STATUS.NOT_SUBMITTED,
            scoreSubmitted_3: submission?.scoreSubmission_3 ?? SUBMISSION_STATUS.NOT_SUBMITTED,
            scoreSubmitted_mockTest: submission?.scoreSubmission_mockTest ?? SUBMISSION_STATUS.NOT_SUBMITTED,
        };

        return { student, index, scoreStatus };
    });

    return {
        studentsWithStatus,
        totalStudents: students.length,
    };
};

// 개별 학생의 성적 제출 상태만 추출하는 유틸 함수
export const getScoreSubmissionStatus = (
    contact: string,
    scoreSubmissions: ScoreSubmission[]
): ScoreStatus => {
    const submission = scoreSubmissions.find(s => s.contact === contact);

    return {
        scoreSubmitted_2: submission?.scoreSubmission_2 ?? SUBMISSION_STATUS.NOT_SUBMITTED,
        scoreSubmitted_3: submission?.scoreSubmission_3 ?? SUBMISSION_STATUS.NOT_SUBMITTED,
        scoreSubmitted_mockTest: submission?.scoreSubmission_mockTest ?? SUBMISSION_STATUS.NOT_SUBMITTED,
    };
};
