import React from "react";
import { ScoreRowData } from "@/app/types/scores";

interface ScoreSubmission3RowProps {
    data: ScoreRowData;
    onChange: (newData: ScoreRowData) => void;
}

export default function ScoreSubmission3Row({ data, onChange }: ScoreSubmission3RowProps) {
    const handleChange = (field: keyof ScoreRowData, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="grid grid-cols-9 gap-2 mb-2">
            <select
                value={data.subjectType}
                onChange={(e) => handleChange("subjectType", e.target.value as "일반선택" | "진로선택")}
                className="border px-2 py-1 rounded"
            >
                <option value="일반선택">일반선택</option>
                <option value="진로선택">진로선택</option>
            </select>

            <input
                type="text"
                placeholder="교과명"
                value={data.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="border px-2 py-1 rounded"
            />

            <input
                type="text"
                placeholder="과목명"
                value={data.course}
                onChange={(e) => handleChange("course", e.target.value)}
                className="border px-2 py-1 rounded"
            />

            <input
                type="number"
                placeholder="원점수"
                value={data.rawScore}
                onChange={(e) => handleChange("rawScore", e.target.value)}
                className="border px-2 py-1 rounded"
            />

            <input
                type="number"
                placeholder="평균"
                value={data.average}
                onChange={(e) => handleChange("average", e.target.value)}
                className="border px-2 py-1 rounded"
            />

            <input
                type="number"
                placeholder="단위 수"
                value={data.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                className="border px-2 py-1 rounded"
            />

            <input
                type="number"
                placeholder="이수자 수"
                value={data.totalStudents}
                onChange={(e) => handleChange("totalStudents", e.target.value)}
                className="border px-2 py-1 rounded"
            />

            <input
                type="text"
                placeholder="등급"
                value={data.grade}
                onChange={(e) => handleChange("grade", e.target.value)}
                className="border px-2 py-1 rounded"
            />
            <input
                type="text"
                placeholder="성취도"
                value={data.achievement}
                onChange={(e) => handleChange("achievement", e.target.value)}
                className="border px-2 py-1 rounded"
            />
        </div>
    );
}
