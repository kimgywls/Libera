import ScoreSubmission2Modal from "./_modal/ScoreSubmission2Modal";
import { useModal } from "../../hooks/useModal";
import { defaultStudent } from "@/app/types/students";

export default function StudentsAddButton() {
    const { isOpen, open, close } = useModal();

    const handlePdfSubmit = async () => {
        try {
            // TODO: 백엔드 API 호출하여 PDF 파일 업로드 및 데이터 추출
            console.log('PDF 파일 업로드 및 데이터 추출 요청');

            // 백엔드에서 데이터 추출이 완료되면 학생이 자동으로 추가됨
            // 여기서는 모달만 닫음
            close();
        } catch (error) {
            console.error('PDF 업로드 실패:', error);
        }
    };

    return (
        <div className="">
            <button
                onClick={open}
                className="px-5 py-1.5 bg-black/80 hover:bg-black/80 text-white rounded transition-colors whitespace-nowrap"
            >
                <span className="text-lg">학생 추가</span>
            </button>

            <ScoreSubmission2Modal
                isOpen={isOpen}
                onClose={close}
                student={defaultStudent}
                onSubmit={handlePdfSubmit}
            />
        </div>
    );
}
