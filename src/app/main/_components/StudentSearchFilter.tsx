"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Student } from "@/app/types/students";
import { filterStudents } from "@/app/main/_utils/studentFilter";

interface StudentSearchFilterProps {
  allStudents: Student[]; // 전체 학생 목록
  onFiltered: (filtered: Student[]) => void; // 필터링된 결과 전달 콜백
}

// 학생 검색 필터 컴포넌트
export default function StudentSearchFilter({
  allStudents,
  onFiltered,
}: StudentSearchFilterProps) {
  // 검색 기준: 이름, 연락처, 고등학교 중 선택
  const [searchType, setSearchType] = useState<"name" | "phone" | "school">("name");

  // 입력한 검색어
  const [searchValue, setSearchValue] = useState("");

  // 검색 실행 함수
  const handleSearch = () => {
    const filtered = filterStudents(allStudents, searchType, searchValue); // 유틸 함수로 필터링
    onFiltered(filtered); // 결과 전달
  };

  return (
    <div className="w-full text-gray-800">
      <div className="px-2">
        <div className="flex space-x-4 items-end">

          {/* 검색 기준 선택 드롭다운 */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as "name" | "phone" | "school")}
            className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
          >
            <option value="name">이름</option>
            <option value="phone">연락처</option>
            <option value="school">고등학교</option>
          </select>

          {/* 검색 입력 필드 */}
          <input
            type="text"
            placeholder={
              searchType === "name"
                ? "학생 이름 입력"
                : searchType === "phone"
                  ? "연락처 입력"
                  : "고등학교명 입력"
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(); // 엔터 키로도 검색 가능
            }}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
          />

          {/* 검색 버튼 (아이콘) */}
          <button
            onClick={handleSearch}
            className="py-2 flex items-center justify-center"
          >
            <Search className="h-6 w-6 text-violet-500" />
          </button>

        </div>
      </div>
    </div>
  );
}
