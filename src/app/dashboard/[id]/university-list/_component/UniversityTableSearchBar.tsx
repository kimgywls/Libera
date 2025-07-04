import { Search } from 'lucide-react';
import React from 'react';

interface UniversityTableSearchBarProps {
    searchInput: string;
    setSearchInput: (v: string) => void;
    handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    searchField: string;
    setSearchField: (v: string) => void;
    handleSearch: () => void;
    searchFields: { label: string; value: string }[];
}

export default function UniversityTableSearchBar({
    searchInput,
    setSearchInput,
    handleInputKeyDown,
    searchField,
    setSearchField,
    handleSearch,
    searchFields,
}: UniversityTableSearchBarProps) {
    return (
        <div className="flex flex-row space-x-2 items-center w-1/2 max-w-xl">
            <select
                className="border border-gray-300 rounded-lg py-2 px-2 text-gray-700 focus:ring-violet-500 focus:border-violet-500"
                value={searchField}
                onChange={e => setSearchField(e.target.value)}
            >
                {searchFields.map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                ))}
            </select>
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="검색어 입력..."
                    className="text-gray-700 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-full"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <button
                className="p-3 bg-white rounded-full text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors whitespace-nowrap"
                onClick={handleSearch}
            >
                <Search className=" w-6 h-6 " />
            </button>
        </div>
    );
} 