import { Filter, X } from 'lucide-react';
import React from 'react';

interface UniversityTableRegionFilterProps {
    selectedRegions: string[];
    setShowRegionFilter: (v: boolean) => void;
    showRegionFilter: boolean;
    regions: string[];
    toggleRegion: (region: string) => void;
    clearRegionFilter: () => void;
}

export default function UniversityTableRegionFilter({
    selectedRegions,
    setShowRegionFilter,
    showRegionFilter,
    regions,
    toggleRegion,
    clearRegionFilter,
}: UniversityTableRegionFilterProps) {
    return (
        <div className="flex-shrink-0">
            <div className="relative">
                <button
                    onClick={() => setShowRegionFilter(!showRegionFilter)}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${selectedRegions.length > 0
                        ? 'bg-violet-50 border-violet-300 text-violet-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    <span>지역 {selectedRegions.length > 0 && `(${selectedRegions.length})`}</span>
                </button>
                {showRegionFilter && (
                    <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-80 max-h-96 overflow-y-auto">
                        <div className="p-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900">지역 선택</h3>
                                <div className='flex items-center space-x-3'>
                                    <button
                                        onClick={clearRegionFilter}
                                        className="text-sm text-gray-500 hover:text-indigo-600 cursor-pointer"
                                    >
                                        초기화
                                    </button>
                                    <button onClick={() => setShowRegionFilter(false)}><X className="w-4 h-4 text-gray-600 hover:text-indigo-600 cursor-pointer" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 grid grid-cols-3 gap-2">
                            {regions.map(region => (
                                <label key={region} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedRegions.includes(region)}
                                        onChange={() => toggleRegion(region)}
                                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                    />
                                    <span className="text-sm text-gray-700">{region}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 