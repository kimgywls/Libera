"use server";

import { NonScoreSummary } from "@/app/types/scores";

// 목데이터: 비교과 (NonScoreRowData[])
const mockNonScoreRows: NonScoreSummary[] = [
    {
        studentId: "1",
        bySemester: {
            "1-1": {
                creativeActive: "봉사활동에 꾸준히 참여함",
                detailedAndSpecial: "수학 개념 이해도가 뛰어남",
                generalOpinion: "학업에 열의가 있고 태도가 성실함",
            },
            "1-2": {
                creativeActive: "자율 독서 프로젝트에 참여함",
                detailedAndSpecial: "글쓰기 능력이 우수함",
                generalOpinion: "긍정적인 태도로 친구들과 잘 어울림",
            },
            "2-1": {
                creativeActive: "학교 축제 기획에 적극 참여함",
                detailedAndSpecial: "과학 탐구 실험에 뛰어난 관찰력을 보임",
                generalOpinion: "성실하고 책임감 있는 학생",
            },
            "2-2": {
                creativeActive: "토론 동아리에서 활발히 활동함",
                detailedAndSpecial: "비판적 사고 능력이 뛰어남",
                generalOpinion: "리더십을 바탕으로 모범적인 태도 유지",
            },
            "3-1": {
                creativeActive: "학급 회장을 맡아 리더십을 발휘함",
                detailedAndSpecial: "사회적 이슈에 대한 깊은 관심을 보임",
                generalOpinion: "모든 활동에 솔선수범하는 태도",
            },
        },
    },
    {
        studentId: "2",
        bySemester: {
            "1-1": {
                creativeActive: "환경보호 캠페인 참여",
                detailedAndSpecial: "영어 표현력이 뛰어남",
                generalOpinion: "적극적인 수업 태도를 보임",
            },
            "1-2": {
                creativeActive: "미술대회에 참여하여 수상 경력 있음",
                detailedAndSpecial: "창의적 사고를 자주 보여줌",
                generalOpinion: "조용하지만 집중력이 뛰어난 학생",
            },
            "2-1": {
                creativeActive: "과학 탐구 발표에서 주도적으로 참여함",
                detailedAndSpecial: "실험 기록과 발표력이 우수함",
                generalOpinion: "팀워크가 뛰어나며 협력적임",
            },
            "2-2": {
                creativeActive: "역사탐방 프로젝트에 참여함",
                detailedAndSpecial: "자료조사 및 정리에 능숙함",
                generalOpinion: "책임감 있게 역할을 수행함",
            },
        },
    },
    {
        studentId: "3",
        bySemester: {
            "1-1": {
                creativeActive: "교내 독서 토론회 참여",
                detailedAndSpecial: "사회 과목에서 깊이 있는 이해력을 보임",
                generalOpinion: "정직하고 성실한 태도로 임함",
            },
            "1-2": {
                creativeActive: "음악 시간에 창의적인 작곡을 시도함",
                detailedAndSpecial: "음악적 감각이 뛰어남",
                generalOpinion: "예술 활동에서의 열정이 돋보임",
            },
            "2-1": {
                creativeActive: "수학 경시대회 참가",
                detailedAndSpecial: "문제 해결 능력이 우수함",
                generalOpinion: "자기 주도적 학습 태도가 뛰어남",
            },
            "2-2": {
                creativeActive: "교내 방송반 활동",
                detailedAndSpecial: "매체 활용 능력이 뛰어남",
                generalOpinion: "원활한 의사소통 능력을 보임",
            },
        },
    },
];


// 비교과 파싱 데이터 가져오기
export const fetchParsedNonScoreRows = async (
    studentId: string
): Promise<NonScoreSummary> => {
    /*
    const res = await fetch(`${process.env.API_URL}/api/non-score-rows/${studentId}`);
    if (!res.ok) throw new Error("비교과 파싱 데이터 요청 실패");
    return res.json();
    */

    const nonScoreRows = mockNonScoreRows.find((row) => row.studentId === studentId);
    if (!nonScoreRows) {
        throw new Error("해당 학생의 비교과 데이터를 찾을 수 없습니다.");
    }
    return nonScoreRows;
};


// 학기별 비교과 결과 반환
export const getStudentNonScores = async (studentId: string) => {
    try {
        const nonScoreRows = await fetchParsedNonScoreRows(studentId);
        return {
            nonScoreRows,
        };
    } catch (error) {
        console.error("📛 비교과 데이터를 가져오는 중 오류:", error);
        throw error;
    }
};
