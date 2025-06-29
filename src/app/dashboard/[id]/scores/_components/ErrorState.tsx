"use client";

import { useRouter } from "next/navigation";
import { MainPageButton } from "@/app/components";

interface ErrorStateProps {
    error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">성적 데이터 오류</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <MainPageButton />
            </div>
        </div>
    );
} 