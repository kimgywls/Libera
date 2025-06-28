"use client";

import { useState, useEffect, useCallback } from "react";
import { PdfSubmissionData } from "@/app/types/scores";

interface ScoreSubmission2Props {
    contact: string;
    studentName: string;
    onDataChange?: (data: PdfSubmissionData, isValid: boolean) => void;
}

export default function ScoreSubmission2({
    contact,
    studentName,
    onDataChange
}: ScoreSubmission2Props) {
    const [file, setFile] = useState<File | null>(null);

    // 데이터 유효성 검사
    const isDataValid = useCallback(() => {
        return file !== null;
    }, [file]);

    // 데이터 변경 시 상위 컴포넌트에 알림
    useEffect(() => {
        if (file) {
            const data: PdfSubmissionData = { file };
            onDataChange?.(data, isDataValid());
        } else {
            onDataChange?.({ file: null as any }, false);
        }
    }, [file, onDataChange, isDataValid]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${file ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                onClick={() => document.getElementById('file-input')?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />
                {file ? (
                    <div>
                        <div className="text-gray-700 font-medium mb-2">파일이 선택되었습니다</div>
                        <div className="text-sm text-gray-600">{file.name}</div>
                    </div>
                ) : (
                    <div>
                        <div className="text-gray-600 mb-2">PDF 파일을 드래그하거나 클릭하여 선택하세요</div>
                        <div className="text-sm text-gray-500">지원 형식: PDF</div>
                    </div>
                )}
            </div>
        </div>
    );
} 