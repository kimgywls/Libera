interface GradeSelectProps {
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
}

export default function GradeSelect({ label, required, value, onChange }: GradeSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">등급 선택</option>
                {Array.from({ length: 9 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                        {i + 1}등급
                    </option>
                ))}
            </select>
        </div>
    );
}
