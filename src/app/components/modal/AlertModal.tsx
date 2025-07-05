import React from 'react';

interface AlertModalProps {
    open: boolean;
    onClose: () => void;
    message: string;
    type?: 'success' | 'error';
}

const AlertModal: React.FC<AlertModalProps> = ({ open, onClose, message, type = 'success' }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-xs flex flex-col items-center">
                <div className={`mb-4 text-2xl ${type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{type === 'success' ? '✔️' : '❌'}</div>
                <div className="mb-6 text-center text-gray-800 text-base whitespace-pre-line">{message}</div>
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default AlertModal; 