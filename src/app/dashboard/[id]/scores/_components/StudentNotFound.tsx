"use client";

import { useRouter } from "next/navigation";
import { MainPageButton } from "@/app/components";

export default function StudentNotFound() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">학생을 찾을 수 없습니다</h2>
                <p className="text-gray-600 mb-4">학생 목록에서 다시 선택해주세요.</p>
                <MainPageButton />
            </div>
        </div>
    );
} 