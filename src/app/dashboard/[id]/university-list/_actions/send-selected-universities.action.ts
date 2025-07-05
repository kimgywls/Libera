'use server';
import { SelectedUniversityPayload } from '@/app/types/university';

export async function sendSelectedUniversitiesAction(payload: SelectedUniversityPayload) {
    // TODO: 실제 백엔드 엔드포인트로 변경 필요
    const res = await fetch('https://your-backend-endpoint/api/selected-universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        // credentials, authorization 등 필요시 추가
    });
    if (!res.ok) throw new Error('전송 실패');
    return res.json();
} 