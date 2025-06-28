"use client";

import { useState } from "react";
import ScoreSubmission3Row from "./ScoreSubmission3Row";
import { ScoreRowData } from "@/app/types/scores";

const defaultRow: ScoreRowData = {
    subjectType: "일반선택",
    subject: "",
    course: "",
    rawScore: "",
    average: "",
    unit: "",
    totalStudents: "",
    grade: "",
    achievement: "",
};

export default function ScoreSubmission3Table() {
    const [rows, setRows] = useState<ScoreRowData[]>(
        Array.from({ length: 5 }, () => ({ ...defaultRow }))
    );

    const handleRowChange = (index: number, updated: ScoreRowData) => {
        const newRows = [...rows];
        newRows[index] = updated;
        setRows(newRows);
    };

    const addRow = () => {
        setRows([...rows, { ...defaultRow }]);
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">3학년 1학기 성적 입력</h2>

            <div className="max-h-[400px] overflow-y-auto rounded px-3 space-y-2">
                {rows.map((row, index) => (
                    <ScoreSubmission3Row
                        key={index}
                        data={row}
                        onChange={(data) => handleRowChange(index, data)}
                    />
                ))}
            </div>

            <button
                onClick={addRow}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                + 과목 추가
            </button>
        </div>
    );
}
