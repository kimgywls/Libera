import { useState } from "react";

// 모달 상태를 관리하는 커스텀 훅
export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    };
};
