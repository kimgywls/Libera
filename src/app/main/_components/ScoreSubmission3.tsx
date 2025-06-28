"use client";

import { useState, useEffect, useCallback } from "react";
import StudentInfoForm from "./StudentInfoForm";
import { FormSubmissionData } from "@/app/types/scores";
import ScoreSubmission3Table from "./ScoreSubmission3Table";

interface ScoreSubmission3Props {
    contact: string;
    studentName: string;
    onDataChange?: (data: FormSubmissionData, isValid: boolean) => void;
}

const subjects = [
    { key: "korean", label: "국어", required: true },
    { key: "math", label: "수학", required: true },
    { key: "english", label: "영어", required: true },
    { key: "science", label: "과학", required: false },
    { key: "social", label: "사회", required: false },
    { key: "history", label: "한국사", required: false },
] as const;

export default function ScoreSubmission3({
    contact,
    studentName,
    onDataChange,
}: ScoreSubmission3Props) {
    const [formData, setFormData] = useState({
        studentName: studentName || "",
        contact: contact || "",
    });

    const [gradeData, setGradeData] = useState<Record<string, string>>(() =>
        Object.fromEntries(subjects.map((s) => [s.key, ""]))
    );

    const isDataValid = useCallback(() => {
        const hasRequired = subjects
            .filter((s) => s.required)
            .every((s) => gradeData[s.key] !== "");

        return (
            formData.studentName.trim() !== "" &&
            formData.contact.trim() !== "" &&
            hasRequired
        );
    }, [formData, gradeData]);

    useEffect(() => {
        const data: FormSubmissionData = {
            studentName: formData.studentName,
            contact: formData.contact,
            ...gradeData,
        };
        onDataChange?.(data, isDataValid());
    }, [formData, gradeData, onDataChange, isDataValid]);

    return (
        <div className="space-y-6">
            <StudentInfoForm
                studentName={formData.studentName}
                contact={formData.contact}
                onStudentNameChange={(name) =>
                    setFormData((prev) => ({ ...prev, studentName: name }))
                }
                onContactChange={(contact) =>
                    setFormData((prev) => ({ ...prev, contact }))
                }
            />
            <ScoreSubmission3Table />
        </div>
    );
}
