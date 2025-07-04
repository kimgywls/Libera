"use client";

import { useState } from "react";
import {
    StudentMockTestData,
    MonthlyMockTestGrade,
    defaultMonthlyMockTestGrade
} from "@/app/types/scores";
import StudentInfoForm from "../../form/StudentInfoForm";
import MockTestSection from "./ScoreSubmissionMockTestSection";
import { Month, MOCK_TEST_MONTHS } from "@/app/constants";

// 컴포넌트 Props 타입 정의
interface ScoreSubmissionMockTestProps {
    contact: string;             // 학생 연락처 (기본값)
    studentName: string;         // 학생 이름 (기본값)
    onDataChange?: (data: StudentMockTestData) => void; // 상위로 제출 데이터 전달 콜백
    initialScores?: Partial<Record<Month, MonthlyMockTestGrade>>; // 초기 모의고사 데이터 (수정 시 사용)
}

// 모의고사 성적 입력 컴포넌트
export default function ScoreSubmissionMockTest({
    contact,
    studentName,
    onDataChange,
    initialScores,
}: ScoreSubmissionMockTestProps) {
    // 학생 기본 정보 상태 (이름, 연락처)
    const [formData, setFormData] = useState({
        studentName: studentName || "",
        contact: contact || "",
    });

    // 월별 모의고사 성적 상태 초기화
    const [mockTestData, setMockTestData] = useState<Record<Month, MonthlyMockTestGrade>>(
        () => {
            if (initialScores) {
                // 초기 데이터가 있으면 사용, 없으면 기본값
                const result = Object.fromEntries(
                    MOCK_TEST_MONTHS.map((month) => [
                        month,
                        initialScores[month] || { ...defaultMonthlyMockTestGrade }
                    ])
                ) as Record<Month, MonthlyMockTestGrade>;
                return result;
            }
            // 초기 데이터가 없으면 기본값으로 초기화
            return Object.fromEntries(
                MOCK_TEST_MONTHS.map((month) => [month, { ...defaultMonthlyMockTestGrade }])
            ) as Record<Month, MonthlyMockTestGrade>;
        }
    );

    // 상태 변경 시 상위 컴포넌트로 데이터 전달
    const emitData = (newScores = mockTestData) => {
        const data: StudentMockTestData = {
            studentId: "", // studentId는 상위에서 전달받아야 함
            scores: newScores,
        };
        onDataChange?.(data); // 변경 데이터 상위에 전달
    };

    // 학생 기본 정보 변경 처리 함수
    const handleFormChange = (key: keyof typeof formData, value: string) => {
        const newFormData = { ...formData, [key]: value };
        setFormData(newFormData);
        emitData(); // 변경된 값 즉시 전달
    };

    // 과목 등급 등 일반 필드 업데이트 처리
    const updateData = (month: Month, field: keyof MonthlyMockTestGrade, value: string) => {
        const newScores = {
            ...mockTestData,
            [month]: {
                ...mockTestData[month],
                [field]: value,
            },
        };
        setMockTestData(newScores);
        emitData(newScores);
    };

    // 탐구 영역이 바뀌면 과목/등급 초기화
    const handleInquiryTypeChange = (month: Month, inquiryNumber: '1' | '2', type: string) => {
        const typeField = `inquiry${inquiryNumber}Type` as keyof MonthlyMockTestGrade;
        const subjectField = `inquiry${inquiryNumber}Subject` as keyof MonthlyMockTestGrade;
        const gradeField = `inquiry${inquiryNumber}Grade` as keyof MonthlyMockTestGrade;

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
        emitData(newScores);
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
                                updateData(month, field as keyof MonthlyMockTestGrade, value)
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
