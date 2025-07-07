import React, { useState, useCallback } from "react";
import { StudentScore } from "@/app/types/scores";
import { useCreateStudentScores, useStudentScores, useUpdateStudentScore } from "../_hooks/use-scores";
import { StudentScoreEditFormProps, StudentScoreEditState } from "@/app/types/scores";
import { ScoreRequest } from "@/app/types/scores";

interface StudentScoresTableProps {
    scores: StudentScore[];
}

function displayValue(value: any) {
    return value == null || value === "" ? "-" : value;
}

function StudentScoreEditForm({ initial, onSave, onCancel, loading }: StudentScoreEditFormProps) {
    const [form, setForm] = useState<StudentScoreEditState>(
        initial || {
            grade: 1,
            semester: 1,
            curriculum: "",
            subject: "",
            subject_type: "일반선택",
            raw_score: undefined,
            subject_average: undefined,
            standard_deviation: undefined,
            achievement_level: "",
            student_count: undefined,
            grade_rank: undefined,
            achievement_distribution: {},
            credit_hours: undefined,
            notes: "",
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-lg space-y-3">
                <h3 className="font-bold text-lg mb-2">성적 {initial ? '수정' : '추가'}</h3>
                <div className="grid grid-cols-2 gap-2">
                    <select name="grade" value={form.grade} onChange={handleChange} className="border p-1">
                        <option value="1">1학년</option>
                        <option value="2">2학년</option>
                        <option value="3">3학년</option>
                    </select>
                    <select name="semester" value={form.semester} onChange={handleChange} className="border p-1">
                        <option value="1">1학기</option>
                        <option value="2">2학기</option>
                    </select>
                    <input name="curriculum" value={form.curriculum} onChange={handleChange} placeholder="교과" className="border p-1" />
                    <input name="subject" value={form.subject} onChange={handleChange} placeholder="과목" className="border p-1" />
                    <select name="subject_type" value={form.subject_type} onChange={handleChange} className="border p-1">
                        <option value="일반선택">일반선택</option>
                        <option value="진로선택">진로선택</option>
                        <option value="체육/예술">체육/예술</option>
                    </select>
                    <input name="raw_score" value={form.raw_score ?? ''} onChange={handleChange} placeholder="원점수" className="border p-1" />
                    <input name="subject_average" value={form.subject_average ?? ''} onChange={handleChange} placeholder="과목평균" className="border p-1" />
                    <input name="standard_deviation" value={form.standard_deviation ?? ''} onChange={handleChange} placeholder="표준편차" className="border p-1" />
                    <input name="achievement_level" value={form.achievement_level ?? ''} onChange={handleChange} placeholder="성취도" className="border p-1" />
                    <input name="student_count" value={form.student_count ?? ''} onChange={handleChange} placeholder="수강자 수" className="border p-1" />
                    <input name="grade_rank" value={form.grade_rank ?? ''} onChange={handleChange} placeholder="석차 등급" className="border p-1" />
                    <input name="credit_hours" value={form.credit_hours ?? ''} onChange={handleChange} placeholder="단위수" className="border p-1" />
                    <input name="notes" value={form.notes ?? ''} onChange={handleChange} placeholder="비고" className="border p-1 col-span-2" />
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded" disabled={loading}>저장</button>
                    <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default function StudentScoresTable({ scores }: StudentScoresTableProps) {
    const headersMap: Record<string, string[]> = {
        일반선택: ["교과", "과목", "단위수", "원점수", "과목평균", "표준편차", "성취도", "수강자 수", "석차 등급"],
        진로선택: ["교과", "과목", "단위수", "원점수", "과목평균", "성취도", "수강자 수", "성취도별 분포 비율"],
        "체육/예술": ["교과", "과목", "단위수", "성취도"],
    };

    const [editScore, setEditScore] = useState<StudentScore | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState<'edit' | 'create'>('create');

    const studentId = scores[0]?.student_id?.toString() ?? "";
    const { create, loading: createLoading } = useCreateStudentScores();
    const { refetch } = useStudentScores(studentId);
    const { update, loading: updateLoading } = useUpdateStudentScore(studentId);

    const handleEdit = useCallback((score: StudentScore) => {
        setEditScore(score);
        setFormMode('edit');
        setShowForm(true);
    }, []);

    const handleCreate = useCallback(() => {
        setEditScore(null);
        setFormMode('create');
        setShowForm(true);
    }, []);

    const handleSave = useCallback(async (data: StudentScoreEditState) => {
        if (formMode === 'edit' && editScore) {
            await update(editScore.id.toString(), data);
        } else {
            const semesterKey = `${data.grade}-${data.semester}`;
            const scoreReq: ScoreRequest = {
                student_id: studentId,
                semester_scores: {
                    [semesterKey]: {
                        [data.subject]: data.raw_score ?? 0
                    }
                },
                mock_test_scores: {}
            };
            await create(scoreReq);
        }
        setShowForm(false);
        setEditScore(null);
        refetch();
    }, [formMode, editScore, update, create, studentId, refetch]);

    const handleCancel = useCallback(() => {
        setShowForm(false);
        setEditScore(null);
    }, []);

    const renderRow = (score: StudentScore, type: string) => {
        const cells = [
            <td key="curriculum" className="border px-2 py-1">{displayValue(score.curriculum)}</td>,
            <td key="subject" className="border px-2 py-1">{displayValue(score.subject)}</td>,
        ];

        if (type === "일반선택") {
            cells.push(
                <td key="credit" className="border px-2 py-1">{displayValue(score.credit_hours)}</td>,
                <td key="raw" className="border px-2 py-1">{displayValue(score.raw_score)}</td>,
                <td key="avg" className="border px-2 py-1">{displayValue(score.subject_average)}</td>,
                <td key="stddev" className="border px-2 py-1">{displayValue(score.standard_deviation)}</td>,
                <td key="achieve" className="border px-2 py-1">{displayValue(score.achievement_level)}</td>,
                <td key="count" className="border px-2 py-1">{displayValue(score.student_count)}</td>,
                <td key="rank" className="border px-2 py-1">{displayValue(score.grade_rank)}</td>
            );
        } else if (type === "진로선택") {
            cells.push(
                <td key="credit" className="border px-2 py-1">{displayValue(score.credit_hours)}</td>,
                <td key="raw" className="border px-2 py-1">{displayValue(score.raw_score)}</td>,
                <td key="avg" className="border px-2 py-1">{displayValue(score.subject_average)}</td>,
                <td key="achieve" className="border px-2 py-1">{displayValue(score.achievement_level)}</td>,
                <td key="count" className="border px-2 py-1">{displayValue(score.student_count)}</td>,
                <td key="dist" className="border px-2 py-1">{
                    score.achievement_distribution && Object.keys(score.achievement_distribution).length > 0
                        ? Object.entries(score.achievement_distribution)
                            .map(([k, v]) => `${k}:${displayValue(v)}`)
                            .join(", ")
                        : "-"}
                </td>
            );
        } else {
            cells.push(
                <td key="credit" className="border px-2 py-1">{displayValue(score.credit_hours)}</td>,
                <td key="achieve" className="border px-2 py-1">{displayValue(score.achievement_level)}</td>
            );
        }

        cells.push(
            <td key="edit" className="border px-2 py-1">
                <button className="text-blue-500 underline" onClick={() => handleEdit(score)}>수정</button>
            </td>
        );

        return <tr key={score.id}>{cells}</tr>;
    };

    const renderTable = (title: string, items: StudentScore[], type: string) => (
        <section key={type} className="mb-6">
            <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
                {title}
                <button className="bg-violet-500 text-white px-4 py-2 text-sm rounded ml-2" onClick={handleCreate}>새 성적 추가</button>
            </h3>
            <table className="w-full border text-sm text-gray-900">
                <thead className="bg-gray-100">
                    <tr>
                        {headersMap[type].map((header) => (
                            <th key={header} className="border px-2 py-1">{header}</th>
                        ))}
                        <th className="border px-2 py-1">수정</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((score) => renderRow(score, type))}
                </tbody>
            </table>
        </section>
    );

    const groupByGradeSemester = scores.reduce((acc, score) => {
        const key = `${score.grade}-${score.semester}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(score);
        return acc;
    }, {} as Record<string, StudentScore[]>);

    return (
        <div className="space-y-6">
            {Object.entries(groupByGradeSemester).map(([key, groupedScores]) => {
                const [grade, semester] = key.split("-");
                const title = `[${grade}-${semester}] 학기 성적`;

                const byType = {
                    "일반선택": groupedScores.filter((s) => s.subject_type === "일반선택"),
                    "진로선택": groupedScores.filter((s) => s.subject_type === "진로선택"),
                    "체육/예술": groupedScores.filter((s) => s.subject_type === "체육/예술"),
                };

                return (
                    <div key={key} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">{title}</h2>
                        {renderTable("일반선택 과목", byType["일반선택"], "일반선택")}
                        {renderTable("진로선택 과목", byType["진로선택"], "진로선택")}
                        {renderTable("체육/예술 과목", byType["체육/예술"], "체육/예술")}
                    </div>
                );
            })}
            {showForm && (
                <StudentScoreEditForm
                    initial={editScore as any}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    loading={formMode === 'edit' ? updateLoading : createLoading}
                />
            )}
        </div>
    );
}
