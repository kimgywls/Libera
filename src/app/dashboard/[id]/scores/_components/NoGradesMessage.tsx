"use client";

import { FileText } from "lucide-react";

interface NoGradesMessageProps {
    message?: string;
}

export default function NoGradesMessage({ message = "성적 데이터가 없습니다." }: NoGradesMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">성적 없음</h2>
            <p className="text-gray-600">{message}</p>
        </div>
    );
} 