"use client";

import { MonthlyMockTestGrade } from "@/app/types/scores";

interface MockTestTableProps {
    month: string;
    testData?: MonthlyMockTestGrade;
}

const monthKorMap: Record<string, string> = {
    march: "3월",
    june: "6월",
    september: "9월",
    november: "11월",
};

export default function MockTestTable({ month, testData }: MockTestTableProps) {
    const hasData = !!testData;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">
                    {monthKorMap[month] || month} 모의고사
                </h3>
            </div>

            {hasData ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-black">
                        <thead>
                            <tr className="bg-gray-50">
                                <MockTestScoreHeader score="국어" />
                                <MockTestScoreHeader score="영어" />
                                <MockTestScoreHeader score="수학" />
                                <MockTestScoreHeader score={`${testData.inquiry1Type}(${testData.inquiry1Subject})`} />
                                <MockTestScoreHeader score={`${testData.inquiry2Type}(${testData.inquiry2Subject})`} />
                                <MockTestScoreHeader score="한국사" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white">
                                <MockTestScoreRow score={testData.korean} />
                                <MockTestScoreRow score={testData.english} />
                                <MockTestScoreRow score={testData.math} />
                                <MockTestScoreRow score={testData.inquiry1Grade} />
                                <MockTestScoreRow score={testData.inquiry2Grade} />
                                <MockTestScoreRow score={testData.koreanHistory} />
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm text-gray-500 text-center py-6">입력된 정보가 없습니다.</p>
            )}
        </div>
    );
}

const MockTestScoreHeader = ({ score }: { score: string }) => (
    <th className="border border-gray-200 px-3 py-2 text-center font-medium text-gray-700">{score}</th>
);

const MockTestScoreRow = ({ score }: { score: string }) => (
    <td className="border border-gray-200 px-3 py-2 text-center">{score}</td>
);
