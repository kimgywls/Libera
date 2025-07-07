import { StudentTrendResponse } from "@/app/types/scores";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Play } from "lucide-react";

interface Props {
    trend: StudentTrendResponse | null;
    loading: boolean;
    error: string | null;
}

const CATEGORY_KEYS = [
    "전과목_성적_등급_추이",
    "국수영+사(한)과_성적_등급_추이",
    "국수영과_성적_등급_추이",
    "국수영+사(한)_성적_등급_추이",
    "수학_성적_등급_추이",
    "영어_성적_등급_추이",
    "국어_성적_등급_추이",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
    "전과목_성적_등급_추이": "전과목",
    "국수영+사(한)과_성적_등급_추이": "국수영+사(한)과",
    "국수영과_성적_등급_추이": "국수영과",
    "국수영+사(한)_성적_등급_추이": "국수영+사(한)",
    "수학_성적_등급_추이": "수학",
    "영어_성적_등급_추이": "영어",
    "국어_성적_등급_추이": "국어",
};

const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57"
];

export default function SemesterTrendChart({ trend, loading, error }: Props) {
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!trend) return <div>데이터가 없습니다.</div>;

    return (
        <div className="flex flex-col gap-2 border border-gray-300 bg-white rounded-lg p-4 mt-6">
            <h4 className="flex items-center font-bold text-lg gap-2">
                학기별 석차 등급 추이
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
                {CATEGORY_KEYS.map((key, idx) => {
                    const categoryData = trend[key];
                    const data = Object.entries(categoryData)
                        .sort(([a], [b]) => a.localeCompare(b, "ko"))
                        .map(([semester, value]) => ({
                            ...value,
                            semesterLabel: semester,
                            barValue: value.gpa != null ? 9 - value.gpa + 1 : null,
                            originalValue: value.gpa,
                        }));

                    // barValue의 유효값만 추출하여 더 정교한 범위 계산
                    const barValues = data.map(d => d.barValue).filter(v => typeof v === 'number') as number[];
                    if (barValues.length === 0) {
                        // 데이터가 없으면 기본 범위 사용
                        var yAxisMin = 1;
                        var yAxisMax = 9;
                    } else {
                        const minGrade = Math.min(...barValues);
                        const maxGrade = Math.max(...barValues);
                        const range = maxGrade - minGrade;

                        // 범위가 매우 작을 때 (모든 값이 비슷할 때) 더 세밀한 범위 설정
                        if (range <= 0.5) {
                            const padding = 0.8; // 더 큰 여백으로 차이를 명확하게
                            var yAxisMin = Math.max(1, minGrade - padding);
                            var yAxisMax = Math.min(9, maxGrade + padding);
                        } else if (range <= 1.5) {
                            const padding = 0.5;
                            var yAxisMin = Math.max(1, minGrade - padding);
                            var yAxisMax = Math.min(9, maxGrade + padding);
                        } else {
                            // 범위가 클 때는 기존 로직 사용
                            const padding = Math.max(0.3, range * 0.1);
                            var yAxisMin = Math.max(1, minGrade - padding);
                            var yAxisMax = Math.min(9, maxGrade + padding);
                        }

                        // 최소 1.5등급 범위는 보장하되, 너무 넓지 않게
                        const finalRange = yAxisMax - yAxisMin;
                        if (finalRange < 1.5) {
                            const center = (yAxisMin + yAxisMax) / 2;
                            var yAxisMin = Math.max(1, center - 0.75);
                            var yAxisMax = Math.min(9, center + 0.75);
                        }
                    }

                    return (
                        <div
                            key={key}
                            className="flex flex-col gap-2 bg-white border border-gray-300 rounded-lg p-4"
                            style={{ height: 400 }}
                        >
                            <h4 className="flex items-center font-semibold text-lg gap-2">
                                <Play className="w-5 h-5 text-violet-500 mr-2" />
                                {CATEGORY_LABELS[key]} 석차 등급 추이
                            </h4>
                            {data.length === 0 ? (
                                <div className="flex items-center justify-center h-[300px] text-gray-500">
                                    데이터가 없습니다.
                                </div>
                            ) : (
                                <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                    className="py-4"
                                >
                                    <BarChart
                                        data={data}
                                        margin={{ top: 30, right: 20, left: 20, bottom: 5 }}
                                    >
                                        <XAxis dataKey="semesterLabel" tickFormatter={(v) => {
                                            const match = v.match(/^([0-9])학년([0-9])학기$/);
                                            return match ? `${match[1]}-${match[2]}` : v;
                                        }} />
                                        <YAxis
                                            domain={[yAxisMin, yAxisMax]}
                                            tickFormatter={(v) => {
                                                if (v === 0) return '';
                                                return `${6 - Math.round(v)}등급`;
                                            }}
                                            ticks={[1, 2, 3, 4, 5]}
                                        />
                                        <Bar dataKey="barValue" fill={COLORS[idx % COLORS.length]} barSize={24}>
                                            <LabelList
                                                dataKey="barValue"
                                                content={({ x, y, width, index, value }) => {
                                                    if (typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number') return null;
                                                    if (typeof index !== 'number') return null;
                                                    const originalValue = data[index]?.originalValue;

                                                    if (originalValue === undefined || originalValue === null) return null;

                                                    // 1등급(높은 barValue)일 때는 바 안쪽에 라벨 표시

                                                    const labelY = y - 6;
                                                    const labelColor = "#444";

                                                    return (
                                                        <text
                                                            x={x + width / 2}
                                                            y={labelY}
                                                            textAnchor="middle"
                                                            fill={labelColor}
                                                            fontSize={14}
                                                            fontWeight="bold"
                                                        >
                                                            {originalValue}등급
                                                        </text>
                                                    );
                                                }}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}