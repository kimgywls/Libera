"use client";

import { useEffect, useState } from "react";
import StudentsHeader from "./StudentsHeader";   // 검색 + 버튼 영역
import StudentsTable from "./StudentsTable";     // 학생 목록 테이블
import { useFetchStudents } from "../_hooks/useFetchStudents"; // 학생 목록 불러오는 커스텀 훅
import { Student } from "@/app/types/students";

// 전체 학생 목록 위젯 컴포넌트
export default function StudentsListWidget() {
    const { students, loading, error, reload } = useFetchStudents(); // 전체 학생 데이터 fetch
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]); // 검색 필터 적용 결과

    // 최초 로딩 or students 변경 시 전체 학생 목록으로 초기화
    useEffect(() => {
        setFilteredStudents(students);
    }, [students]);

    // 검색 필터 결과를 업데이트하는 핸들러
    const handleFilteredStudentsChange = (filteredStudents: Student[]) => {
        setFilteredStudents(filteredStudents);
    };

    return (
        <div className="flex flex-col items-center w-full max-h-screen">
            <section className="w-full flex flex-col space-y-5">
                {/* 헤더 (검색창 + 추가/삭제 버튼) */}
                <StudentsHeader
                    students={students}
                    onFilteredStudentsChange={handleFilteredStudentsChange}
                />

                {/* 테이블 (필터링된 학생들 보여줌) */}
                <StudentsTable
                    students={filteredStudents}
                    loading={loading}
                    error={error}
                    reload={reload}
                />
            </section>
        </div>
    );
}
