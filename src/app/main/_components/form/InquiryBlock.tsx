import React from "react";
import { inquiryOptions } from "@/app/constants"; // 과학/사회 과목 옵션들
import GradeSelect from "./GradeSelect"; // 등급 선택 드롭다운

// Props 정의
interface InquiryBlockProps {
    inquiryNumber: '1' | '2';          // 탐구 1 or 탐구 2
    type: string;                      // 영역 (science | social)
    subject: string;                   // 과목명
    grade: string;                     // 등급
    hasBorder?: boolean;              // 테두리 여부
    onTypeChange: (type: string) => void;     // 영역 변경 콜백
    onSubjectChange: (subject: string) => void; // 과목 변경 콜백
    onGradeChange: (grade: string) => void;     // 등급 변경 콜백
}

// 탐구 영역 블록 컴포넌트
export default function InquiryBlock({
    inquiryNumber,
    type,
    subject,
    grade,
    hasBorder,
    onTypeChange,
    onSubjectChange,
    onGradeChange,
}: InquiryBlockProps) {
    return (
        // 기본적으로 flex-row / border 여부는 prop으로 결정
        <div className={`flex flex-row gap-1 ${hasBorder ? 'p-3 border border-gray-300 rounded-md' : ''}`}>
            {/* 영역 선택 */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    탐구{inquiryNumber} 영역
                </label>
                <select
                    value={type}
                    onChange={(e) => onTypeChange(e.target.value)}
                    className="w-full border border-gray-400 rounded-md px-1.5 py-2 text-sm"
                >
                    <option value="">영역 선택</option>
                    <option value="science">과학</option>
                    <option value="social">사회</option>
                </select>
            </div>

            {/* 영역이 선택되었을 경우: 과목 선택 */}
            {type && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        탐구{inquiryNumber} 과목
                    </label>
                    <select
                        value={subject}
                        onChange={(e) => onSubjectChange(e.target.value)}
                        className="w-full border border-gray-400 rounded-md px-1.5 py-2 text-sm"
                    >
                        <option value="">과목 선택</option>
                        {inquiryOptions[type as 'science' | 'social'].map((opt) => (
                            <option key={opt.value} value={opt.label}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* 과목이 선택되었을 경우: 등급 선택 */}
            {subject && (
                <GradeSelect
                    label={`탐구${inquiryNumber} 등급`}
                    value={grade}
                    onChange={onGradeChange}
                />
            )}
        </div>
    );
}
