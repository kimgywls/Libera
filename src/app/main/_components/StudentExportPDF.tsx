import React, { forwardRef } from "react";
import StudentInfo from "@/app/dashboard/_components/StudentInfo";
import GradeTable from "@/app/dashboard/[id]/scores/_components/GradeTable";
import MockTestTable from "@/app/dashboard/[id]/scores/_components/MockTestTable";
import SemesterGradeTable from "@/app/dashboard/[id]/scores/_components/SemesterGradeTable";
import SemesterSubjectChart from "@/app/dashboard/[id]/scores/_components/SemesterRankGradeChart";
import { SEMESTER, MOCK_TEST_MONTHS, SUBJECT_TYPES, DISPLAY_SUBJECTS, Month } from "@/app/constants";
import { Student } from "@/app/types/students";
import { ScoreRowData, MonthlyMockTestGradeMap, SemesterGrade, OverallGradeForChart } from "@/app/types/scores";
// 필요에 따라 다른 컴포넌트 import

interface ChartDataItem {
    subject: string;
    data: OverallGradeForChart[];
}

interface StudentExportPDFProps {
    student: Student;
    overallGrade: number;
    grades: ScoreRowData[];
    mockTests?: MonthlyMockTestGradeMap;
    semesterGrades?: SemesterGrade;
    chartData?: ChartDataItem[];
}

const semesterList = Object.values(SEMESTER);
const monthList = MOCK_TEST_MONTHS;
const displaySubjects = DISPLAY_SUBJECTS;

// chunkArray 유틸 함수 추가
function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
}

const StudentExportPDF = forwardRef<HTMLDivElement, StudentExportPDFProps>(({ student, overallGrade, grades, mockTests = {}, semesterGrades, chartData = [] }, ref) => (
    <div ref={ref} className="flex flex-col gap-4 p-4 bg-white">
        <StudentInfo student={student} overallGrade={overallGrade} />
        {/* 모든 학기별 성적표 */}
        {semesterList.map((semester) => (
            SUBJECT_TYPES.map((subjectType) => (
                <GradeTable
                    key={semester + subjectType}
                    semester={semester}
                    subjectType={subjectType}
                    grades={grades}
                />
            ))
        ))}
        {/* 모든 모의고사 월별 성적표 */}
        {monthList.map((month) => {
            const testData = mockTests?.[month];
            return (
                <MockTestTable
                    key={month}
                    month={month}
                    testData={testData}
                />
            );
        })}
        {/* 학기별 등급 테이블 */}
        {semesterGrades && <SemesterGradeTable grade={semesterGrades} />}
        {/* DISPLAY_SUBJECTS에 따른 차트 반복 출력 */}
        {chunkArray([...displaySubjects], 3).map((chunk, idx) => (
            <div
                key={idx}
                style={{ display: 'flex', gap: '8px', breakInside: 'avoid', pageBreakInside: 'avoid' }}
            >
                {chunk.map(subject => {
                    const typedSubject = subject as typeof displaySubjects[number];
                    const subjectChart = chartData.find(cd => cd.subject === typedSubject);
                    if (!subjectChart) return null;
                    return (
                        <div key={typedSubject} style={{ flex: 1, minWidth: 0 }}>
                            <SemesterSubjectChart subject={typedSubject} chartData={subjectChart.data} />
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
));

export default StudentExportPDF; 