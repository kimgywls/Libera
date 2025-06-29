"use client";

import { UserX } from "lucide-react";

interface StudentNotFoundProps {
    message?: string;
}

export default function StudentNotFound({ message = "학생을 찾을 수 없습니다." }: StudentNotFoundProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <UserX className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">학생 없음</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
                onClick={() => window.history.back()}
                className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600"
            >
                뒤로 가기
            </button>
        </div>
    );
} 