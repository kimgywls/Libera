"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Student } from "@/app/types/students";

interface StudentAddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (studentData: Student) => void;
}

export default function StudentAddModal({
    isOpen,
    onClose,
    onSubmit
}: StudentAddModalProps) {
    const [formData, setFormData] = useState<Student>({
        studentName: '',
        birthdate: '',
        contact: '',
        currentSchool: '',
        desiredSchool: '',
        desiredMajor: '',
    });

    const handleInputChange = (field: keyof Student, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            onSubmit({
                studentName: formData.studentName,
                birthdate: formData.birthdate,
                contact: formData.contact,
                currentSchool: formData.currentSchool,
                desiredSchool: formData.desiredSchool,
                desiredMajor: formData.desiredMajor,
            });
            // 폼 초기화
            setFormData({
                studentName: '',
                birthdate: '',
                contact: '',
                currentSchool: '',
                desiredSchool: '',
                desiredMajor: '',
            });
            onClose();
        }
    };

    const isFormValid = () => {
        return formData.studentName.trim() !== '' &&
            formData.contact.trim() !== '' &&
            formData.currentSchool.trim() !== '' &&
            formData.desiredSchool.trim() !== '' &&
            formData.desiredMajor.trim() !== '';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">학생 추가</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            학생 이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.studentName}
                            onChange={(e) => handleInputChange('studentName', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="학생 이름을 입력하세요"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            연락처 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            value={formData.contact}
                            onChange={(e) => handleInputChange('contact', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="연락처를 입력하세요"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            현재 학교 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.currentSchool}
                            onChange={(e) => handleInputChange('currentSchool', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="현재 학교를 입력하세요"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            희망 학교 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.desiredSchool}
                            onChange={(e) => handleInputChange('desiredSchool', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="희망 학교를 입력하세요"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            희망 학과 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.desiredMajor}
                            onChange={(e) => handleInputChange('desiredMajor', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="희망 학과를 입력하세요"
                            required
                        />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid()}
                            className={`flex-1 px-4 py-2 rounded-md transition-colors ${isFormValid()
                                ? 'bg-violet-500 text-white hover:bg-violet-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            추가
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 