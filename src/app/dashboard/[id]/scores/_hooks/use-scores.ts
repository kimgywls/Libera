import { useState, useCallback, useEffect } from "react";
import {
    fetchStudentScores,
    createStudentScores,
    updateStudentScore,
    updateBulkStudentScores,
    deleteStudentScores,
} from "../_actions/scores-actions";
import { StudentScore, ScoreRequest, ScoreResponseData, StudentScoreEditState } from "@/app/types/scores";

// 학생 성적 조회 훅
export function useStudentScores(student_id: string) {
    const [scores, setScores] = useState<StudentScore[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data: ScoreResponseData = await fetchStudentScores(student_id);
            //console.log("useStudentScores", data.scores);
            setScores(data.scores);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [student_id]);

    // student_id가 바뀔 때마다 자동 fetch
    useEffect(() => {
        if (student_id) fetch();
    }, [student_id, fetch]);

    return { scores, loading, error, refetch: fetch };
}

// 학생 성적 등록 훅
export function useCreateStudentScores() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [result, setResult] = useState<ScoreResponseData | null>(null);

    const create = useCallback(async (data: ScoreRequest) => {
        setLoading(true);
        setError(null);
        try {
            const res = await createStudentScores(data);
            setResult(res);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { create, loading, error, result };
}

// 학생 성적 개별 수정 훅
export function useUpdateStudentScore(student_id: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [result, setResult] = useState<ScoreResponseData | null>(null);

    // score_id, data 인자로 받음
    const update = useCallback(async (score_id: string, data: Partial<StudentScoreEditState>) => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateStudentScore(student_id, score_id, data);
            setResult(res);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [student_id]);

    return { update, loading, error, result };
}

// 학생 성적 일괄 수정 훅
export function useUpdateBulkStudentScores(student_id: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [result, setResult] = useState<ScoreResponseData | null>(null);

    // 인자 없이 호출
    const update = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await updateBulkStudentScores(student_id);
            setResult(res);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [student_id]);

    return { update, loading, error, result };
}

// 학생 성적 삭제 훅
export function useDeleteStudentScores(student_id: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const remove = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await deleteStudentScores(student_id);
            setResult(res.message);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [student_id]);

    return { remove, loading, error, result };
} 