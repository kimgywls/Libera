import { NonScoreSummary } from "@/app/types/scores";
import CreativeActiveTable from "./CreativeActiveTable";


interface StudentCreativeActiveSectionProps {
    studentNonScores: NonScoreSummary;
}

export default function StudentCreativeActiveSection({
    studentNonScores,
}: StudentCreativeActiveSectionProps) {

    const bySchoolYear = studentNonScores.bySchoolYear;

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">창의적 체험 활동</h2>

            {Object.entries(bySchoolYear).map(([year, activity]) => (
                <CreativeActiveTable
                    key={year}
                    schoolYear={year}
                    creativeActivity={activity.creativeActivity}
                />
            ))}
        </section>
    );
}
