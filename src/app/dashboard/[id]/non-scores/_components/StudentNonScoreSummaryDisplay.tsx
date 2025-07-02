
import { NonScoreSummary } from "@/app/types/scores";
import { Student } from "@/app/types/students";
import StudentInfoWithGrade from "@/app/dashboard/_components/StudentInfoWithGrade";
import StudentCreativeActiveSection from "./StudentCreativeActiveSection";
import StudentDetailedAndSpecialSection from "./StudentDetailedAndSpecialSection";
import StudentGeneralOpinionSection from "./StudentGeneralOpinionSection";

interface StudentNonScoreSummaryDisplayProps {
    studentNonScores: NonScoreSummary;
    student: Student;
}

export default function StudentNonScoreSummaryDisplay({ studentNonScores, student }: StudentNonScoreSummaryDisplayProps) {

    return (
        <div className="space-y-6">
            <StudentInfoWithGrade student={student} />

            <StudentCreativeActiveSection
                studentNonScores={studentNonScores}
            />

            <StudentDetailedAndSpecialSection
                studentNonScores={studentNonScores}
            />

            <StudentGeneralOpinionSection
                studentNonScores={studentNonScores}
            />
        </div>
    )
}