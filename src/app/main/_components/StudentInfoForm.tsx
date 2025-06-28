interface StudentInfoFormProps {
    studentName: string;
    contact: string;
    onStudentNameChange: (name: string) => void;
    onContactChange: (contact: string) => void;
}

export default function StudentInfoForm({
    studentName,
    contact,
    onStudentNameChange,
    onContactChange
}: StudentInfoFormProps) {
    return (
        <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        학생 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => onStudentNameChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="학생 이름을 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => onContactChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="연락처를 입력하세요"
                        required
                    />
                </div>
            </div>
        </div>
    );
} 