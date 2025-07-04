import React from 'react';
import { University } from '@/app/types/university';
import UniversityTableJudgementText from './UniversityTableJudgementText';

interface UniversityTableRowProps {
    university: University;
    idx: number;
    selected: boolean;
    onSelectChange: () => void;
}

function UniversityTableRow({ university, idx, selected, onSelectChange }: UniversityTableRowProps) {
    return (
        <tr className="hover:bg-gray-50">
            <td className="border border-gray-200 px-4 py-3 text-center">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={onSelectChange}
                    className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
            </td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{idx + 1}</td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{university.region}</td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">{university.universityName}</td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{university.admissionType}</td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{university.admissionCategory}</td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{university.departmentName}</td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{university.evaluationRatio}</td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700">{university.entryScore2024}</td>
            <td className="border border-gray-200 px-4 py-3 text-center">
                <UniversityTableJudgementText judgement={university.judgement2024} />
            </td>
            <td className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">{university.entryScore2025}</td>
            <td className="border border-gray-200 px-2 py-3 text-center">
                <UniversityTableJudgementText judgement={university.judgement2025} />
            </td>
        </tr>
    );
}

export default React.memo(UniversityTableRow); 