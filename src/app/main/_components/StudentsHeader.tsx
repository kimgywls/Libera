import { Student } from "@/app/types/students";
import StudentSearchFilter from "./StudentSearchFilter";
import StudentsAddButton from "./StudentsAddButton";
import StudentsDeleteButton from "./StudentsDeleteButton";

interface StudentsHeaderProps {
    students: Student[]; // 전체 학생 목록
    onFilteredStudentsChange: (filteredStudents: Student[]) => void; // 검색 결과 상태 변경 콜백
}

export default function StudentsHeader({
    students,
    onFilteredStudentsChange
}: StudentsHeaderProps) {

    // 검색 결과가 바뀌면 상위 컴포넌트에 전달
    const handleFilteredStudents = (filtered: Student[]) => {
        onFilteredStudentsChange(filtered);
    };

    return (
        <div className="flex flex-col items-center w-full px-3 pt-5 max-h-screen">

            {/* 타이틀 영역 */}
            <header className="w-full mb-5">
                <h1 className="text-3xl font-bold text-black">학생 목록</h1>
            </header>

            {/* 검색 + 버튼 섹션 */}
            <section className="w-full flex flex-row">

                {/* 왼쪽: 검색 필터 */}
                <div className="flex-1">
                    <StudentSearchFilter
                        allStudents={students} // 전체 데이터 전달
                        onFiltered={handleFilteredStudents} // 필터 결과 전달 받음
                    />
                </div>

                {/* 오른쪽: 추가/삭제 버튼 */}
                <div className="w-1/3 flex justify-end gap-4 items-center">
                    <StudentsAddButton />
                    <StudentsDeleteButton />
                </div>
            </section>
        </div>
    );
}
