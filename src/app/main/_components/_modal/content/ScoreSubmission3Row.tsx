import React from "react";
import { ScoreRowData } from "@/app/types/scores";
import AchievementSelect from "../../form/AchievementSelect";
import GradeSelect from "../../form/GradeSelect";

// 각 행의 Props: 현재 데이터와 변경 핸들러
interface ScoreSubmission3RowProps {
    data: ScoreRowData; // 하나의 성적 행 데이터
    onChange: (newData: ScoreRowData) => void; // 해당 행의 값 변경 시 상위로 전달
}

// 한 줄짜리 성적 입력 UI 컴포넌트
export default function ScoreSubmission3Row({ data, onChange }: ScoreSubmission3RowProps) {
    // 공통 핸들러: 특정 필드의 값을 수정
    const handleChange = (field: keyof ScoreRowData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="grid grid-cols-9 gap-2 mb-2 text-black">
            {/* 이수 구분 (일반선택 / 진로선택) */}
            <div className="flex flex-col space-x-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    이수 구분
                </label>
                <select
                    value={data.subjectType}
                    onChange={(e) =>
                        handleChange("subjectType", e.target.value as "일반선택" | "진로선택")
                    }
                    className="border px-1.5 py-2 rounded-md border border-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                >
                    <option value="일반선택">일반선택</option>
                    <option value="진로선택">진로선택</option>
                    <option value="체육/예술">체육/예술</option>
                </select>
            </div>

            {/* 교과명 입력 */}
            <Input
                label="교과명"
                type="text"
                placeholder="교과명"
                value={data.subject}
                onChange={(value) => handleChange("subject", value)}
            />

            {/* 과목명 입력 */}
            <Input
                label="과목명"
                type="text"
                placeholder="과목명"
                value={data.course}
                onChange={(value) => handleChange("course", value)}
            />

            {/* 원점수 입력 */}
            <Input
                label="원점수"
                type="number"
                placeholder="원점수"
                value={data.rawScore?.toString() || ""}
                onChange={(value) => handleChange("rawScore", value)}
            />

            {/* 평균 입력 */}
            <Input
                label="평균"
                type="number"
                placeholder="평균"
                value={data.averageSubject?.toString() || ""}
                onChange={(value) => handleChange("averageSubject", value)}
            />

            {/* 단위 수 입력 */}
            <Input
                label="단위 수"
                type="number"
                placeholder="단위 수"
                value={data.unit?.toString() || ""}
                onChange={(value) => handleChange("unit", value)}
            />

            {/* 이수자 수 입력 */}
            <Input
                label="이수자 수"
                type="number"
                placeholder="이수자 수"
                value={data.totalStudents || ""}
                onChange={(value) => handleChange("totalStudents", value)}
            />

            {/* 등급 선택 */}
            <GradeSelect
                label="등급"
                value={data.grade || ""}
                onChange={(value: string) => handleChange("grade", value)}
            />

            {/* 성취도 선택 */}
            <AchievementSelect
                label="성취도"
                value={data.achievement || ""}
                onChange={(value: string) => handleChange("achievement", value)}
            />
        </div >
    );
}

// Input 컴포넌트: 텍스트 또는 숫자 입력 필드를 재사용
const Input = ({
    label,
    value,
    onChange,
    placeholder,
    type,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type: "text" | "number";
}) => {
    return (
        <div className="flex flex-col space-x-2 text-black">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border px-1.5 py-2 rounded-md border border-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
        </div>
    );
};
