import { UniversityTableRow } from "./UniversityListSection";

interface UniversityTableProps {
    rows: UniversityTableRow[];
    checked: { [admission_id: number]: boolean };
    handleCheck: (admission_id: number) => void;
}

export default function UniversityTable({ rows, checked, handleCheck }: UniversityTableProps) {
    return (
        <div>
            <table className="min-w-full border text-sm text-black">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-1">
                            <input type="checkbox" disabled />
                        </th>
                        <th className="border px-2 py-1">순서</th>
                        <th className="border px-2 py-1">지역</th>
                        <th className="border px-2 py-1">대학명</th>
                        <th className="border px-2 py-1">전형</th>
                        <th className="border px-2 py-1">유형 구분</th>
                        <th className="border px-2 py-1">학과명</th>
                        <th className="border px-2 py-1">평가 비율</th>
                        <th className="border px-2 py-1">24년도 입결</th>
                        <th className="border px-2 py-1">24년도 판정</th>
                        <th className="border px-2 py-1">25년도 입결</th>
                        <th className="border px-2 py-1">25년도 판정</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((u) => (
                        <tr key={u.admission_id + u.judge}>
                            <td className="border px-2 py-1">
                                <input
                                    type="checkbox"
                                    checked={!!checked[u.admission_id]}
                                    onChange={() => handleCheck(u.admission_id)}
                                />
                            </td>
                            <td className="border px-2 py-1">{u.order}</td>
                            <td className="border px-2 py-1">{u.region}</td>
                            <td className="border px-2 py-1">{u.university_name}</td>
                            <td className="border px-2 py-1">{u.admission_type}</td>
                            <td className="border px-2 py-1">{u.admission_category}</td>
                            <td className="border px-2 py-1">{u.major_name}</td>
                            <td className="border px-2 py-1">{u.evaluation_ratio}</td>
                            <td className="border px-2 py-1">{u.entry_score_2024}</td>
                            <td className="border px-2 py-1">{u.judge}</td>
                            <td className="border px-2 py-1">{u.entry_score_2025}</td>
                            <td className="border px-2 py-1">{u.judge}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}