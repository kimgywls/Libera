import { useEffect, useState } from "react";
import { getStudentsGradeSubmission } from "../_actions/fetch-students-grade-submission";
import { StudentGrade } from "@/app/types/students";

// 성적 제출 데이터를 가져오는 훅
export function useStudentsGradeSubmission() {
    const [gradeSubmissions, setGradeSubmissions] = useState<StudentGrade[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchGradeSubmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStudentsGradeSubmission();
        setGradeSubmissions(data);
      } catch (err) {
        setError("성적 제출 데이터를 불러오는데 실패했습니다.");
        console.error("Failed to fetch grade submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    // 성적 제출 상태 업데이트 함수
    const updateGradeSubmission = (contact: string, type: 'gradeSubmission_2' | 'gradeSubmission_3' | 'gradeSubmission_mockTest', value: boolean) => {
      setGradeSubmissions(prev => {
        const existingIndex = prev.findIndex(s => s.contact === contact);
        if (existingIndex >= 0) {
          // 기존 데이터 업데이트
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], [type]: value };
          return updated;
        } else {
          // 새 데이터 추가
          const newSubmission: StudentGrade = {
            contact,
            gradeSubmission_2: type === 'gradeSubmission_2' ? value : false,
            gradeSubmission_3: type === 'gradeSubmission_3' ? value : false,
            gradeSubmission_mockTest: type === 'gradeSubmission_mockTest' ? value : false,
          };
          return [...prev, newSubmission];
        }
      });
    };
  
    useEffect(() => {
      fetchGradeSubmissions();
    }, []);
  
    return {
      gradeSubmissions,
      loading,
      error,
      reload: fetchGradeSubmissions,
      updateGradeSubmission,
    };
  }