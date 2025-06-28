import { useState } from "react";
import { Student } from "@/app/types/students";

// 학생 체크박스 선택 상태를 관리하는 커스텀 훅
export const useStudentSelection = (students: Student[]) => {
    // 선택된 학생들의 연락처(contact)를 Set으로 저장
    const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());

    // 전체 선택/해제
    function handleSelectAll(checked: boolean) {
        if (checked) {
            const allContacts = new Set(students.map(student => student.contact));
            setSelectedStudents(allContacts);
        } else {
            setSelectedStudents(new Set());
        }
    }

    // 개별 학생 선택/해제
    function handleSelectStudent(contact: string, checked: boolean) {
        setSelectedStudents(prev => {
            const next = new Set(prev);
            checked ? next.add(contact) : next.delete(contact);
            return next;
        });
    }

    // 선택 상태 계산
    const isAllSelected = students.length > 0 && students.every(student => selectedStudents.has(student.contact));
    const isIndeterminate = selectedStudents.size > 0 && selectedStudents.size < students.length;
    const selectedCount = selectedStudents.size;

    return {
        selectedStudents,
        handleSelectAll,
        handleSelectStudent,
        isAllSelected,
        isIndeterminate,
        selectedCount,
    };
};
