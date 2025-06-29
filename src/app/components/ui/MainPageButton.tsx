import { useRouter } from "next/navigation";

export default function MainPageButton() {
    const router = useRouter();
    return (
        <button className="bg-violet-500 text-white px-4 py-2 rounded-md" onClick={() => router.push("/main")}>메인 페이지로 이동</button>
    );
}