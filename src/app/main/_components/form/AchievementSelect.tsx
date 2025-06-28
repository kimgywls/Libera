interface AchievementSelectProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
}

export default function AchievementSelect({ label, required, value, onChange }: AchievementSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-400 rounded-md px-1.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            >
                <option value="">성취도 선택</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
        </div>
    );
} 