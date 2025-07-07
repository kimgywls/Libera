"use client";

import { Search } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import { Student } from "@/app/types/students";
import { SUBMISSION_STATUS, SubmissionStatus, ScoreSubmissionType } from "@/app/constants";
import SubmissionStatusBadge from "./SubmissionStatusBadge";
import React, { memo } from "react";

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

// 학생 한 명의 정보를 테이블 row로 렌더링
const StudentsRow: React.FC<StudentsRowProps> = memo(({
    student,
    index,
    isSelected = false,
    onSelect,
    pdfRef,
}) => {
    const router = useRouter();

    const handlePrint = useReactToPrint({
        contentRef: pdfRef,
        documentTitle: `${student.name}_성적표`,
    });

    // 행 클릭 시 학생 상세 대시보드로 이동
    const handleRowClick = async (e: React.MouseEvent) => {
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
        <tr onClick={handleRowClick} className="border-t hover:bg-gray-50 text-center cursor-pointer text-black">
            {/* 체크박스 */}
            <td className="px-4 py-3 text-center text-black" onClick={handleCheckboxClick}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect?.(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
            </td>

            {/* 번호 */}
            <td className="px-4 py-3 font-medium text-black">{index + 1}</td>

            {/* 이름 */}
            <td className="px-4 py-3 font-semibold text-black">{student.name}</td>

            {/* 연락처 */}
            <td className="px-4 py-3 text-black">{student.phone_number}</td>

            {/* 현재 학교 */}
            <td className="px-4 py-3 text-black">{student.current_school_name}</td>

            {/* 희망 학교 */}
            <td className="p-4 text-black">
                {student.desired_school ? (
                    <div>{student.desired_school}</div>
                ) : (
                    <div>-</div>
                )}
            </td>

            {/* 희망 학과 */}
            <td className="px-4 py-3 text-black">
                {student.desired_department ? (
                    <span className="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                        {student.desired_department}
                    </span>
                ) : (
                    <div>-</div>
                )}
            </td>

            {/* 성적 제출 상태 드롭다운 */}
            <td className="px-4 py-3 text-black">
                {student.completion_status}
            </td>

            {/* 내보내기 버튼 */}
            <td className="px-4 py-3 text-black">
                <button onClick={handlePrint} className="px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-black transition-colors">
                    내보내기
                </button>
            </td>
        </tr>
    );
});

export default StudentsRow;

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
