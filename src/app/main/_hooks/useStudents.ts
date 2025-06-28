import { useState, useEffect, useMemo } from "react";
import { Student } from "@/app/types/students";
import { getStudentsAction, createStudentAction } from "../_actions/fetch_all_student";

// 학생 내역을 가져오는 기본 훅
export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudentsAction();
      setStudents(data);
    } catch (err) {
      setError("학생 목록을 불러오는데 실패했습니다.");
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllStudents();
  }, []);

  async function createStudent(student: Student) {
    setLoading(true);
    try {
      await createStudentAction(student);
      console.log(student);
      setStudents((prevData) => [student, ...prevData]);
    } catch (err) {
      setError("학생 추가에 실패했습니다.");
      console.error("Failed to create student:", err);
    } finally {
      setLoading(false);
    }
  }

  return {
    students,
    createStudent,
    loading,
    error,
    reload: loadAllStudents,
  };
}


