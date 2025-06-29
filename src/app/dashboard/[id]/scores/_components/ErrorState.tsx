"use client";

import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
    message?: string;
}

export default function ErrorState({ message = "오류가 발생했습니다." }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">오류</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
                onClick={() => window.location.reload()}
                className="bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600"
            >
                다시 시도
            </button>
        </div>
    );
} 