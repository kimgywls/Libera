/* eslint-disable */
"use client";
import { Search } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import { Student } from "@/app/types/students";
import { SUBMISSION_STATUS, SubmissionStatus, ScoreSubmissionType } from "@/app/constants";
import { ScoreRowData, MonthlyMockTestGradeMap, SemesterGrade, OverallGradeForChart } from "@/app/types/scores";
import SubmissionStatusBadge from "./SubmissionStatusBadge";
import React, { useRef } from "react";
import StudentExportPDF from "./StudentExportPDF";
import { useStudentAllScores } from "@/app/dashboard/[id]/scores/_hooks/use-student-all-scores";
import { useStudentTotalGrade } from "@/app/dashboard/[id]/scores/_hooks/use-student-total-grade";
import { getChartDataBySubject } from "@/app/dashboard/[id]/scores/_utils/getChartDataBySubject";
import { DISPLAY_SUBJECTS } from "@/app/constants";

// Props 타입 정의
interface StudentsRowProps {
    student: Student;
    index: number; // 목록 번호
    scoreSubmitted_2?: SubmissionStatus; // 2-2 성적 제출 상태
    scoreSubmitted_3?: SubmissionStatus; // 3-1 성적 제출 상태
    scoreSubmitted_mockTest?: SubmissionStatus; // 모의고사 제출 상태
    isSelected?: boolean; // 체크박스 선택 여부
    onSelect?: (checked: boolean) => void; // 체크박스 변경 핸들러
    onUpdateScoreSubmission?: (type: ScoreSubmissionType, value: SubmissionStatus) => void; // 성적 제출 상태 변경 콜백
    onOpenModal?: (student: Student, type: ScoreSubmissionType) => void; // 모달 열기 콜백
    pdfRef: React.RefObject<HTMLDivElement>;
}

// 학생 테이블의 한 줄 컴포넌트
export default function StudentsRow({
    student,
    index,
    scoreSubmitted_2 = SUBMISSION_STATUS.NOT_SUBMITTED,
    scoreSubmitted_3 = SUBMISSION_STATUS.NOT_SUBMITTED,
    scoreSubmitted_mockTest = SUBMISSION_STATUS.NOT_SUBMITTED,
    isSelected = false,
    onSelect,
    onUpdateScoreSubmission,
    onOpenModal,
    pdfRef,
}: StudentsRowProps) {
    const router = useRouter();

    const handlePrint = useReactToPrint({
        contentRef: pdfRef,
        documentTitle: `${student.studentName}_성적표`,
    });

    // 행 클릭 시 학생 상세 대시보드로 이동
    const handleRowClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'INPUT') return; // 체크박스 클릭 방지

        const target = e.target as HTMLElement;
        const td = target.closest('td');
        if (td && (td.cellIndex === 7 || td.cellIndex === 8)) return; // 성적 제출 셀은 클릭 무시

        router.push(`/dashboard/${student.id}/scores`); // scores 페이지로 이동
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 행 클릭 방지
    };

    return (
        <tr onClick={handleRowClick} className="border-t hover:bg-gray-50 text-center cursor-pointer">
            {/* 체크박스 */}
            <td className="px-4 py-3 text-center" onClick={handleCheckboxClick}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect?.(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
            </td>

            {/* 번호 */}
            <td className="px-4 py-3 font-medium">{index + 1}</td>

            {/* 이름 */}
            <td className="px-4 py-3 font-semibold">{student.studentName}</td>

            {/* 연락처 */}
            <td className="px-4 py-3">{student.contact}</td>

            {/* 현재 학교 */}
            <td className="px-4 py-3">{student.currentSchool}</td>

            {/* 희망 학교 */}
            <td className="p-4 ">
                {student.desiredSchool.length > 0 ? (
                    student.desiredSchool.map((school, index) => (
                        <div key={index}>- {school}</div>
                    ))
                ) : (
                    <div>-</div>
                )}
            </td>


            {/* 희망 학과 */}
            <td className="px-4 py-3 h-[120px] flex flex-col justify-center items-center">
                {student.desiredMajor.length > 0 ? (
                    student.desiredMajor.map((major, index) => (
                        <span
                            key={index}
                            className="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800"
                        >
                            {major}
                        </span>
                    ))
                ) : (
                    <div>-</div>
                )}
            </td>



            {/* 성적 제출 상태 드롭다운 */}
            <td className="px-4 py-3">
                <div className="text-left w-full">
                    <SubmissionStatusBadge
                        label="2-2 성적"
                        status={scoreSubmitted_2}
                        type="scoreSubmission_2"
                        student={student}
                        onChange={onUpdateScoreSubmission || (() => { })}
                        onOpenModal={onOpenModal || (() => { })}
                    />
                    <SubmissionStatusBadge
                        label="3-1 성적"
                        status={scoreSubmitted_3}
                        type="scoreSubmission_3"
                        student={student}
                        onChange={onUpdateScoreSubmission || (() => { })}
                        onOpenModal={onOpenModal || (() => { })}
                    />
                    {/*
                    <SubmissionStatusBadge
                        label="모의고사"
                        status={scoreSubmitted_mockTest}
                        type="scoreSubmission_mockTest"
                        student={student}
                        onChange={onUpdateScoreSubmission || (() => { })}
                        onOpenModal={onOpenModal || (() => { })}
                    />
                    */}
                </div>
            </td>

            {/* 내보내기 버튼 */}
            <td className="px-4 py-3">
                <button onClick={handlePrint} className="px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-black transition-colors">
                    내보내기
                </button>
            </td>
        </tr>
    );
}

// 검색 결과 없음 상태 시 렌더링되는 빈 행
export function EmptyStudentsRow({ columnCount }: { columnCount?: number }) {
    return (
        <tr>
            <td colSpan={columnCount} className="h-24 text-center">
                <div className="flex items-center justify-center space-x-2">
                    <Search className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                </div>
            </td>
        </tr>
    );
}
