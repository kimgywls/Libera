"use client";

import { useState } from "react";
import { Student } from "@/app/types/students";
import {
    School,
    Target,
    BookOpen,
    TrendingUp,
    MapPin,
    GraduationCap,
    Calendar
} from "lucide-react";
import { useConsultationDate } from "../_hooks/useConsultationDate";

interface StudentInfoProps {
    student: Student;
    overallGrade: number;
}

export default function StudentInfo({ student, overallGrade }: StudentInfoProps) {
    const { consultationDate, isEditing, setIsEditing, setConsultationDate, save } = useConsultationDate(student.consultationDate || "");

    // 상담 날짜 포맷팅 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* 헤더 섹션 */}
            <div className="border-b border-gray-300 px-6 pt-6 pb-2">
                <div className="flex items-center justify-between space-x-4">
                    <div>
                        <h1 className="text-3xl font-bold text-black">{student.studentName}</h1>
                        <p className="text-gray-500 mt-1">학생 정보</p>
                    </div>
                    <div className="flex flex-row space-x-2 w-1/2 justify-end">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Calendar className="w-5 h-5 text-green-500 mr-2 whitespace-nowrap" />
                            상담 일정
                        </h3>

                        <div className="p-4 ">
                            <div className="flex items-start space-x-3
                            ">
                                <div className="flex-1">
                                    {isEditing ? (
                                        <div className="flex items-center space-x-3 mt-1">
                                            <input
                                                type="date"
                                                className="border rounded px-2 py-1 text-gray-700 w-full"
                                                value={consultationDate}
                                                onChange={(e) => setConsultationDate(e.target.value)}
                                            />
                                            <button
                                                className="px-2 py-2 text-gray-500 text-bold rounded-md hover:bg-green-100 whitespace-nowrap"
                                                onClick={save}
                                            >
                                                저장
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2 mt-1">
                                            <p className="text-lg font-semibold text-gray-900 mt-1 w-full">
                                                {formatDate(consultationDate)}
                                            </p>
                                            <button
                                                className="px-3 py-2 text-gray-500 text-bold rounded-md hover:bg-green-100 whitespace-nowrap"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                수정
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 정보 섹션 */}
            <div className="p-6">
                <div className="grid grid-cols-2 gap-2">
                    {/* 현재 상태 */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <School className="w-5 h-5 text-blue-600 mr-2" />
                            현재 상태
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">재학 중인 학교</p>
                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                        {student.currentSchool}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">전체 내신 성적</p>
                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                        {overallGrade ? overallGrade.toString() : "미입력"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 목표 설정 */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Target className="w-5 h-5 text-red-500 mr-2" />
                            진학 목표
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start space-x-3">
                                <GraduationCap className="w-5 h-5 text-red-500 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-700">목표 대학</p>
                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                        {student.desiredSchool}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <div className="flex items-start space-x-3">
                                <BookOpen className="w-5 h-5 text-red-500 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-700">희망 전공</p>
                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                        {student.desiredMajor}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}