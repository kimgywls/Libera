import { useState } from "react";

export function useConsultationDate(initial: string) {
    const [date, setDate] = useState(initial || "");
    const [isEditing, setIsEditing] = useState(!initial);

    const save = () => {
        console.log("저장됨", date);
        setIsEditing(false);
    };

    return {
        consultationDate: date,
        isEditing,
        setIsEditing,
        setConsultationDate: setDate,
        save,
    };
}
