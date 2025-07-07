"use client";

import { X } from "lucide-react";


interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalType: "submit" | "saveAndSubmit";
    modalTitle: string;
    modalDescription: string;
    modalSize: "small" | "medium" | "large" | "xlarge";
    onSubmit: () => void;
    onSave: () => void;
    children: React.ReactNode;
}

export default function SubmitModal({
    isOpen,
    onClose,
    modalType,
    modalTitle,
    modalDescription,
    modalSize,
    onSubmit,
    onSave,
    children
}: SubmitModalProps) {

    const getModalWidthClass = (size: "small" | "medium" | "large" | "xlarge") => {
        switch (size) {
            case "small":
                return "w-full max-w-lg";
            case "medium":
                return "w-full max-w-xl";
            case "large":
                return "w-full max-w-5xl";
            case "xlarge":
                return "w-full max-w-6xl";
            default:
                return "w-full max-w-lg";
        }
    };

    if (!isOpen) return null;
    console.log("🔥 SubmitModal 렌더링됨, isOpen:", isOpen, "modalType:", modalType);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-lg p-6 overflow-y-auto ${getModalWidthClass(modalSize)}`}>
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {modalTitle}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                        <p className="text-violet-800 text-sm">
                            {modalDescription}
                        </p>
                    </div>

                    {children}
                </div>

                {modalType === "submit" && (
                    console.log("🔥 SubmitModal 버튼 렌더링됨, modalType:", modalType),
                    <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            onClick={() => { console.log("🔥 SubmitModal 버튼 클릭됨"); onSubmit(); }}
                            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
                        >
                            제출하기
                        </button>
                    </div>
                )}
                {modalType === "saveAndSubmit" && (
                    <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            onClick={onSave}
                            className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors"
                        >
                            저장하기
                        </button>
                        <button
                            onClick={onSubmit}
                            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
                        >
                            제출하기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
} 