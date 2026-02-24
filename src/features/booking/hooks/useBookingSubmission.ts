'use client';

import { useCallback, useState } from 'react';
import { BOOKING_DEFAULT_VALUES } from '@/features/booking/model/booking.constants';
import type { BookingFormInput, BookingFormValues } from '@/features/booking/model/booking.schema';

type BookingStatus = 'idle' | 'loading' | 'success' | 'error';

type UseBookingSubmissionParams = {
    onSuccess: (title: string, message: string) => void;
    onError: (title: string, message: string) => void;
    reset: (values: BookingFormInput) => void;
};

export function useBookingSubmission({ onSuccess, onError, reset }: UseBookingSubmissionParams) {
    const [status, setStatus] = useState<BookingStatus>('idle');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [lastSubmission, setLastSubmission] = useState<Partial<BookingFormValues>>({});

    const submit = useCallback(
        async (data: BookingFormValues) => {
            setStatus('loading');

            try {
                if (data.bot) {
                    setStatus('success');
                    setOpenSuccess(true);
                    onSuccess('Demande envoyée', 'Nous confirmons sous 24 h ouvrées.');
                    reset(BOOKING_DEFAULT_VALUES);
                    return;
                }

                console.group('%c[Reservation DEMO]', 'color:#D4AF37;font-weight:bold;');
                console.table({ Nom: data.name, Email: data.email, Téléphone: data.phone, Date: data.date, Heure: data.time, Personnes: data.people, Menu: data.menuId });
                if (data.allergies) console.log('Allergies:', data.allergies);
                if (data.message) console.log('Message:', data.message);
                console.groupEnd();

                await new Promise((resolve) => setTimeout(resolve, 600));

                setLastSubmission({ name: data.name, people: data.people, date: data.date, time: data.time });
                setStatus('success');
                setOpenSuccess(true);
                onSuccess('Demande envoyée', 'Nous confirmons sous 24 h ouvrées.');
                reset(BOOKING_DEFAULT_VALUES);
            } catch {
                setStatus('error');
                onError('Échec de l’envoi', 'Réessayez dans un instant.');
            }
        },
        [onError, onSuccess, reset],
    );

    return {
        loading: status === 'loading',
        openSuccess,
        setOpenSuccess,
        status,
        lastSubmission,
        submit,
    };
}
