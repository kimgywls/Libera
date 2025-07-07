import UniversityTable from "./UniversityTable";
import UniversityTableSearchBar from "./UniversityTableSearchBar";
import UniversityTableRegionFilter from "./UniversityTableRegionFilter";
import { DepartmentRecommendation } from "@/app/types/university";
import { useState, useMemo } from "react";

interface UniversityListSectionProps {
    department: DepartmentRecommendation;
}

export interface UniversityTableRow {
    order: number;
    admission_id: number;
    university_name: string;
    region: string;
    admission_category: string;
    admission_type: string;
    major_name: string;
    evaluation_ratio: string;
    entry_score_2024: string;
    entry_score_2025: string;
    judge: "도전" | "적정" | "안정";
}

function flattenUniversities(dept: DepartmentRecommendation): UniversityTableRow[] {
    let idx = 1;
    const mapFn = (u: any, judge: "도전" | "적정" | "안정") => ({
        order: idx++,
        admission_id: u.admission_id,
        university_name: u.university_name ?? "",
        region: u.region ?? "",
        admission_category: u.admission_category ?? "",
        admission_type: u.admission_type ?? "",
        major_name: u.major_name ?? "",
        evaluation_ratio: u.competition_ratio ?? "",
        entry_score_2024: u.grade_cutoff_prev1 ?? "",
        entry_score_2025: u.grade_cutoff_current ?? "",
        judge,
    });
    return [
        ...(dept.challenge ?? []).map(u => mapFn(u, "도전")),
        ...(dept.suitable ?? []).map(u => mapFn(u, "적정")),
        ...(dept.safe ?? []).map(u => mapFn(u, "안정")),
    ];
}

const SEARCH_FIELDS = [
    { label: "대학명", value: "university_name" },
    { label: "학과명", value: "major_name" },
    { label: "전형", value: "admission_type" },
    { label: "유형 구분", value: "admission_category" },
];

export default function UniversityListSection({ department }: UniversityListSectionProps) {
    const [checked, setChecked] = useState<{ [admission_id: number]: boolean }>({});
    const [searchInput, setSearchInput] = useState("");
    const [searchField, setSearchField] = useState(SEARCH_FIELDS[0].value);
    const [showRegionFilter, setShowRegionFilter] = useState(false);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

    const rows = flattenUniversities(department);

    // 지역 목록 추출
    const regions = useMemo(
        () => Array.from(new Set(rows.map(r => r.region).filter(Boolean))),
        [rows]
    );

    // 지역 필터 toggle
    const toggleRegion = (region: string) => {
        setSelectedRegions(prev =>
            prev.includes(region)
                ? prev.filter(r => r !== region)
                : [...prev, region]
        );
    };
    const clearRegionFilter = () => setSelectedRegions([]);

    // 검색/필터 적용
    const filteredRows = useMemo(() => {
        let filtered = rows;
        if (selectedRegions.length > 0) {
            filtered = filtered.filter(r => selectedRegions.includes(r.region));
        }
        if (searchInput.trim()) {
            filtered = filtered.filter(r => {
                const key = searchField as keyof UniversityTableRow;
                const value = r[key];
                return (
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchInput.trim().toLowerCase())
                );
            });
        }
        return filtered;
    }, [rows, selectedRegions, searchInput, searchField]);

    const handleCheck = (admission_id: number) => {
        setChecked(prev => ({ ...prev, [admission_id]: !prev[admission_id] }));
    };

    // 검색 엔터키
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // 필요시 검색 트리거
        }
    };

    const handleSearch = () => {
        // 필요시 검색 트리거
    };

    return (
        <div className="overflow-x-auto w-full bg-white rounded-lg p-4 shadow-md space-y-4 min-h-[500px]">
            <div className="flex flex-row items-center justify-between mb-2">
                <UniversityTableSearchBar
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    handleInputKeyDown={handleInputKeyDown}
                    searchField={searchField}
                    setSearchField={setSearchField}
                    handleSearch={handleSearch}
                    searchFields={SEARCH_FIELDS}
                />
                <UniversityTableRegionFilter
                    selectedRegions={selectedRegions}
                    setShowRegionFilter={setShowRegionFilter}
                    showRegionFilter={showRegionFilter}
                    regions={regions}
                    toggleRegion={toggleRegion}
                    clearRegionFilter={clearRegionFilter}
                />
            </div>
            <UniversityTable rows={filteredRows} checked={checked} handleCheck={handleCheck} />
        </div>
    );
}
