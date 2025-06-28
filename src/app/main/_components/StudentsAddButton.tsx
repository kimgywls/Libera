import { useState } from "react";
import StudentAddModal from "./_modal/StudentAddModal";
import { Student } from "@/app/types/students";
import { useStudents } from "../_hooks/useStudents";

export default function StudentsAddButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { createStudent, students } = useStudents();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleStudentAddSubmit = async (studentData: Student) => {
        try {
            // TODO: 실제 API 호출로 학생 추가
            console.log('학생 추가:', studentData);

            // 새로운 학생을 기존 목록에 추가
            const newStudent: Student = {
                ...studentData,
                id: Date.now().toString(), // 임시 ID 생성 (실제로는 API에서 받아야 함)
                birthdate: '', // TODO: StudentAddModal에서 birthdate 입력 받도록 수정 필요
            };

            await createStudent(newStudent);

            // 성공 메시지 (선택사항)
            console.log('학생이 성공적으로 추가되었습니다.');
        } catch (error) {
            console.error('학생 추가 실패:', error);
        }
    };

    return (
        <>
            <div className="px-5">
                <button
                    onClick={handleOpenModal}
                    className="px-3 py-1.5 bg-violet-500 text-white rounded hover:bg-violet-600 transition-colors whitespace-nowrap"
                >
                    학생 추가
                </button>
            </div>

            <StudentAddModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleStudentAddSubmit}
            />
        </>
    );
}
