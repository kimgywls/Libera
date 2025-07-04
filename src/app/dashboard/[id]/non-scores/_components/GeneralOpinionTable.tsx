import NonScoreModifyButton from "../../../../components/ui/EditRecordButton";
import { GeneralOpinion } from "@/app/types/scores";

interface GeneralOpinionTableProps {
    schoolYear: string;
    generalOpinion: GeneralOpinion;
    isEditable?: boolean;
    onChange?: (key: string, value: string) => void;
}

export default function GeneralOpinionTable({
    schoolYear,
    generalOpinion,
    isEditable = false,
    onChange,
}: GeneralOpinionTableProps) {

    return (
        <div className="rounded-lg p-4 bg-white shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                    {schoolYear}학년
                </h3>
                <div className={`${isEditable ? "hidden" : "block"} mr-2`}>
                    <NonScoreModifyButton
                        recordType="generalOpinion"
                        schoolYear={schoolYear}
                        initialData={generalOpinion}
                        onSubmit={() => { }}
                        onSave={() => { }}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium w-[120px]">
                                학년
                            </th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">
                                행동특성 및 종합 의견
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="border border-gray-200 px-4 py-6 text-center font-medium text-gray-700 ">
                                {schoolYear}학년
                            </td>
                            <td className="border border-gray-200 p-4 text-center font-medium text-gray-700 ">
                                {isEditable ? (
                                    <textarea
                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-violet-500"
                                        rows={4}
                                        value={generalOpinion.generalOpinion || ""}
                                        onChange={(e) => onChange?.("generalOpinion", e.target.value)}
                                    />
                                ) : (
                                    generalOpinion.generalOpinion || "-"
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}