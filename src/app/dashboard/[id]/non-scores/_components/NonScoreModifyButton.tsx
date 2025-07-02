import { NonScoreSummary } from "@/app/types/scores";

interface NonScoreModifyButtonProps {

}

export default function NonScoreModifyButton({ }: NonScoreModifyButtonProps) {
    return (
        <button className="hover:underline text-gray-700 hover:text-violet-500 px-3 py-1 font-semibold cursor-pointer"
            onClick={() => {
                console.log("수정 하기");
            }}
        >
            수정 하기
        </button>
    )
}