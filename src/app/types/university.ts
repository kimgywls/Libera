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

export interface SearchRecommendedUniversityListParams {
    student_id: number | string;
    regions?: string[];
    departments?: string[];
    universities?: string[];
    entrance_types?: string[];
    limit?: number;
}

export interface SearchRecommendedUniversityListResponse {
    success: boolean;
    total: number;
    universities: University[];
}

export interface UniversityRecommendation {
    university_name: string;
    region: string;
    admission_type: string;
    admission_category: string;
    department_name: string;
    evaluation_ratio: string;
    entry_score_2024: string;
    judgement_2024: string;
    entry_score_2025: string;
    judgement_2025: string;
}

export interface DepartmentRecommendation {
    department_name: string;
    priority: number;
    challenge: UniversityRecommendation[];
    suitable: UniversityRecommendation[];
    safe: UniversityRecommendation[];
}

export interface FetchDepartmentRecommendationListResponse {
    student_id: number;
    student_name: string;
    student_grade: number;
    departments: DepartmentRecommendation[];
}