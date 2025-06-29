"use client";

import { useRouter } from "next/navigation";
import { MainPageButton } from "@/app/components";

interface NoGradesMessageProps {
    studentName: string;
    schoolName: string;
}

export default function NoGradesMessage({ studentName, schoolName }: NoGradesMessageProps) {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">교과 성적</h1>
                    <p className="text-gray-600 mb-4">{studentName} - {schoolName}</p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-800">PDF 성적표가 아직 업로드되지 않았습니다.</p>
                        <p className="text-yellow-700 text-sm mt-1">메인 페이지에서 성적표를 업로드해주세요.</p>
                    </div>
                    <MainPageButton />
                </div>
            </div>
        </div>
    );
} 