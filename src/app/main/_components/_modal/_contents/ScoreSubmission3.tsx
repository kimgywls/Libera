import { useState } from "react";
import StudentInfoForm from "../../form/StudentInfoForm";
import { ScoreSubmissionData, ScoreRowData } from "@/app/types/scores";
import ScoreSubmission3Table from "./ScoreSubmission3Table";

interface ScoreSubmission3Props {
    contact: string;
    studentName: string;
    onDataChange?: (data: ScoreSubmissionData, isValid: boolean) => void;
    initialScores?: ScoreRowData[];
}

export default function ScoreSubmission3({
    contact,
    studentName,
    onDataChange,
    initialScores,
}: ScoreSubmission3Props) {
    const [formData, setFormData] = useState({
        studentName: studentName || "",
        contact: contact || "",
    });

    const [tableData, setTableData] = useState<ScoreRowData[]>(initialScores || []);

    const isDataValid = (form: typeof formData) => {
        return form.studentName.trim() !== "" && form.contact.trim() !== "";
    };

    const handleStudentNameChange = (name: string) => {
        const next = { ...formData, studentName: name };
        setFormData(next);
        onDataChange?.({ type: "table", data: { ...next, rows: tableData } }, isDataValid(next));
    };

    const handleContactChange = (contact: string) => {
        const next = { ...formData, contact };
        setFormData(next);
        onDataChange?.({ type: "table", data: { ...next, rows: tableData } }, isDataValid(next));
    };

    const handleTableChange = (rows: ScoreRowData[]) => {
        setTableData(rows);
        onDataChange?.({ type: "table", data: { ...formData, rows } }, isDataValid(formData));
    };

    return (
        <div className="space-y-6">
            <StudentInfoForm
                studentName={formData.studentName}
                contact={formData.contact}
                onStudentNameChange={handleStudentNameChange}
                onContactChange={handleContactChange}
            />
            <ScoreSubmission3Table
                onDataChange={handleTableChange}
                initialScores={initialScores}
            />
        </div>
    );
}