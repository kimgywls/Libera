export interface StudentRecommendedUniversityList {
    studentId: string;
    universityList: University[];
}

export interface University {
    region: string;
    universityName: string;
    admissionType: string;
    admissionCategory: string;
    departmentName: string;
    evaluationRatio: string;
    entryScore2024: string;
    judgement2024: string;
    entryScore2025: string;
    judgement2025: string;
}

export interface SelectedUniversityPayload {
    universities: University[];
}