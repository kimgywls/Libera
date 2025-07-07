import React, { useState, useCallback, useEffect } from "react";
import { StudentCreate, StudentSummary } from "@/app/types/students";
import { useCreateStudent } from "@/app/main/_hooks/use-create-student";
import AlertModal from "@/app/components/modal/AlertModal";
import SubmitModal from "@/app/components/modal/SubmitModal";

interface StudentsAddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const initialForm: StudentCreate = {
    name: "",
    birth_date: "",
    phone_number: "",
    gender: "",
    current_school_name: "",
};

export default function StudentsAddModal({ isOpen, onClose, onSuccess }: StudentsAddModalProps) {
    const [form, setForm] = useState<StudentCreate>(initialForm);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertType, setAlertType] = useState<'success' | 'error'>("success");

    const { createStudent, loading, error, setError } = useCreateStudent((student) => {
        console.log("🔥 useCreateStudent 콜백 실행됨");
        alert("onSuccess 호출됨!");
        setAlertMsg(`학생이 등록되었습니다: ${student.name}`);
        setAlertType("success");
        setShowAlert(true);
        setForm(initialForm);
        if (onSuccess) onSuccess();
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev: StudentCreate) => ({ ...prev, [name]: value }));
    }, []);

    const validate = (): string | null => {
        if (!form.name.trim()) return "이름은 필수입니다.";
        if (!form.birth_date.trim()) return "생년월일은 필수입니다.";
        return null;
    };

    const handleSubmit = useCallback(async () => {
        console.log("🔥 handleSubmit called");
        setError(null);
        const err = validate();
        if (err) {
            console.log("🔥 validation error:", err);
            setAlertMsg(err);
            setAlertType("error");
            setShowAlert(true);
            return;
        }
        console.log("🔥 createStudent 호출", form);
        await createStudent(form);
        if (error) {
            console.log("🔥 error 발생:", error);
            setAlertMsg(error);
            setAlertType("error");
            setShowAlert(true);
        }
    }, [form, createStudent, error, setError]);

    useEffect(() => {
        if (showAlert) {
            console.log("🔥 AlertModal showAlert:", alertMsg, alertType);
        }
    }, [showAlert, alertMsg, alertType]);

    const handleAlertClose = () => {
        setShowAlert(false);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;
    console.log("🔥 StudentsAddModal 렌더링됨, isOpen:", isOpen);

    return (
        <>
            <SubmitModal
                isOpen={isOpen}
                onClose={onClose}
                modalType="submit"
                modalTitle="새 학생 등록"
                modalDescription="학생 정보를 입력 후 등록 버튼을 눌러주세요."
                modalSize="small"
                onSubmit={handleSubmit}
                onSave={() => { }}
            >
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium mb-1">이름<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            maxLength={20}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">생년월일<span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            name="birth_date"
                            value={form.birth_date}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">휴대폰번호</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={form.phone_number}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            maxLength={20}
                            placeholder="010-0000-0000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">성별</label>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">선택</option>
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">현재 학교명</label>
                        <input
                            type="text"
                            name="current_school_name"
                            value={form.current_school_name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            maxLength={40}
                        />
                    </div>
                </form>
            </SubmitModal>
            <AlertModal
                open={showAlert}
                onClose={handleAlertClose}
                message={alertMsg}
                type={alertType}
            />
        </>
    );
}
