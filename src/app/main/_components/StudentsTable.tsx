// 필수 import
import StudentsRow, { EmptyStudentsRow } from "./StudentsRow";
import { useFetchScoreSubmissions } from "../_hooks/useFetchScoreSubmissions";
import { Student } from "@/app/types/students";
import { SUBMISSION_STATUS, SubmissionStatus, ScoreSubmissionType, SCORE_SUBMISSION_TYPE } from "@/app/constants";
import { getModalConfig } from "../_utils/submitModalConfig";
import ScoreSubmissionModals from "./_modal/ScoreSubmissionModals";
import { useModal } from "../../hook/useModal";
import { useStudentSelection } from "../_hooks/useStudentSelection";
import { useStudentsWithStatus } from "../_hooks/useStudentsWithStatus";
import { useState } from "react";

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

interface StudentsTableProps {
  students: Student[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

// 메인 StudentsTable 컴포넌트
export default function StudentsTable({ students, loading, error, reload }: StudentsTableProps) {
  const { scoreSubmissions, updateScoreSubmission } = useFetchScoreSubmissions();
  const { studentsWithStatus } = useStudentsWithStatus(students, scoreSubmissions);

  const {
    selectedStudents,
    handleSelectAll,
    handleSelectStudent,
    isAllSelected,
    isIndeterminate,
  } = useStudentSelection(studentsWithStatus.map(({ student }) => student));

  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [currentType, setCurrentType] = useState<ScoreSubmissionType>(SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_2);

  // 모달 상태만 훅에서 관리
  const modal = useModal();

  // 모달 열기
  const handleOpenModal = (student: Student, type: ScoreSubmissionType) => {
    setCurrentStudent(student);
    setCurrentType(type);
    modal.open();
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setCurrentStudent(null);
    modal.close();
  };

  // 모달 설정
  const modalConfig = currentStudent ? getModalConfig(currentStudent, currentType) : null;

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
    <>
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
              {studentsWithStatus.length > 0 ? (
                studentsWithStatus.map(({ student, scoreStatus }, idx) => (
                  <StudentsRow
                    key={student.contact}
                    index={idx}
                    student={student}
                    scoreSubmitted_2={scoreStatus.scoreSubmitted_2 as SubmissionStatus}
                    scoreSubmitted_3={scoreStatus.scoreSubmitted_3 as SubmissionStatus}
                    scoreSubmitted_mockTest={scoreStatus.scoreSubmitted_mockTest as SubmissionStatus}
                    isSelected={selectedStudents.has(student.contact)}
                    onSelect={(checked) => handleSelectStudent(student.contact, checked)}
                    onUpdateScoreSubmission={(type, value) =>
                      updateScoreSubmission(student.contact, type, value as SubmissionStatus)
                    }
                    onOpenModal={handleOpenModal}
                  />
                ))
              ) : (
                <EmptyStudentsRow columnCount={tableHeaders.length + 1} />
              )}
            </tbody>
          </table>
        </div>

        {selectedStudents.size > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 text-sm">
              {selectedStudents.size}명의 학생이 선택되었습니다.
            </p>
          </div>
        )}
      </div>

      {/* 모달 */}
      {modalConfig && currentStudent && (
        <ScoreSubmissionModals
          isOpen={modal.isOpen}
          submissionType={currentType}
          student={currentStudent}
          onClose={handleCloseModal}
          onSubmit={() => {
            updateScoreSubmission(currentStudent.contact, currentType, SUBMISSION_STATUS.DONE);
            handleCloseModal();
          }}
          onSave={() => {
            updateScoreSubmission(currentStudent.contact, currentType, SUBMISSION_STATUS.IN_PROGRESS);
            handleCloseModal();
          }}
        />
      )}
    </>
  );
}