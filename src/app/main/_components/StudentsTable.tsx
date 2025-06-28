import StudentsRow, { EmptyStudentsRow } from "./StudentsRow";
import { useStudentsGradeSubmission } from "../_hooks/useStudentsGradeSubmission";
import { Student } from "@/app/types/students";
import { useState, useCallback } from "react";

interface StudentsTableProps {
  students: Student[];
  loading?: boolean;
  error?: string | null;
  reload?: () => Promise<void>;
}

const tableHeaders = [
  { label: "번호", width: "w-[100px]" },
  { label: "이름" },
  { label: "연락처(부모님)" },
  { label: "현재 학교" },
  { label: "희망 학교" },
  { label: "희망 학과" },
  { label: "학생부 및 성적 입력 완료 상태" },
  { label: " 결과물" },
];

export default function StudentsTable({ students, loading, error, reload }: StudentsTableProps) {
  const { gradeSubmissions, updateGradeSubmission } = useStudentsGradeSubmission();
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());

  const getScoreSubmissionStatus = (contact: string) => {
    const submission = gradeSubmissions.find(s => s.contact === contact);
    return {
      scoreSubmitted_2: submission?.gradeSubmission_2 || false,
      scoreSubmitted_3: submission?.gradeSubmission_3 || false,
      scoreSubmitted_mockTest: submission?.gradeSubmission_mockTest || false,
    };
  };

  // 필터링된 학생 목록 (2-2 성적이 완료된 학생만)
  const filteredStudents = students
    .map((student, index) => {
      const scoreStatus = getScoreSubmissionStatus(student.contact);
      return {
        student,
        index,
        scoreStatus,
        originalIndex: index
      };
    })
    .filter(({ scoreStatus }) => scoreStatus.scoreSubmitted_2);

  // 전체 선택/해제
  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      const allStudentContacts = new Set(filteredStudents.map(({ student }) => student.contact));
      setSelectedStudents(allStudentContacts);
    } else {
      setSelectedStudents(new Set());
    }
  }, [filteredStudents]);

  // 개별 학생 선택/해제
  const handleSelectStudent = useCallback((studentContact: string, checked: boolean) => {
    setSelectedStudents(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(studentContact);
      } else {
        newSet.delete(studentContact);
      }
      return newSet;
    });
  }, []);

  // 성적 제출 상태 업데이트 핸들러
  const handleUpdateGradeSubmission = useCallback((contact: string, type: 'gradeSubmission_2' | 'gradeSubmission_3' | 'gradeSubmission_mockTest', value: boolean) => {
    updateGradeSubmission(contact, type, value);
  }, [updateGradeSubmission]);

  // 전체 선택 여부 확인
  const isAllSelected = filteredStudents.length > 0 &&
    filteredStudents.every(({ student }) => selectedStudents.has(student.contact));

  // 일부 선택 여부 확인
  const isIndeterminate = selectedStudents.size > 0 && selectedStudents.size < filteredStudents.length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32 text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center h-32 space-y-2">
          <div className="text-red-500">오류: {error}</div>
          {reload && (
            <button
              onClick={reload}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              다시 시도
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-800 w-full px-5">
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map(({ student, scoreStatus }, filteredIndex) => (
                <StudentsRow
                  key={student.contact}
                  index={filteredIndex}
                  student={student}
                  scoreSubmitted_2={scoreStatus.scoreSubmitted_2}
                  scoreSubmitted_3={scoreStatus.scoreSubmitted_3}
                  scoreSubmitted_mockTest={scoreStatus.scoreSubmitted_mockTest}
                  isSelected={selectedStudents.has(student.contact)}
                  onSelect={(checked) => handleSelectStudent(student.contact, checked)}
                  onUpdateGradeSubmission={(type, value) => handleUpdateGradeSubmission(student.contact, type, value)}
                />
              ))
            ) : (
              <EmptyStudentsRow columnCount={tableHeaders.length + 1} />
            )}
          </tbody>
        </table>
      </div>

      {/* 선택된 학생 수 표시 */}
      {selectedStudents.size > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 text-sm">
            {selectedStudents.size}명의 학생이 선택되었습니다.
          </p>
        </div>
      )}
    </div>
  );
}
