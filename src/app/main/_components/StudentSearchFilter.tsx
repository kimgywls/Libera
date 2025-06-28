"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Student } from "@/app/types/students";
import { filterStudents } from "../_utils/studentFilter";

interface StudentSearchFilterProps {
  allStudents: Student[];
  onFiltered: (filtered: Student[]) => void;
}

export default function StudentSearchFilter({
  allStudents,
  onFiltered,
}: StudentSearchFilterProps) {
  const [searchType, setSearchType] = useState<"name" | "phone" | "school">("name");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    const filtered = filterStudents(allStudents, searchType, searchValue);
    onFiltered(filtered);
  };

  return (
    <div className="w-full text-gray-800">
      <div className="px-2">
        <div className="flex space-x-4 items-end">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as "name" | "phone" | "school")}
            className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
          >
            <option value="name">이름</option>
            <option value="phone">연락처</option>
            <option value="school">고등학교</option>
          </select>

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
              if (e.key === "Enter") handleSearch();
            }}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
          />

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
