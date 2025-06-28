"use client";

import { useState, useEffect, useCallback } from "react";
import GradeSelect from "./GradeSelect";
import StudentInfoForm from "./StudentInfoForm";
import { FormSubmissionData } from "@/app/types/scores";


const initialSubjectState = {
    korean: '',
    math: '',
    english: '',
    inquiry1: '',
    inquiry2: '',
    koreanHistory: '',
};

type Month = 'march' | 'june';

interface ScoreSubmissionMockTestProps {
    contact: string;
    studentName: string;
    onDataChange?: (data: FormSubmissionData, isValid: boolean) => void;
}

export default function ScoreSubmissionMockTest({
    contact,
    studentName,
    onDataChange
}: ScoreSubmissionMockTestProps) {
    const [formData, setFormData] = useState({
        studentName: studentName || '',
        contact: contact || '',
    });

    const [mockTestData, setMockTestData] = useState({
        march: { ...initialSubjectState },
        june: { ...initialSubjectState },
    });

    const updateData = (month: Month, field: string, value: string) => {
        setMockTestData(prev => ({
            ...prev,
            [month]: {
                ...prev[month],
                [field]: value,
            },
        }));
    };

    // 데이터 유효성 검사
    const isDataValid = useCallback(() => {
        const hasRequiredFields = mockTestData.march.korean !== '' && mockTestData.march.math !== '' && mockTestData.march.english !== '' &&
            mockTestData.june.korean !== '' && mockTestData.june.math !== '' && mockTestData.june.english !== '' &&
            mockTestData.march.inquiry1 !== '' && mockTestData.june.inquiry1 !== '' &&
            mockTestData.march.inquiry2 !== '' && mockTestData.june.inquiry2 !== '' &&
            mockTestData.march.koreanHistory !== '' && mockTestData.june.koreanHistory !== '';
        return formData.studentName !== '' && formData.contact !== '' && hasRequiredFields;
    }, [formData.studentName, formData.contact, mockTestData]);

    // 데이터 변경 시 상위 컴포넌트에 알림
    useEffect(() => {
        const data: FormSubmissionData = {
            studentName: formData.studentName,
            contact: formData.contact,
            // 3월 모의고사
            march_korean: mockTestData.march.korean,
            march_math: mockTestData.march.math,
            march_english: mockTestData.march.english,
            march_inquiry1: mockTestData.march.inquiry1,
            march_inquiry2: mockTestData.march.inquiry2,
            march_koreanHistory: mockTestData.march.koreanHistory,
            // 6월 모의고사
            june_korean: mockTestData.june.korean,
            june_math: mockTestData.june.math,
            june_english: mockTestData.june.english,
            june_inquiry1: mockTestData.june.inquiry1,
            june_inquiry2: mockTestData.june.inquiry2,
            june_koreanHistory: mockTestData.june.koreanHistory,
        };
        onDataChange?.(data, isDataValid());
    }, [formData, mockTestData, onDataChange, isDataValid]);

    return (
        <div>

            <StudentInfoForm
                studentName={formData.studentName}
                contact={formData.contact}
                onStudentNameChange={(name) => setFormData(prev => ({ ...prev, studentName: name }))}
                onContactChange={(contact) => setFormData(prev => ({ ...prev, contact }))}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(['march', 'june'] as Month[]).map((month) => (
                    <div key={month} className="space-y-4">
                        <div className={` font-bold text-lg`}>
                            {month === 'march' ? '3월 모의고사' : '6월 모의고사'}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <GradeSelect
                                label="국어"
                                value={mockTestData[month].korean}
                                onChange={(value: string) => updateData(month, 'korean', value)}
                            />
                            <GradeSelect
                                label="수학"
                                value={mockTestData[month].math}
                                onChange={(value: string) => updateData(month, 'math', value)}
                            />
                            <GradeSelect
                                label="영어"
                                value={mockTestData[month].english}
                                onChange={(value: string) => updateData(month, 'english', value)}
                            />
                            <GradeSelect
                                label="탐구1"
                                value={mockTestData[month].inquiry1}
                                onChange={(value: string) => updateData(month, 'inquiry1', value)}
                            />
                            <GradeSelect
                                label="탐구2"
                                value={mockTestData[month].inquiry2}
                                onChange={(value: string) => updateData(month, 'inquiry2', value)}
                            />

                            <GradeSelect
                                label="한국사"
                                value={mockTestData[month].koreanHistory}
                                onChange={(value: string) => updateData(month, 'koreanHistory', value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
