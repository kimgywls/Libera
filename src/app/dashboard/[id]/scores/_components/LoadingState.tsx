import { LoadingSpinner } from "@/app/components";

export default function LoadingState() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">성적 데이터를 불러오는 중...</p>
                <LoadingSpinner />
            </div>
        </div>
    );
} 