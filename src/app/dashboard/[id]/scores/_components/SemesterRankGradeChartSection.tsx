"use client";

import { OverallGradeForChart, TotalScores } from "@/app/types/scores";
import { getChartDataBySubject } from "../_utils/getChartDataBySubject";
import SemesterSubjectChart from "./SemesterRankGradeChart";
import { DISPLAY_SUBJECTS, DisplayChartSubject } from "@/app/constants";

interface SemesterGradeChartSectionProps {
    totalGrade: TotalScores;
}

export default function SemesterGradeChartSection({
    totalGrade,
}: SemesterGradeChartSectionProps) {
    return (
        <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">학기별 석차 등급 추이 분석</h2>
            <div className="bg-white rounded-lg p-4">
                <div className="grid grid-cols-3 gap-2">
                    {DISPLAY_SUBJECTS.map((subject: DisplayChartSubject) => {
                        const chartData = getChartDataBySubject(totalGrade, subject);
                        return (
                            <SemesterSubjectChart key={subject} subject={subject} chartData={chartData as OverallGradeForChart[]} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
