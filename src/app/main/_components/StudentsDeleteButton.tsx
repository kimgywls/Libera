export default function StudentsDeleteButton() {
    return (
        <div className="pr-5">
            <button
                className="px-5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors whitespace-nowrap"
            >
                <span className="text-lg">학생 삭제</span>
            </button>
        </div>

    );
}
