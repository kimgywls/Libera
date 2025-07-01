import { SEMESTER } from "@/app/constants";
import { NonScoreSummary } from "@/app/types/scores";
import { Student } from "@/app/types/students";

interface StudentNonScoreSummaryDisplayProps {
    studentNonScores: NonScoreSummary;
    student: Student;
}

export default function StudentNonScoreSummaryDisplay({ studentNonScores, student }: StudentNonScoreSummaryDisplayProps) {

    console.log("📌 keys", Object.keys(studentNonScores.bySemester));
    console.log("📌 direct access", studentNonScores.bySemester["1-1"]);
    console.log("📌 by constant", studentNonScores.bySemester[SEMESTER.FIRST_SEMESTER]);

    return <div><h2>{student.studentName} 학생의 비교과 성적 요약</h2>
        <div className="border rounded p-3 text-black">
            <h3>1학기</h3>
            <p>{studentNonScores.bySemester[SEMESTER.FIRST_SEMESTER]?.creativeActive}</p>
            <p>{studentNonScores.bySemester[SEMESTER.FIRST_SEMESTER]?.detailedAndSpecial}</p>
            <p>{studentNonScores.bySemester[SEMESTER.FIRST_SEMESTER]?.generalOpinion}</p>
        </div>
        <div>
            <h3>2학기</h3>
        </div>
    </div>;
}