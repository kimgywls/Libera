"use server";

import { StudentGradeData } from "../../types/scores";

// 실제 API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// 목데이터 - PDF 파싱된 성적 데이터
const mockParsedGrades: StudentGradeData[] = [
    {
        studentId: "1",
        contact: "010-1234-5678",
        name: "김하늘",
        school: "서울고등학교",
        status: "parsed",
        parsedAt: "2024-01-15T10:30:00Z",
        grades: [
            // 1학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "B+", semester: "1-1", unit: 3, score: 92, avgScore: 88, stdDev: 4.2, rank: 5, rankCount: 30, achievement: 'A' },
            { subjectType: '일반선택', subject: "수학", grade: "A", semester: "1-1", unit: 4, score: 95, avgScore: 90, stdDev: 3.8, rank: 2, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "기초과정", grade: "A", semester: "1-1", unit: 2, score: 98, avgScore: 92, achievement: 'A', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "체육", grade: "A", semester: "1-1", unit: 2, achievement: 'A' },
            { subjectType: '일반선택', subject: "국어", grade: "A", semester: "1-2", unit: 3, score: 93, avgScore: 89, stdDev: 4.0, rank: 4, rankCount: 30, achievement: 'A' },
            { subjectType: '진로선택', subject: "융합과학", grade: "A", semester: "1-2", unit: 2, score: 97, avgScore: 91, achievement: 'A', specialNote: '탐구활동 우수' },
            { subjectType: '체육/예술', subject: "음악", grade: "A", semester: "1-2", unit: 2, achievement: 'A' },
            // 2학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "A", semester: "2-1", unit: 3, score: 94, avgScore: 90, stdDev: 3.5, rank: 3, rankCount: 30, achievement: 'A' },
            { subjectType: '일반선택', subject: "수학", grade: "A", semester: "2-1", unit: 4, score: 96, avgScore: 91, stdDev: 3.2, rank: 1, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "심화수학", grade: "A", semester: "2-1", unit: 2, score: 99, avgScore: 93, achievement: 'A', specialNote: '심화과정 이수' },
            { subjectType: '체육/예술', subject: "미술", grade: "A", semester: "2-1", unit: 2, achievement: 'A' },
            { subjectType: '일반선택', subject: "국어", grade: "A+", semester: "2-2", unit: 3, score: 95, avgScore: 91, stdDev: 3.0, rank: 2, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "체육", grade: "A", semester: "2-2", unit: 2, score: 97, avgScore: 93, achievement: 'A', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "음악", grade: "A", semester: "2-2", unit: 2, achievement: 'A' },
            // 3학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "A+", semester: "3-1", unit: 3, score: 97, avgScore: 92, stdDev: 3.0, rank: 1, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "진로탐구", grade: "A", semester: "3-1", unit: 2, score: 98, avgScore: 94, achievement: 'A', specialNote: '탐구활동 우수' },
            { subjectType: '체육/예술', subject: "체육", grade: "A", semester: "3-1", unit: 2, achievement: 'A' },
        ],
        mockTests: [
            { month: "3월", year: 2024, score: 85, percentile: 85, rank: 150 },
            { month: "6월", year: 2024, score: 92, percentile: 92, rank: 80 },
            { month: "9월", year: 2024, score: 88, percentile: 88, rank: 120 },
            { month: "11월", year: 2024, score: 90, percentile: 90, rank: 100 },
        ],
    },
    {
        studentId: "2",
        contact: "010-9876-5432",
        name: "이준호",
        school: "해솔고등학교",
        status: "parsed",
        parsedAt: "2024-01-14T14:20:00Z",
        grades: [
            // 1학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "B", semester: "1-1", unit: 3, score: 88, avgScore: 85, stdDev: 4.0, rank: 10, rankCount: 30, achievement: 'B+' },
            { subjectType: '일반선택', subject: "수학", grade: "A", semester: "1-1", unit: 4, score: 90, avgScore: 87, stdDev: 3.5, rank: 5, rankCount: 30, achievement: 'A' },
            { subjectType: '진로선택', subject: "영어", grade: "B+", semester: "1-1", unit: 2, score: 85, avgScore: 82, achievement: 'B+', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "사회", grade: "B", semester: "1-1", unit: 2, achievement: 'B' },
            { subjectType: '일반선택', subject: "과학", grade: "A", semester: "1-1", unit: 2, score: 92, avgScore: 89, stdDev: 3.2, rank: 2, rankCount: 30, achievement: 'A' },
            { subjectType: '일반선택', subject: "국어", grade: "B+", semester: "1-2", unit: 3, score: 91, avgScore: 87, stdDev: 3.8, rank: 6, rankCount: 30, achievement: 'B+' },
            { subjectType: '진로선택', subject: "수학", grade: "A+", semester: "1-2", unit: 2, score: 93, avgScore: 89, achievement: 'A+', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "영어", grade: "A", semester: "1-2", unit: 2, achievement: 'A' },
            { subjectType: '일반선택', subject: "사회", grade: "B+", semester: "1-2", unit: 2, score: 90, avgScore: 86, stdDev: 3.0, rank: 4, rankCount: 30, achievement: 'B+' },
            { subjectType: '일반선택', subject: "과학", grade: "A", semester: "1-2", unit: 2, score: 94, avgScore: 90, stdDev: 3.5, rank: 3, rankCount: 30, achievement: 'A' },
            // 2학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "B+", semester: "2-1", unit: 3, score: 93, avgScore: 89, stdDev: 3.2, rank: 5, rankCount: 30, achievement: 'B+' },
            { subjectType: '일반선택', subject: "수학", grade: "A", semester: "2-1", unit: 4, score: 95, avgScore: 90, stdDev: 3.0, rank: 2, rankCount: 30, achievement: 'A' },
            { subjectType: '진로선택', subject: "영어", grade: "A", semester: "2-1", unit: 2, score: 97, avgScore: 92, achievement: 'A', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "사회", grade: "B+", semester: "2-1", unit: 2, achievement: 'B+' },
            { subjectType: '일반선택', subject: "과학", grade: "A", semester: "2-1", unit: 2, score: 96, avgScore: 91, stdDev: 2.8, rank: 1, rankCount: 30, achievement: 'A' },
            { subjectType: '일반선택', subject: "국어", grade: "A", semester: "2-2", unit: 3, score: 94, avgScore: 90, stdDev: 3.0, rank: 3, rankCount: 30, achievement: 'A' },
            { subjectType: '진로선택', subject: "수학", grade: "A+", semester: "2-2", unit: 2, score: 96, avgScore: 92, achievement: 'A+', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "영어", grade: "A", semester: "2-2", unit: 2, achievement: 'A' },
            { subjectType: '일반선택', subject: "사회", grade: "A", semester: "2-2", unit: 2, score: 95, avgScore: 90, stdDev: 2.5, rank: 2, rankCount: 30, achievement: 'A' },
            { subjectType: '일반선택', subject: "과학", grade: "A+", semester: "2-2", unit: 2, score: 97, avgScore: 93, stdDev: 2.8, rank: 1, rankCount: 30, achievement: 'A+' },
            // 3학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "A", semester: "3-1", unit: 3, score: 95, avgScore: 92, stdDev: 2.5, rank: 4, rankCount: 30, achievement: 'A' },
            { subjectType: '진로선택', subject: "수학", grade: "A+", semester: "3-1", unit: 2, score: 97, avgScore: 93, achievement: 'A+', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "영어", grade: "A+", semester: "3-1", unit: 2, achievement: 'A+' },
            { subjectType: '일반선택', subject: "사회", grade: "A", semester: "3-1", unit: 2, score: 96, avgScore: 93, stdDev: 2.2, rank: 2, rankCount: 30, achievement: 'A' },
            { subjectType: '일반선택', subject: "과학", grade: "A+", semester: "3-1", unit: 2, score: 98, avgScore: 95, stdDev: 2.0, rank: 1, rankCount: 30, achievement: 'A+' },
        ],
        mockTests: [
            { month: "3월", year: 2024, score: 78, percentile: 78, rank: 220 },
            { month: "6월", year: 2024, score: 85, percentile: 85, rank: 150 },
            { month: "9월", year: 2024, score: 92, percentile: 92, rank: 80 },
            { month: "11월", year: 2024, score: 88, percentile: 88, rank: 120 },
        ],
    },
    {
        studentId: "3",
        contact: "010-1111-2222",
        name: "박서연",
        school: "한빛고등학교",
        status: "parsed",
        parsedAt: "2024-01-13T09:15:00Z",
        grades: [
            // 1학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "A", semester: "1-1", unit: 3, score: 95, avgScore: 92, stdDev: 2.8, rank: 2, rankCount: 30, achievement: 'A' },
            { subjectType: '일반선택', subject: "수학", grade: "A+", semester: "1-1", unit: 4, score: 98, avgScore: 94, stdDev: 2.5, rank: 1, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "영어", grade: "A", semester: "1-1", unit: 2, score: 97, avgScore: 93, achievement: 'A', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "사회", grade: "A", semester: "1-1", unit: 2, achievement: 'A' },
            { subjectType: '일반선택', subject: "과학", grade: "A+", semester: "1-1", unit: 2, score: 96, avgScore: 93, stdDev: 2.2, rank: 3, rankCount: 30, achievement: 'A+' },
            { subjectType: '일반선택', subject: "국어", grade: "A+", semester: "1-2", unit: 3, score: 97, avgScore: 94, stdDev: 2.0, rank: 2, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "수학", grade: "A+", semester: "1-2", unit: 2, score: 99, avgScore: 95, achievement: 'A+', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "영어", grade: "A+", semester: "1-2", unit: 2, achievement: 'A+' },
            { subjectType: '일반선택', subject: "사회", grade: "A+", semester: "1-2", unit: 2, score: 98, avgScore: 95, stdDev: 2.0, rank: 1, rankCount: 30, achievement: 'A+' },
            { subjectType: '일반선택', subject: "과학", grade: "A+", semester: "1-2", unit: 2, score: 99, avgScore: 96, stdDev: 1.8, rank: 1, rankCount: 30, achievement: 'A+' },
            // 2학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "A", semester: "2-1", unit: 3, score: 96, avgScore: 93, stdDev: 2.0, rank: 3, rankCount: 30, achievement: 'A' },
            { subjectType: '일반선택', subject: "수학", grade: "A+", semester: "2-1", unit: 4, score: 98, avgScore: 95, stdDev: 1.8, rank: 2, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "영어", grade: "A+", semester: "2-1", unit: 2, score: 99, avgScore: 96, achievement: 'A+', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "사회", grade: "A", semester: "2-1", unit: 2, achievement: 'A' },
            { subjectType: '일반선택', subject: "과학", grade: "A+", semester: "2-1", unit: 2, score: 97, avgScore: 94, stdDev: 1.8, rank: 1, rankCount: 30, achievement: 'A+' },
            { subjectType: '일반선택', subject: "국어", grade: "A+", semester: "2-2", unit: 3, score: 98, avgScore: 96, stdDev: 1.8, rank: 2, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "수학", grade: "A+", semester: "2-2", unit: 2, score: 99, avgScore: 97, achievement: 'A+', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "영어", grade: "A+", semester: "2-2", unit: 2, achievement: 'A+' },
            { subjectType: '일반선택', subject: "사회", grade: "A+", semester: "2-2", unit: 2, score: 99, avgScore: 97, stdDev: 1.5, rank: 1, rankCount: 30, achievement: 'A+' },
            { subjectType: '일반선택', subject: "과학", grade: "A+", semester: "2-2", unit: 2, score: 99, avgScore: 98, stdDev: 1.2, rank: 1, rankCount: 30, achievement: 'A+' },
            // 3학년 성적
            { subjectType: '일반선택', subject: "국어", grade: "A+", semester: "3-1", unit: 3, score: 99, avgScore: 97, stdDev: 1.5, rank: 1, rankCount: 30, achievement: 'A+' },
            { subjectType: '진로선택', subject: "수학", grade: "A+", semester: "3-1", unit: 2, score: 99, avgScore: 98, achievement: 'A+', specialNote: '우수' },
            { subjectType: '체육/예술', subject: "영어", grade: "A+", semester: "3-1", unit: 2, achievement: 'A+' },
            { subjectType: '일반선택', subject: "사회", grade: "A+", semester: "3-1", unit: 2, score: 98, avgScore: 96, stdDev: 1.2, rank: 2, rankCount: 30, achievement: 'A+' },
            { subjectType: '일반선택', subject: "과학", grade: "A+", semester: "3-1", unit: 2, score: 99, avgScore: 98, stdDev: 1.0, rank: 1, rankCount: 30, achievement: 'A+' },
        ],
        mockTests: [
            { month: "3월", year: 2024, score: 95, percentile: 95, rank: 50 },
            { month: "6월", year: 2024, score: 98, percentile: 98, rank: 20 },
            { month: "9월", year: 2024, score: 96, percentile: 96, rank: 40 },
            { month: "11월", year: 2024, score: 97, percentile: 97, rank: 30 },
        ],
    },
];

