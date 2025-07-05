"use server";

import { NonScoreSummary } from "@/app/types/scores";

// 목데이터: 비교과 (NonScoreRowData[])
const mockNonScoreRows: NonScoreSummary[] = [
    {
        studentId: "1",
        bySchoolYear: {
            1: {
                creativeActivity: {
                    freeActivity: "봉사활동에 꾸준히 참여함",
                    clubActivity: "환경 동아리에서 활동하며 교내 캠페인을 주도함",
                    careerActivity: "수의사 직업체험을 통해 진로 인식 형성",
                },
                detailedAndSpecial: [
                    { subject: "수학", comment: "수학 개념 이해도가 뛰어남" },
                    { subject: "영어", comment: "어휘력이 좋음" },
                ],
                generalOpinion: {
                    generalOpinion: "학업에 열의가 있고 태도가 성실함",
                },
            },
            2: {
                creativeActivity: {
                    freeActivity: "자율 독서 활동을 통해 글쓰기 능력 향상",
                    clubActivity: "독서토론 동아리에서 의견 발표 능력 향상",
                    careerActivity: "글쓰기 관련 진로 탐색 활동 수행",
                },
                detailedAndSpecial: [
                    { subject: "국어", comment: "글쓰기 능력이 우수함" },
                ],
                generalOpinion: {
                    generalOpinion: "긍정적인 태도로 친구들과 잘 어울림",
                },
            },
            3: {
                creativeActivity: {
                    freeActivity: "봉사활동에 꾸준히 참여함",
                    clubActivity: "환경 동아리에서 활동하며 교내 캠페인을 주도함",
                    careerActivity: "수의사 직업체험을 통해 진로 인식 형성",
                },
                detailedAndSpecial: [
                    { subject: "수학", comment: "그래프에 대한 개념 이해도가 뛰어남" },
                    { subject: "영어", comment: "영어 말하기 대회 동상 수상" },
                ],
            },
        },
    },
    {
        studentId: "2",
        bySchoolYear: {
            1: {
                creativeActivity: {
                    freeActivity: "환경보호 캠페인 참여",
                    clubActivity: "과학 동아리에서 실험 주도",
                    careerActivity: "의사 직업에 대한 진로체험 수행",
                },
                detailedAndSpecial: [
                    { subject: "국어", comment: "책을 많이 읽고 글로 표현하는 능력이 좋음" },
                    { subject: "과학", comment: "실험에 대한 이해도가 높음" },
                ],
                generalOpinion: {
                    generalOpinion: "적극적인 수업 태도를 보임",
                },
            },
            2: {
                creativeActivity: {
                    freeActivity: "독서 발표 활동에 자율적으로 참여함",
                    clubActivity: "미술 동아리에서 작품 전시 참여",
                    careerActivity: "디자인 진로탐색 보고서 작성",
                },
                detailedAndSpecial: [
                    { subject: "미술", comment: "창의적 사고를 자주 보여줌" },
                ],
                generalOpinion: {
                    generalOpinion: "조용하지만 집중력이 뛰어난 학생",
                },
            },
            3: {
                creativeActivity: {
                    freeActivity: "봉사활동에 꾸준히 참여함",
                    clubActivity: "환경 동아리에서 활동하며 교내 캠페인을 주도함",
                    careerActivity: "수의사 직업체험을 통해 진로 인식 형성",
                },
                detailedAndSpecial: [
                    { subject: "수학", comment: "수학 개념 이해도가 뛰어남" },
                    { subject: "영어", comment: "어휘력이 좋음" },
                ],
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
