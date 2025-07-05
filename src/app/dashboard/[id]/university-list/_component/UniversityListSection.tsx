import React, { useState, useMemo } from 'react';
import { University } from '@/app/types/university';
import UniversityTableSearchBar from './UniversityTableSearchBar';
import UniversityTableRegionFilter from './UniversityTableRegionFilter';
import UniversityTable from './UniversityTable';
import { useSendSelectedUniversities } from '../_hooks/use-send-selected-universities';
import { useModalState } from '@/app/hooks/useModalState';
import AlertModal from '@/app/components/modal/AlertModal';

const regions = ['서울', '경기', '인천', '강원', '충북', '충남', '대전', '세종', '전북', '전남', '광주', '경북', '경남', '대구', '울산', '부산', '제주'];

// University 타입에서 검색 가능한 필드만 추출
const searchableFields = [
    { label: '대학명', value: 'universityName' },
    { label: '전형', value: 'admissionType' },
    { label: '전형 구분', value: 'admissionCategory' },
    { label: '학과명', value: 'departmentName' },
    { label: '평가 비율', value: 'evaluationRatio' },
    { label: '2024 입결', value: 'entryScore2024' },
    { label: '2024 판정', value: 'judgement2024' },
    { label: '2025 입결', value: 'entryScore2025' },
    { label: '2025 판정', value: 'judgement2025' },
] as const;

interface UniversityListSectionProps {
    universityList: University[];
}

export default function UniversityListSection({ universityList }: UniversityListSectionProps) {
    if (!universityList) return null;

    const [searchInput, setSearchInput] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedUniversities, setSelectedUniversities] = useState<number[]>([]);
    const [showRegionFilter, setShowRegionFilter] = useState(false);
    const [searchField, setSearchField] = useState<string>(searchableFields[0].value);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState<'success' | 'error'>('success');
    const { modalStates, openModal, closeModal } = useModalState();

    // 제출 훅
    const { send, loading: submitLoading } = useSendSelectedUniversities();

    // 필터링된 대학 목록
    const filteredUniversities = useMemo(() => {
        return universityList.filter((university) => {
            const value = university[searchField as keyof University] ?? '';
            const matchesSearch = value.toString().toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(university.region);
            return matchesSearch && matchesRegion;
        });
    }, [universityList, searchTerm, selectedRegions, searchField]);

    // 지역 선택 토글
    const toggleRegion = (region: string) => {
        setSelectedRegions(prev =>
            prev.includes(region)
                ? prev.filter(r => r !== region)
                : [...prev, region]
        );
    };

    // 대학 선택 토글
    const toggleUniversity = (universityIdx: number) => {
        setSelectedUniversities(prev =>
            prev.includes(universityIdx)
                ? prev.filter(id => id !== universityIdx)
                : [...prev, universityIdx]
        );
    };

    // 전체 선택/해제
    const toggleSelectAll = () => {
        if (selectedUniversities.length === filteredUniversities.length) {
            setSelectedUniversities([]);
        } else {
            setSelectedUniversities(filteredUniversities.map((_, idx) => idx));
        }
    };

    // 선택된 대학 제출
    const handleExtractSelected = async () => {
        const selectedData = filteredUniversities.filter((_, idx) => selectedUniversities.includes(idx));
        try {
            await send({ universities: selectedData as University[] });
            setModalMessage(`${selectedData.length}개 대학이 성공적으로 제출되었습니다.`);
            setModalType('success');
            openModal('alert');
        } catch (e) {
            setModalMessage('제출에 실패했습니다.');
            setModalType('error');
            openModal('alert');
        }
    };

    // 지역 필터 초기화
    const clearRegionFilter = () => {
        setSelectedRegions([]);
    };

    // 검색 실행 함수
    const handleSearch = () => {
        setSearchTerm(searchInput);
    };

    // 엔터 입력 시 검색
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-h-[600px] my-4 ">
            {/* 헤더 */}
            <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center w-full justify-between gap-4">
                    {/* 검색바 */}
                    <UniversityTableSearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        handleInputKeyDown={handleInputKeyDown}
                        searchField={searchField}
                        setSearchField={setSearchField}
                        handleSearch={handleSearch}
                        searchFields={searchableFields as any}
                    />
                    {/* 지역 필터 및 제출 버튼 */}
                    <div className="flex items-center gap-2">
                        <UniversityTableRegionFilter
                            selectedRegions={selectedRegions}
                            setShowRegionFilter={setShowRegionFilter}
                            showRegionFilter={showRegionFilter}
                            regions={regions}
                            toggleRegion={toggleRegion}
                            clearRegionFilter={clearRegionFilter}
                        />
                        <button
                            onClick={handleExtractSelected}
                            disabled={selectedUniversities.length === 0 || submitLoading}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${selectedUniversities.length > 0 && !submitLoading
                                ? 'bg-violet-600 text-white hover:bg-violet-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <span>({selectedUniversities.length}) 개의 학교 선택</span>
                            {submitLoading && <span className="ml-2">제출 중...</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* 테이블 */}
            <UniversityTable
                universityList={filteredUniversities}
                selectedUniversities={selectedUniversities}
                setSelectedUniversities={setSelectedUniversities}
            />

            {/* 푸터 정보 */}
            <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>총 {filteredUniversities.length}개 대학</span>

                </div>
            </div>

            <AlertModal
                open={modalStates['alert']}
                onClose={() => closeModal('alert')}
                message={modalMessage}
                type={modalType}
            />
        </div>
    );
}