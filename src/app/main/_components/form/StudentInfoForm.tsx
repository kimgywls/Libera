// Props 타입 정의
interface StudentInfoFormProps {
    studentName: string; // 학생 이름
    contact: string;     // 연락처
    onStudentNameChange: (name: string) => void; // 이름 변경 시 콜백
    onContactChange: (contact: string) => void;  // 연락처 변경 시 콜백
}

// 학생 기본 정보 입력 또는 표시 폼
export default function StudentInfoForm({
    studentName,
    contact,
    onStudentNameChange,
    onContactChange
}: StudentInfoFormProps) {
    // 이름이 존재하는지 여부
    const hasStudentName = studentName && studentName.trim() !== "";
    // 연락처가 존재하는지 여부
    const hasContact = contact && contact.trim() !== "";

    return (
        <div className="mb-6">
            {/* 반응형 레이아웃: 1열 또는 2열 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* 학생 이름 입력 or 표시 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        학생 이름 <span className="text-red-500">*</span>
                    </label>
                    {hasStudentName ? (
                        // 이름이 이미 존재하면 텍스트 블록으로 표시
                        <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900">
                            {studentName}
                        </div>
                    ) : (
                        // 입력이 필요하면 input 필드 노출
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => onStudentNameChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="학생 이름을 입력하세요"
                            required
                        />
                    )}
                </div>

                {/* 연락처 입력 or 표시 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        연락처 <span className="text-red-500">*</span>
                    </label>
                    {hasContact ? (
                        // 연락처가 이미 존재하면 표시만
                        <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900">
                            {contact}
                        </div>
                    ) : (
                        // 없으면 입력 가능
                        <input
                            type="text"
                            value={contact}
                            onChange={(e) => onContactChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            placeholder="연락처를 입력하세요"
                            required
                        />
                    )}
                </div>

            </div>
        </div>
    );
}
