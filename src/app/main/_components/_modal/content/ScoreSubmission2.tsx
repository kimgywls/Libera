"use client";

import { useState } from "react";
import { PdfSubmissionData } from "@/app/types/scores";

// 컴포넌트 Props 정의
interface ScoreSubmission2Props {
    contact: string; // 학생 연락처
    studentName: string; // 학생 이름
    onDataChange?: (data: PdfSubmissionData, isValid: boolean) => void; // 상위로 데이터 전달 콜백
}

// PDF 파일 업로드 컴포넌트
export default function ScoreSubmission2({
    contact,
    studentName,
    onDataChange
}: ScoreSubmission2Props) {
    const [file, setFile] = useState<File | null>(null); // 업로드된 파일 상태

    // 파일 선택 핸들러 (input[type="file"] 이벤트)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;
        setFile(selectedFile);

        const isValid = selectedFile !== null;
        const data: PdfSubmissionData = { file: selectedFile! };
        onDataChange?.(data, isValid);
    };


    // 드래그 앤 드롭 파일 업로드 처리
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile); // 상태에 파일 저장
        }
    };

    // 드래그 오버 시 기본 동작 방지 (필수)
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <div
                className={`
                    border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors 
                    ${file ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-gray-400'}
                `}
                onClick={() => document.getElementById('file-input')?.click()} // 클릭 시 input 트리거
                onDrop={handleDrop} // 드롭 핸들러
                onDragOver={handleDragOver} // 드래그 오버 핸들러
            >
                {/* 실제 input[type=file] 요소는 숨김 처리 */}
                <input
                    id="file-input"
                    type="file"
                    accept=".pdf" // pdf만 허용
                    onChange={handleFileChange}
                    className="hidden"
                />
                {/* 파일이 있을 경우 파일 이름 출력 */}
                {file ? (
                    <div>
                        <div className="text-gray-700 font-medium mb-2">파일이 선택되었습니다</div>
                        <div className="text-sm text-gray-600">{file.name}</div>
                    </div>
                ) : (
                    // 없을 경우 안내 메시지 출력
                    <div>
                        <div className="text-gray-600 mb-2">PDF 파일을 드래그하거나 클릭하여 선택하세요</div>
                        <div className="text-sm text-gray-500">지원 형식: PDF</div>
                    </div>
                )}
            </div>
        </div>
    );
}
