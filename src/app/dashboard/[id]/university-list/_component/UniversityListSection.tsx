import UniversityTable from "./UniversityTable";
import { StudentRecommendedUniversityList, University } from "@/app/types/university";

interface UniversityListSectionProps {
    recommandUniversityList: StudentRecommendedUniversityList[];
}

export default function UniversityListSection({ recommandUniversityList }: UniversityListSectionProps) {
    // 모든 대학을 flat하게 변환
    const universityList: University[] = recommandUniversityList.flatMap(item => item.universityList);

    return (
        <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">추천 대학 목록</h2>
            <UniversityTable universityList={universityList} />
        </div>
    );
}