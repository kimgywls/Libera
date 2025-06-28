import { Search, CheckCircle, ChevronDown } from "lucide-react";
import { Student } from "@/app/types/students";
import { useRouter } from "next/navigation";
import { useStudentContext } from "@/app/main/_context/StudentContext";
import { useState, useRef, useEffect } from "react";

interface StudentsRowProps {
    student: Student;
    index: number;
    scoreSubmitted_2?: boolean;
    scoreSubmitted_3?: boolean;
    scoreSubmitted_mockTest?: boolean;
    isSelected?: boolean;
    onSelect?: (checked: boolean) => void;
    onUpdateGradeSubmission?: (type: 'gradeSubmission_2' | 'gradeSubmission_3' | 'gradeSubmission_mockTest', value: boolean) => void;
}

type SubmissionStatus = '미제출' | '입력중' | '완료';

const statusOptions: SubmissionStatus[] = ['미제출', '입력중', '완료'];

export default function StudentsRow({
    student,
    index,
    scoreSubmitted_2 = false,
    scoreSubmitted_3 = false,
    scoreSubmitted_mockTest = false,
    isSelected = false,
    onSelect,
    onUpdateGradeSubmission
}: StudentsRowProps) {
    const router = useRouter();
    const { setSelectedStudent } = useStudentContext();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 드롭다운 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getStatusText = (isSubmitted: boolean): SubmissionStatus => {
        return isSubmitted ? '완료' : '미제출';
    };

    const getStatusColor = (status: SubmissionStatus) => {
        switch (status) {
            case '완료':
                return 'text-green-600 bg-green-100';
            case '입력중':
                return 'text-yellow-600 bg-yellow-100';
            case '미제출':
                return 'text-gray-400 bg-gray-100';
            default:
                return 'text-gray-400 bg-gray-100';
        }
    };

    const SubmissionStatusDropdown = ({
        label,
        isSubmitted,
        type
    }: {
        label: string;
        isSubmitted: boolean;
        type: 'gradeSubmission_2' | 'gradeSubmission_3' | 'gradeSubmission_mockTest';
    }) => {
        const currentStatus = getStatusText(isSubmitted);
        const dropdownId = `${student.contact}-${type}`;

        const handleStatusChange = (newStatus: SubmissionStatus) => {
            const newValue = newStatus === '완료';
            onUpdateGradeSubmission?.(type, newValue);
            setOpenDropdown(null);
        };

        return (
            <div className="flex items-center justify-center mb-1 last:mb-0 relative" ref={dropdownRef}>
                <span className="text-sm text-gray-600 mr-4">{label}</span>
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
                        }}
                        className={`flex items-center px-2 py-1 rounded text-sm font-medium ${getStatusColor(currentStatus)} hover:opacity-80 transition-opacity`}
                    >
                        {currentStatus}
                        <ChevronDown className="h-3 w-3 ml-1" />
                    </button>

                    {openDropdown === dropdownId && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-24">
                            {statusOptions.map((status) => (
                                <button
                                    key={status}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusChange(status);
                                    }}
                                    className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${status === currentStatus ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const handleRowClick = (e: React.MouseEvent) => {
        // 체크박스 클릭 시에는 행 클릭 이벤트를 막음
        if ((e.target as HTMLElement).tagName === 'INPUT') {
            return;
        }

        // 학생 정보를 context에 저장
        setSelectedStudent(student);
        // 대시보드로 이동
        router.push(`/dashboard/${student.contact}`);
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 행 클릭 이벤트 전파 방지
    };

    return (
        <tr onClick={handleRowClick} className="border-t hover:bg-gray-50 text-center cursor-pointer">
            <td className="px-4 py-3 text-center" onClick={handleCheckboxClick}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect?.(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
            </td>
            <td className="px-4 py-3 font-medium">{index + 1}</td>
            <td className="px-4 py-3 font-semibold ">{student.studentName}</td>
            <td className="px-4 py-3">{student.contact}</td>
            <td className="px-4 py-3">{student.currentSchool}</td>
            <td className="px-4 py-3">{student.desiredSchool}</td>
            <td className="px-4 py-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                    {student.desiredMajor}
                </span>
            </td>
            <td className="px-4 py-3">
                <div className="text-left max-w-48">
                    <SubmissionStatusDropdown
                        label="2-2 성적"
                        isSubmitted={scoreSubmitted_2}
                        type="gradeSubmission_2"
                    />
                    <SubmissionStatusDropdown
                        label="3-1 성적"
                        isSubmitted={scoreSubmitted_3}
                        type="gradeSubmission_3"
                    />
                    <SubmissionStatusDropdown
                        label="모의고사"
                        isSubmitted={scoreSubmitted_mockTest}
                        type="gradeSubmission_mockTest"
                    />
                </div>
            </td>
            <td className="px-4 py-3">
                <button className="px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                    내보내기
                </button>
            </td>
        </tr>
    );
}

export function EmptyStudentsRow({ columnCount }: { columnCount?: number }) {
    return (
        <tr>
            <td colSpan={columnCount} className="h-24 text-center">
                <div className="flex items-center justify-center space-x-2">
                    <Search className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                </div>
            </td>
        </tr>
    );
}