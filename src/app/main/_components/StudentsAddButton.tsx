import StudentsAddModal from "./_modal/StudentsAddModal";
import { useModalState } from "../../hooks/useModalState";

export default function StudentsAddButton() {
    const modal = useModalState();

    return (
        <div className="">
            <button
                onClick={() => modal.openModal("scoreSubmission2")}
                className="px-5 py-1.5 bg-black/80 hover:bg-black/80 text-white rounded transition-colors whitespace-nowrap"
            >
                <span className="text-lg">학생 추가</span>
            </button>

            {/* 학생 추가 모달 */}
            <StudentsAddModal
                isOpen={modal.isModalOpen("scoreSubmission2")}
                onClose={() => modal.closeModal("scoreSubmission2")}
            />
        </div>
    );
}
