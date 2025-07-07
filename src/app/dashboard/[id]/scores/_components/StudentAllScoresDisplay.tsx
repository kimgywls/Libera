import React, { useContext, useMemo } from "react";
import { useStudentScores } from "../_hooks/use-scores";
import {
    useOverallGpa,
} from "../_hooks/use-gpa-scores";
import { useStudentTrend } from "../_hooks/use-trends";
import StudentScoresTable from "./StudentScoresTable";
import SemesterGpaTable from "./SemesterGpaTable";
import StudentInfo from "@/app/dashboard/_components/StudentInfo";
import { useStudentContext } from "@/app/dashboard/contexts/StudentContext";
import SemesterTrendChart from "./SemesterTrendChart";
import { StudentTrendResponse } from "@/app/types/scores";
import CurriculumGpaTable from "./CurriculumGpaTable";

// props 타입 분리
type StudentAllScoresDisplayProps = {
    studentId: string;
    grade?: number;
    semester?: number;
    curriculum?: string;
};


/**
 * 학생의 전체 성적 및 GPA를 테이블로 출력하는 컴포넌트
 * - 성적, 전체/학기/교과 GPA를 한 번에 보여줌
 * - 성능 최적화 및 타입 분리
 */
const StudentAllScoresDisplay: React.FC<StudentAllScoresDisplayProps> = React.memo(
    ({ studentId }) => {

        const { student } = useStudentContext();

        // 성적 데이터
        const { scores, loading, error } = useStudentScores(studentId);
        // GPA 데이터
        const { overallGpa } = useOverallGpa(Number(studentId));

        // 성적 등급 추이 데이터
        const { trend, loading: loadingTrend, error: errorTrend } = useStudentTrend(studentId);

        // 로딩/에러 처리
        if (loading) return <div>성적을 불러오는 중...</div>;
        if (error) return <div>성적 조회 오류: {error.message}</div>;
        if (!scores || scores.length === 0)
            return <div>성적 데이터가 없습니다.</div>;

        return (
            <div className="flex flex-col gap-4">

                <StudentInfo student={student} overallGrade={overallGpa?.gpa ?? 0} />

                {/* 성적 테이블 */}
                <StudentScoresTable scores={scores} />

                {/* 학기 별 GPA 테이블 */}
                <SemesterGpaTable trend={trend ?? {} as StudentTrendResponse} loading={loadingTrend} error={errorTrend} />

                {/* 학기 별 성적 등급 추이 차트 */}
                <SemesterTrendChart trend={trend ?? {} as StudentTrendResponse} loading={loadingTrend} error={errorTrend} />
            </div>
        );
    }
);

StudentAllScoresDisplay.displayName = "StudentAllScoresDisplay";

export default StudentAllScoresDisplay;