// PDF 파싱된 성적 데이터를 가져오는 함수
export const getParsedGrades = async (): Promise<StudentGradeData[]> => {
    try {
        // 실제 API 호출 시 사용할 코드
        // const response = await fetch(`${API_URL}/api/parsed-grades`);
        // if (!response.ok) throw new Error('Failed to fetch parsed grades');
        // return await response.json();

        // 현재는 목데이터 반환
        return mockParsedGrades;
    } catch (error) {
        console.error('Failed to fetch parsed grades:', error);
        throw new Error('성적 데이터를 불러오는데 실패했습니다.');
    }
};

// 특정 학생의 파싱된 성적 데이터를 가져오는 함수
export const getStudentParsedGrades = async (studentId: string): Promise<StudentGradeData | null> => {
    try {
        // 실제 API 호출 시 사용할 코드
        // const response = await fetch(`${API_URL}/api/parsed-grades/${studentId}`);
        // if (!response.ok) throw new Error('Failed to fetch student grades');
        // return await response.json();

        // 현재는 목데이터에서 찾기
        const student = mockParsedGrades.find(grade => grade.studentId === studentId);
        return student || null;
    } catch (error) {
        console.error('Failed to fetch student grades:', error);
        throw new Error('학생 성적 데이터를 불러오는데 실패했습니다.');
    }
}; 