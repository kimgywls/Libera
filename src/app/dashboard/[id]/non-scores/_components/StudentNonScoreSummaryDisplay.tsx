import { Student } from "@/app/types/students";
import StudentInfo from "@/app/dashboard/_components/StudentInfo";
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
            <StudentInfo student={student} />

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