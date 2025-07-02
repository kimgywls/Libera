import { LoadingSpinner } from "@/app/components";

export default function LoadingState({ data }: { data: string }) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-600">{data} 데이터를 불러오는 중...</p>

            </div>
        </div>
    );
} 