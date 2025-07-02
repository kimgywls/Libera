import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Bar, Tooltip, LabelList, LabelProps } from "recharts";
import { Play } from "lucide-react";
import { Subject } from "@/app/constants";
import { OverallGradeForChart } from "@/app/types/scores";

const SUBJECT_COLORS = {
    "국어": "#F8C471",
    "영어": "#4ECDC4",
    "수학": "#45B7D1",
    "사회(한국사)": "#96CEB4",
    "과학": "#FFEAA7",
    "국+영+사": "#DDA0DD",
    "수+영+과": "#98D8C8",
    "수+과": "#F7DC6F",
    "국+수+영+사(한)": "#BB8FCE",
    "국+수+영+과": "#85C1E9",
    "국+수+영+사(한)+과": "#FFA500",
    "전과목": "#FF7675",
};

export default function SemesterSubjectChart({ subject, chartData }: { subject: Subject; chartData: OverallGradeForChart[] }) {

    // chartData가 비어있거나 undefined인 경우 처리
    if (!chartData || chartData.length === 0) {
        return (
            <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4">
                <h4 className="flex items-center font-semibold text-lg gap-2">
                    <Play className="w-5 h-5 text-violet-500 mr-2" />
                    {subject} 석차 등급 추이
                </h4>
                <div className="flex items-center justify-center h-[300px] text-gray-500">
                    데이터가 없습니다.
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4">
            <h4 className="flex items-center font-semibold text-lg gap-2">
                <Play className="w-5 h-5 text-violet-500 mr-2" />
                {subject} 석차 등급 추이
            </h4>
            <ResponsiveContainer width="100%" height={300} className="py-4">
                <ComposedChart
                    data={chartData}

                >
                    <XAxis
                        dataKey="semester"
                        tickFormatter={(v) => v.split("학기")[0]}
                    />
                    <YAxis
                        domain={[5, 6.5]}
                        ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                        tickFormatter={(v) => (v <= 5 ? "" : `${10 - v}등급`)}
                    />

                    <Tooltip
                        content={({ payload, label }) => {
                            if (!payload || payload.length === 0) return null;

                            const data = payload[0].payload;
                            const original = data.originalGrade ?? "N/A";

                            return (
                                <div className="bg-white text-black border rounded px-3 py-2 shadow gap-2">
                                    <div className="font-semibold">{label}학기</div>
                                    <div>{original}</div>
                                </div>
                            );
                        }}
                    />

                    <Bar
                        dataKey="grade"
                        barSize={40}
                        fill={SUBJECT_COLORS[subject]}
                        isAnimationActive={false}
                    >
                        <LabelList
                            dataKey="originalGrade"
                            content={({ x, y, width, value }) => {
                                if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number') return null;
                                return (
                                    <text
                                        x={x + width / 2}
                                        y={y - 6}
                                        textAnchor="middle"
                                        fill="#444"
                                        fontSize={14}
                                        fontWeight="bold"
                                    >
                                        {value ?? "N/A"}
                                    </text>
                                );
                            }}
                        />
                    </Bar>

                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
