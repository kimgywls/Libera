import { X } from "lucide-react";
import { useState, useCallback } from "react";
import { ScoreType, ScoreSubmissionData } from "@/app/types/scores";
import ScoreSubmission2 from "../ScoreSubmission2";
import ScoreSubmission3 from "../ScoreSubmission3";
import ScoreSubmissionMockTest from "../ScoreSubmissionMockTest";

interface ScoreTypeSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectType: (type: ScoreType) => void;
}

const scoreTypes = [
    {
        type: '2' as ScoreType,
        label: '2-2 성적표',
    },
    {
        type: '3' as ScoreType,
        label: '3-1 성적표',
    },
    {
        type: 'mockTest' as ScoreType,
        label: '모의고사 성적표',
    }
];

export default function ScoreSubmissionModal({
    isOpen,
    onClose,
    onSelectType
}: ScoreTypeSelectionModalProps) {
    const [selectedType, setSelectedType] = useState<ScoreType | null>(null);
    const [formData, setFormData] = useState({
        studentName: '',
        contact: '',
    });
    const [scoreData, setScoreData] = useState<ScoreSubmissionData | null>(null);
    const [isDataValid, setIsDataValid] = useState(false);

    const handleDataChange = useCallback((data: ScoreSubmissionData, isValid: boolean) => {
        setScoreData(data);
        setIsDataValid(isValid);
    }, []);

    const handleSubmit = () => {
        if (selectedType && formData.studentName && formData.contact && isDataValid && scoreData) {
            onSelectType(selectedType);
            // TODO: 실제 제출 로직 구현
            console.log('제출 데이터:', { type: selectedType, formData, scoreData });
        }
    };

    const isFormValid = () => {
        if (selectedType === '2') {
            // 2-2 성적표는 파일만 있으면 됨
            return isDataValid;
        } else {
            // 3-1 성적표와 모의고사는 학생 정보도 필요
            return selectedType && formData.studentName && formData.contact && isDataValid;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">성적표 제출하기</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-row justify-center gap-2">
                    {scoreTypes.map((scoreType) => (
                        <label
                            key={scoreType.type}
                            className={`flex items-center px-4 py-2 cursor-pointer transition-all duration-200 ${selectedType === scoreType.type
                                }`}
                        >
                            <input
                                type="radio"
                                name="scoreType"
                                value={scoreType.type}
                                checked={selectedType === scoreType.type}
                                onChange={(e) => setSelectedType(e.target.value as ScoreType)}
                                className="mr-2 text-violet-600 focus:ring-violet-500"
                            />
                            <span className="font-medium text-gray-700">{scoreType.label}</span>
                        </label>
                    ))}
                </div>

                <div className="flex flex-row justify-center p-4">
                    {selectedType === '2' && (
                        <div className="w-full">
                            <ScoreSubmission2
                                contact={formData.contact}
                                studentName={formData.studentName}
                                onDataChange={handleDataChange}
                            />
                        </div>
                    )}
                    {selectedType === '3' && (
                        <div className="w-full">
                            <ScoreSubmission3
                                contact={formData.contact}
                                studentName={formData.studentName}
                                onDataChange={handleDataChange}
                            />
                        </div>
                    )}
                    {selectedType === 'mockTest' && (
                        <div className="w-full">
                            <ScoreSubmissionMockTest
                                contact={formData.contact}
                                studentName={formData.studentName}
                                onDataChange={handleDataChange}
                            />
                        </div>
                    )}
                </div>

                <div className="flex space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                        className={`flex-1 px-4 py-2 rounded-md transition-colors ${isFormValid()
                            ? 'bg-violet-500 text-white hover:bg-violet-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        제출
                    </button>
                </div>
            </div>
        </div>
    );
}