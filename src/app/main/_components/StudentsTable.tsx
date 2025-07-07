import React, { useState, useMemo } from "react";
import { Student } from "@/app/types/students";
import StudentsRow from "./StudentsRow";
import { useRouter } from "next/navigation";

interface StudentsTableProps {
  students: Student[];
}

// 테이블 헤더 정의
const tableHeaders = [
  { label: "번호", width: "w-[100px]" },
  { label: "이름" },
  { label: "연락처(부모님)" },
  { label: "현재 학교" },
  { label: "희망 학교" },
  { label: "희망 학과" },
  { label: "학생부 및 성적 입력 완료 상태" },
  { label: "결과물" },
];


export default function StudentsTable({ students }: StudentsTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const router = useRouter();

  // pdfRef 배열을 students 길이만큼 미리 생성
  const pdfRefs = useMemo(
    () => students.map(() => React.createRef<HTMLDivElement>() as React.RefObject<HTMLDivElement>),
    [students.length]
  );

  // 전체 선택 체크박스 상태 계산
  const isAllSelected = students.length > 0 && selectedIds.length === students.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < students.length;

  // 전체 선택/해제 핸들러
  const handleSelectStudent = (checked: boolean) => {
    if (checked) {
      setSelectedIds(students.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  // 개별 학생 선택 핸들러
  const handleSelectRow = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  if (!students || students.length === 0) {
    return <div className="text-center py-4">데이터 없음</div>;
  }

  return (
    <div className="text-black">
      <table className="min-w-full border text-sm text-black">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-center w-12">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={(e) => handleSelectStudent(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </th>
            {tableHeaders.map((header, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-center font-medium text-black ${header.width || ""}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            const isSelected = selectedIds.includes(student.id);
            return (
              <StudentsRow
                key={student.id}
                student={student}
                index={index}
                pdfRef={pdfRefs[index]}
                isSelected={isSelected}
                onSelect={(checked) => handleSelectRow(student.id, checked)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
