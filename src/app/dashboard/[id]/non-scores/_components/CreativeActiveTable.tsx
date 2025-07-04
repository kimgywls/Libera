import NonScoreModifyButton from "../../../../components/ui/EditRecordButton";

interface CreativeActiveTableProps {
    schoolYear: string;
    creativeActivity: {
        freeActivity: string;
        clubActivity: string;
        careerActivity: string;
    };
    isEditable?: boolean;
    onChange?: (key: string, value: string) => void;
}

export default function CreativeActiveTable({
    schoolYear,
    creativeActivity,
    isEditable = false,
    onChange,
}: CreativeActiveTableProps) {
    const activities = [
        { key: 'freeActivity', label: '자유활동', value: creativeActivity.freeActivity },
        { key: 'clubActivity', label: '동아리활동', value: creativeActivity.clubActivity },
        { key: 'careerActivity', label: '진로활동', value: creativeActivity.careerActivity },
    ];

    return (
        <div className="rounded-lg p-4 bg-white shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                    {schoolYear}학년
                </h3>
                <div className={`${isEditable ? "hidden" : "block"} mr-2`}>
                    <NonScoreModifyButton
                        recordType="creativeActivity"
                        schoolYear={schoolYear}
                        initialData={creativeActivity}
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
                                영역
                            </th>
                            <th className="border border-gray-200 px-4 py-3 text-center text-gray-700 font-medium">
                                활동 내용
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity, index) => (
                            <tr key={activity.key} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border border-gray-200 px-4 py-6 text-center font-medium text-gray-700 ">
                                    {activity.label}
                                </td>
                                <td className="border border-gray-200 p-4 text-center text-gray-700 ">
                                    {isEditable ? (
                                        <textarea
                                            rows={4}
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-violet-500"
                                            value={activity.value || ""}
                                            onChange={(e) => onChange?.(activity.key, e.target.value)}
                                        />
                                    ) : (
                                        activity.value || "-"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}