"use client";

import { useState } from "react";
import {
    MockTestSubmissionData,
    MonthlyMockTestScore,
    defaultMonthlyScore
} from "@/app/types/scores";
import StudentInfoForm from "../../form/StudentInfoForm";
import MockTestSection from "./ScoreSubmissionMockTestSection";
import { Month, MOCK_TEST_MONTHS } from "@/app/constants";

// 컴포넌트 Props 타입 정의
interface ScoreSubmissionMockTestProps {
    contact: string;             // 학생 연락처 (기본값)
    studentName: string;         // 학생 이름 (기본값)
    onDataChange?: (data: MockTestSubmissionData) => void; // 상위로 제출 데이터 전달 콜백
}

// 모의고사 성적 입력 컴포넌트
export default function ScoreSubmissionMockTest({
    contact,
    studentName,
    onDataChange,
}: ScoreSubmissionMockTestProps) {
    // 학생 기본 정보 상태 (이름, 연락처)
    const [formData, setFormData] = useState({
        studentName: studentName || "",
        contact: contact || "",
    });

    // 월별 모의고사 성적 상태 초기화
    const [mockTestData, setMockTestData] = useState<Record<Month, MonthlyMockTestScore>>(
        () =>
            Object.fromEntries(
                MOCK_TEST_MONTHS.map((month) => [month, { ...defaultMonthlyScore }])
            ) as Record<Month, MonthlyMockTestScore>
    );

    // 상태 변경 시 상위 컴포넌트로 데이터 전달
    const emitData = (newFormData = formData, newScores = mockTestData) => {
        const data: MockTestSubmissionData = {
            studentName: newFormData.studentName,
            contact: newFormData.contact,
            scores: newScores,
        };
        onDataChange?.(data); // 변경 데이터 상위에 전달
    };

    // 학생 기본 정보 변경 처리 함수
    const handleFormChange = (key: keyof typeof formData, value: string) => {
        const newFormData = { ...formData, [key]: value };
        setFormData(newFormData);
        emitData(newFormData, mockTestData); // 변경된 값 즉시 전달
    };

    // 과목 등급 등 일반 필드 업데이트 처리
    const updateData = (month: Month, field: keyof MonthlyMockTestScore, value: string) => {
        const newScores = {
            ...mockTestData,
            [month]: {
                ...mockTestData[month],
                [field]: value,
            },
        };
        setMockTestData(newScores);
        emitData(formData, newScores);
    };

    // 탐구 영역이 바뀌면 과목/등급 초기화
    const handleInquiryTypeChange = (month: Month, inquiryNumber: '1' | '2', type: string) => {
        const typeField = `inquiry${inquiryNumber}Type` as keyof MonthlyMockTestScore;
        const subjectField = `inquiry${inquiryNumber}Subject` as keyof MonthlyMockTestScore;
        const gradeField = `inquiry${inquiryNumber}Grade` as keyof MonthlyMockTestScore;

        const newScores = {
            ...mockTestData,
            [month]: {
                ...mockTestData[month],
                [typeField]: type,
                [subjectField]: "",
                [gradeField]: "",
            },
        };
        setMockTestData(newScores);
        emitData(formData, newScores);
    };

    return (
        <div>
            {/* 학생 기본 정보 입력/표시 영역 */}
            <StudentInfoForm
                studentName={formData.studentName}
                contact={formData.contact}
                onStudentNameChange={(val) => handleFormChange("studentName", val)}
                onContactChange={(val) => handleFormChange("contact", val)}
            />

            {/* 월별 모의고사 성적 입력 섹션 */}
            <div className="max-h-96 overflow-y-auto rounded-lg px-4">
                <div className="grid grid-cols-1 gap-5">
                    {MOCK_TEST_MONTHS.map((month) => (
                        <MockTestSection
                            key={month}
                            month={month}
                            data={mockTestData[month]} // 해당 월 데이터 전달
                            update={(field, value) =>
                                updateData(month, field as keyof MonthlyMockTestScore, value)
                            }
                            handleInquiryTypeChange={(inquiryNum, type) =>
                                handleInquiryTypeChange(month, inquiryNum, type)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
