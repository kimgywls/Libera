"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Student } from "@/app/types/students";
import { useSearchStudents } from "../_hooks/use-search-students";

interface StudentSearchFilterProps {
  allStudents: Student[]; // 전체 학생 목록 (사용하지 않음)
  onFiltered: (filtered: Student[]) => void; // 필터링된 결과 전달 콜백
}

// 학생 검색 필터 컴포넌트
export default function StudentSearchFilter({ onFiltered }: StudentSearchFilterProps) {
  // 검색 기준: 이름, 연락처, 고등학교 중 선택
  const [searchType, setSearchType] = useState<"name" | "phone_number" | "current_school_name">("name");
  const [searchValue, setSearchValue] = useState("");
  const { students, error, setParams } = useSearchStudents();

  const paramKeyMap: Record<string, string> = {
    name: "name",
    phone_number: "phone_number",
    current_school_name: "school",
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      onFiltered([]);
      return;
    }
    const paramKey = paramKeyMap[searchType];
    setParams({ [paramKey]: searchValue.trim() });
  };

  const handleClear = () => {
    setSearchValue("");
    setParams({});
    onFiltered([]);
  };

  // 검색 결과가 바뀔 때마다 상위에 전달
  useEffect(() => {
    onFiltered(students);
  }, [students, onFiltered]);

  return (
    <div className="w-full text-gray-800">
      <div className="px-2">
        <div className="flex space-x-4 items-end">
          {/* 검색 기준 선택 드롭다운 */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as "name" | "phone_number" | "current_school_name")}
            className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
          >
            <option value="name">이름</option>
            <option value="phone_number">연락처</option>
            <option value="current_school_name">고등학교</option>
          </select>

          {/* 검색 입력 필드 + X 버튼 */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={
                searchType === "name"
                  ? "학생 이름 입력"
                  : searchType === "phone_number"
                    ? "연락처 입력"
                    : "고등학교명 입력"
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 pr-8"
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="검색어 지우기"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 검색 버튼 (아이콘) */}
          <button
            onClick={handleSearch}
            className="py-2 flex items-center justify-center"
          >
            <Search className="h-6 w-6 text-violet-500" />
          </button>
        </div>
        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      </div>
    </div>
  );
}
