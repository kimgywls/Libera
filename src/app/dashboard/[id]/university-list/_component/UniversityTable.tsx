import React, { useMemo } from 'react';
import { University } from '@/app/types/university';
import UniversityTableRow from './UniversityTableRow';

const regions = ['서울', '경기', '인천', '강원', '충북', '충남', '대전', '세종', '전북', '전남', '광주', '경북', '경남', '대구', '울산', '부산', '제주'];

// University 타입에서 검색 가능한 필드만 추출
const searchableFields = [
    { label: '대학명', value: 'universityName' },
    { label: '전형', value: 'admissionType' },
    { label: '전형 구분', value: 'admissionCategory' },
    { label: '학과명', value: 'departmentName' },
    { label: '평가 비율', value: 'evaluationRatio' },
    { label: '2024 입결', value: 'entryScore2024' },
    { label: '2024 판정', value: 'judgement2024' },
    { label: '2025 입결', value: 'entryScore2025' },
    { label: '2025 판정', value: 'judgement2025' },
] as const;

interface UniversityTableProps {
    universityList: University[];
    selectedUniversities: number[];
    setSelectedUniversities: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function UniversityTable({ universityList, selectedUniversities, setSelectedUniversities }: UniversityTableProps) {
    // 전체 선택/해제
    const toggleSelectAll = () => {
        if (selectedUniversities.length === universityList.length) {
            setSelectedUniversities([]);
        } else {
            setSelectedUniversities(universityList.map((_, idx) => idx));
        }
    };

    // 개별 선택/해제
    const toggleUniversity = (idx: number) => {
        setSelectedUniversities(prev =>
            prev.includes(idx)
                ? prev.filter(i => i !== idx)
                : [...prev, idx]
        );
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-4 py-3 text-center w-12">
                                <input
                                    type="checkbox"
                                    checked={universityList.length > 0 && selectedUniversities.length === universityList.length}
                                    onChange={toggleSelectAll}
                                    className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                            </th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium w-16">번호</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium w-20">지역</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">대학명</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">전형</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">전형 구분</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">학과명</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">평가 비율</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">2024 입결</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">2024 판정</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">2025 입결</th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">2025 판정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {universityList.length === 0 ? (
                            <tr>
                                <td colSpan={12} className="text-center text-gray-500 py-8">
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            universityList.map((university, idx) => (
                                <UniversityTableRow
                                    key={university.universityName + university.departmentName + university.admissionType}
                                    university={university}
                                    idx={idx}
                                    selected={selectedUniversities.includes(idx)}
                                    onSelectChange={() => toggleUniversity(idx)}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}