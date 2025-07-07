import { useState, useEffect } from "react";
import { getOverallGpa, getSemesterGpa, getCurriculumGpa } from "../_actions/gpa-actions";
import { GpaResult, UseAllSemesterGpasResult, CurriculumGpaResult } from "@/app/types/scores";
import { CURRICULUMS } from "@/app/types/scores";

// 전체 내신평균 커스텀 훅
export function useOverallGpa(studentId: number | undefined) {
    const [overallGpa, setOverallGpa] = useState<GpaResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!studentId) return;
        setLoading(true);
        setError(null);
        getOverallGpa(studentId)
            .then(res => setOverallGpa(res.data as GpaResult))
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false));
    }, [studentId]);

    //console.log("useOverallGpa", overallGpa);

    return { overallGpa, loading, error };
}

// 학기별 내신평균 커스텀 훅
export function useAllSemesterGpas(studentId: number): UseAllSemesterGpasResult {
    const [semesterGpaMap, setSemesterGpaMap] = useState<Record<string, { gpa: number | null } | null>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            setError(null);
            try {
                const requests = [];
                for (let grade = 1; grade <= 3; grade++) {
                    for (let semester = 1; semester <= 2; semester++) {
                        const key = `${grade}-${semester}`;
                        requests.push(
                            getSemesterGpa(studentId, grade, semester)
                                .then((res) => ({ key, gpa: res.data?.gpa ?? null }))
                                .catch(() => ({ key, gpa: null }))
                        );
                    }
                }
                const results = await Promise.all(requests);
                const map: Record<string, { gpa: number | null } | null> = {};
                results.forEach(({ key, gpa }) => {
                    map[key] = { gpa };
                });
                setSemesterGpaMap(map);
                //console.log("useAllSemesterGpas", map);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (studentId) fetchAll();
    }, [studentId]);

    return { semesterGpaMap, loading, error };
}


// 여러 교과별 내신평균을 한 번에 조회하는 커스텀 훅
export function useAllCurriculumGpas(studentId: number) {
    const [curriculumGpaMap, setCurriculumGpaMap] = useState<Record<string, CurriculumGpaResult | null>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!studentId) return;
        setLoading(true);
        setError(null);

        Promise.all(
            CURRICULUMS.map((curriculum) =>
                getCurriculumGpa(studentId, curriculum)
                    .then((res) => ({ curriculum, gpa: res.data as CurriculumGpaResult }))
                    .catch(() => ({ curriculum, gpa: null }))
            )
        )
            .then((results) => {
                const map: Record<string, CurriculumGpaResult | null> = {};
                results.forEach(({ curriculum, gpa }) => {
                    map[curriculum] = gpa;
                });
                setCurriculumGpaMap(map);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [studentId]);

    return { curriculumGpaMap, loading, error };
}