"use client";

import { useState, useEffect } from "react";
import ScoreSubmission3Row from "./ScoreSubmission3Row";
import { ScoreRowData, defaultScoreRowData } from "@/app/types/scores";
import { CirclePlus } from "lucide-react";

// 성적 테이블 Props 정의
interface ScoreSubmission3TableProps {
    onDataChange?: (data: ScoreRowData[]) => void; // 행 데이터 전체가 변경되면 상위에 전달
    initialScores?: ScoreRowData[]; // 초기 성적 데이터
}

// 성적 입력 테이블 컴포넌트
export default function ScoreSubmission3Table({ onDataChange, initialScores }: ScoreSubmission3TableProps) {
    // 초기 데이터가 있으면 사용, 없으면 기본 5개 행
    const [rows, setRows] = useState<ScoreRowData[]>(
        initialScores && initialScores.length > 0
            ? initialScores
            : Array.from({ length: 5 }, () => ({ ...defaultScoreRowData }))
    );

    // 특정 행이 수정되었을 때 처리
    const handleRowChange = (index: number, updated: ScoreRowData) => {
        const newRows = [...rows];        // 기존 행 배열 복사
        newRows[index] = updated;         // 해당 인덱스만 수정
        setRows(newRows);                 // 상태 업데이트
    };

    // 행 추가 버튼 클릭 시 새로운 빈 행 추가
    const addRow = () => {
        setRows([...rows, { ...defaultScoreRowData }]);
    };

    // 행 데이터가 변경될 때마다 상위 컴포넌트로 전달
    useEffect(() => {
        onDataChange?.(rows);
    }, [rows, onDataChange]);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-3">성적 입력
                <span className="text-sm text-gray-500 ml-2">
                    {initialScores?.length}개의 과목이 있습니다.
                </span>
            </h2>

            {/* 스크롤 가능한 테이블 영역 */}
            <div className="max-h-[400px] overflow-y-auto rounded px-3 space-y-2">
                {/* 각 행(과목) 렌더링 */}
                {rows.map((row, index) => (
                    <ScoreSubmission3Row
                        index={index}
                        data={row}
                        onChange={(data) => handleRowChange(index, data)}
                    />
                ))}
            </div>

            {/* 행 추가 버튼 */}
            <button
                onClick={addRow}
                className="p-2 flex items-center justify-center text-violet-500 rounded-md cursor-pointer"
            >
                <CirclePlus className="w-6 h-6" />
                <span className="ml-2 font-semibold">과목 추가</span>
            </button>
        </div>
    );
}
