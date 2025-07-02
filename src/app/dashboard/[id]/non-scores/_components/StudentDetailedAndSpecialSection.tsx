import { NonScoreSummary } from "@/app/types/scores";
import DetailedAndSpecialTable from "./DetailedAndSpecialTable";

interface StudentDetailedAndSpecialSectionProps {
    studentNonScores: NonScoreSummary;
}

export default function StudentDetailedAndSpecialSection({ studentNonScores }: StudentDetailedAndSpecialSectionProps) {
    const bySchoolYear = studentNonScores.bySchoolYear;
    console.log(studentNonScores.bySchoolYear);
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">세부능력 및 특기 사항</h2>

            {Object.entries(bySchoolYear).map(([year, activity]) => (
                <DetailedAndSpecialTable
                    key={year}
                    schoolYear={year}
                    detailedAndSpecial={activity.detailedAndSpecial}
                />
            ))}
        </section>
    )
}