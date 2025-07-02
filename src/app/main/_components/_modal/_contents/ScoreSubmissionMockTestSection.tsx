import React from "react";
import GradeSelect from "../../form/GradeSelect";
import InquiryBlock from "../../form/InquiryBlock";
import { Month, monthLabelMap } from "@/app/constants";
import { MonthlyMockTestGrade } from "@/app/types/scores";

// 각 월별 섹션 Props 정의
interface SectionProps {
    month: Month; // 예: 'march', 'june' 등
    data: MonthlyMockTestGrade; // 해당 월의 성적 데이터
    update: (field: string, value: string) => void; // 일반 필드 변경 핸들러
    handleInquiryTypeChange: (inquiryNumber: '1' | '2', type: string) => void; // 탐구 유형 변경 핸들러
}

// 월별 모의고사 입력 섹션 (한 달)
export default function MockTestSection({
    month,
    data,
    update,
    handleInquiryTypeChange,
}: SectionProps) {
    return (
        <div className="space-y-2">
            {/* 섹션 제목 (ex. [3월 모의고사]) */}
            <div className="font-bold text-lg text-black ">
                [ {monthLabelMap[month]} ]
            </div>

            {/* 성적 입력 필드들 */}
            <div className="grid grid-cols-6 gap-2 text-black">
                {/* 국어, 수학, 영어 성적 */}
                <GradeSelect
                    label="국어"
                    hasBorder={true}
                    value={data.korean}
                    onChange={(v) => update("korean", v)}
                />
                <GradeSelect
                    label="수학"
                    hasBorder={true}
                    value={data.math}
                    onChange={(v) => update("math", v)}
                />
                <GradeSelect
                    label="영어"
                    hasBorder={true}
                    value={data.english}
                    onChange={(v) => update("english", v)}
                />

                {/* 탐구 과목 1, 2 */}
                <div className="flex flex-col gap-3 col-span-2">
                    {/* 탐구 1 */}
                    <InquiryBlock
                        inquiryNumber="1"
                        type={data.inquiry1Type}
                        subject={data.inquiry1Subject}
                        grade={data.inquiry1Grade}
                        hasBorder={true}
                        onTypeChange={(t) => handleInquiryTypeChange("1", t)} // 타입 변경 시 관련 필드 초기화
                        onSubjectChange={(s) => update("inquiry1Subject", s)}
                        onGradeChange={(g) => update("inquiry1Grade", g)}
                    />

                    {/* 탐구 2 */}
                    <InquiryBlock
                        inquiryNumber="2"
                        type={data.inquiry2Type}
                        subject={data.inquiry2Subject}
                        grade={data.inquiry2Grade}
                        hasBorder={true}
                        onTypeChange={(t) => handleInquiryTypeChange("2", t)}
                        onSubjectChange={(s) => update("inquiry2Subject", s)}
                        onGradeChange={(g) => update("inquiry2Grade", g)}
                    />
                </div>

                {/* 한국사 성적 */}
                <GradeSelect
                    label="한국사"
                    hasBorder={true}
                    value={data.koreanHistory}
                    onChange={(v) => update("koreanHistory", v)}
                />
            </div>
        </div>
    );
}
