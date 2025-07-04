import { NonScoreSummary } from "@/app/types/scores";
import GeneralOpinionTable from "./GeneralOpinionTable";

interface StudentGeneralOpinionSectionProps {
    studentNonScores: NonScoreSummary;
}

export default function StudentGeneralOpinionSection({ studentNonScores }: StudentGeneralOpinionSectionProps) {
    const bySchoolYear = studentNonScores.bySchoolYear;

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">행동특성 및 종합 의견</h2>

            {Object.entries(bySchoolYear)
                .filter(([year]) => year === "1" || year === "2")
                .map(([year, activity]) => (
                    <GeneralOpinionTable
                        key={year}
                        schoolYear={year}
                        generalOpinion={activity.generalOpinion || { generalOpinion: "" }}
                    />
                ))}
        </section>
    );
}
