import { useState } from 'react';
import { sendSelectedUniversitiesAction } from '../_actions/send-selected-universities.action';
import { SelectedUniversityPayload } from '@/app/types/university';

export function useSendSelectedUniversities() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function send(payload: SelectedUniversityPayload) {
        setLoading(true);
        setError(null);
        try {
            const result = await sendSelectedUniversitiesAction(payload);
            return result;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return { send, loading, error };
} 