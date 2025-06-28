"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student } from '@/app/types/students';

interface StudentContextType {
    selectedStudent: Student | null;
    setSelectedStudent: (student: Student | null) => void;
    clearSelectedStudent: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const clearSelectedStudent = () => {
        setSelectedStudent(null);
    };

    return (
        <StudentContext.Provider value={{
            selectedStudent,
            setSelectedStudent,
            clearSelectedStudent,
        }}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudentContext() {
    const context = useContext(StudentContext);
    if (context === undefined) {
        throw new Error('useStudentContext must be used within a StudentProvider');
    }
    return context;
} 