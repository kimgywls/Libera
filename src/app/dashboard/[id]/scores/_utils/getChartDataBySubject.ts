import { OverallGradeForChart, TotalScores } from "@/app/types/scores";
import { Subject } from "@/app/constants";

export function getChartDataBySubject(totalGrade: TotalScores, subject: Subject): OverallGradeForChart[] {
    return Object.entries(totalGrade.bySemester)
        .map(([semester, subjectGrades]) => {
            const raw = subjectGrades[subject];
            const original = raw !== undefined && raw !== null ? Math.round(raw * 100) / 100 : null;

            return {
                semester,
                grade: original !== null ? Math.round((10 - original) * 100) / 100 : null,
                originalGrade: original,
            };
        })
        .sort((a, b) => a.semester.localeCompare(b.semester, "ko-KR"));
}
