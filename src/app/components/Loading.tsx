import React from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    color?: "primary" | "white" | "gray";
    text?: string;
    className?: string;
}

export default function LoadingSpinner({
    size = "md",
    color = "primary",
    text,
    className = ""
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    };

    const colorClasses = {
        primary: "text-violet-500",
        white: "text-white",
        gray: "text-gray-500"
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]} ${colorClasses[color]}`} />
            {text && (
                <p className={`mt-2 text-sm ${colorClasses[color]}`}>
                    {text}
                </p>
            )}
        </div>
    );
}

// 전체 화면 로딩 컴포넌트
export function FullScreenLoading({ text = "로딩 중..." }: { text?: string }) {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <LoadingSpinner size="lg" text={text} />
        </div>
    );
}

// 컨테이너 로딩 컴포넌트
export function ContainerLoading({ text = "로딩 중..." }: { text?: string }) {
    return (
        <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="md" text={text} />
        </div>
    );
}

// 인라인 로딩 컴포넌트
export function InlineLoading({ text }: { text?: string }) {
    return (
        <div className="flex items-center space-x-2">
            <LoadingSpinner size="sm" />
            {text && <span className="text-sm text-gray-600">{text}</span>}
        </div>
    );
} 