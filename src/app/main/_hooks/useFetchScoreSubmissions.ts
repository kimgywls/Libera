import { useEffect, useState } from "react";
import { getStudentsScoreSubmission } from "@/app/main/_actions/fetch-students-score-submission";
import { StudentScoreSubmission, SubmissionStatus, SUBMISSION_STATUS, ScoreSubmissionType, SCORE_SUBMISSION_TYPE } from "@/app/constants";

// 성적 제출 데이터를 가져오는 훅
export function useFetchScoreSubmissions() {
  const [scoreSubmissions, setScoreSubmissions] = useState<StudentScoreSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScoreSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudentsScoreSubmission();
      // 목데이터가 이미 올바른 SubmissionStatus 타입으로 되어 있으므로 그대로 사용
      setScoreSubmissions(data);
    } catch (err) {
      setError("성적 제출 데이터를 불러오는데 실패했습니다.");
      console.error("Failed to fetch grade submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  // 성적 제출 상태 업데이트 함수
  const updateScoreSubmission = (contact: string, type: ScoreSubmissionType, value: SubmissionStatus) => {
    setScoreSubmissions(prev => {
      const existingIndex = prev.findIndex(s => s.contact === contact);
      if (existingIndex >= 0) {
        // 기존 데이터 업데이트
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], [type]: value };
        return updated;
      } else {
        // 새 데이터 추가
        const newSubmission: StudentScoreSubmission = {
          contact,
          scoreSubmission_2: type === SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_2 ? value : SUBMISSION_STATUS.NOT_SUBMITTED,
          scoreSubmission_3: type === SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_3 ? value : SUBMISSION_STATUS.NOT_SUBMITTED,
          scoreSubmission_mockTest: type === SCORE_SUBMISSION_TYPE.SCORE_SUBMISSION_MOCK_TEST ? value : SUBMISSION_STATUS.NOT_SUBMITTED,
        };
        return [...prev, newSubmission];
      }
    });
  };

  useEffect(() => {
    fetchScoreSubmissions();
  }, []);

  return {
    scoreSubmissions,
    loading,
    error,
    reload: fetchScoreSubmissions,
    updateScoreSubmission,
  };
}