import React from 'react';

interface UniversityTableJudgementTextProps {
    judgement: string;
}

export default function UniversityTableJudgementText({ judgement }: UniversityTableJudgementTextProps) {
    let colorClass = '';
    let text = judgement;
    if (judgement === '도전') {
        colorClass = 'text-red-600';
    } else if (judgement === '적정') {
        colorClass = 'text-blue-600';
    } else if (judgement === '안정') {
        colorClass = 'text-green-700';
    } else {
        colorClass = 'text-gray-500';
        text = '-';
    }
    return <span className={`font-bold ${colorClass}`}>{text}</span>;
} 