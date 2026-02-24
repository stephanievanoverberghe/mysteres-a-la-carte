'use client';

import type { BookingFormInput, BookingFormValues } from '@/features/booking/model/booking.schema';
import { useCallback, useState } from 'react';
import { BOOKING_DEFAULT_VALUES } from '@/features/booking/model/booking.constants';
import { isClientDebugEnabled } from '@/shared/lib/config/env';

type BookingStatus = 'idle' | 'loading' | 'success' | 'error';

type UseBookingSubmissionParams = {
  onSuccess: (_title: string, _message: string) => void;
  onError: (_title: string, _message: string) => void;
  reset: (_values: BookingFormInput) => void;
};

export function useBookingSubmission({ onSuccess, onError, reset }: UseBookingSubmissionParams) {
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<Partial<BookingFormValues>>({});
  const shouldLogSubmission = isClientDebugEnabled('NEXT_PUBLIC_ENABLE_BOOKING_DEBUG_LOGS');

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

        if (shouldLogSubmission) {
          console.warn('[Reservation DEMO]', {
            nom: data.name,
            email: data.email,
            telephone: data.phone,
            date: data.date,
            heure: data.time,
            personnes: data.people,
            menu: data.menuId,
          });
          if (data.allergies) console.warn('Allergies:', data.allergies);
          if (data.message) console.warn('Message:', data.message);
        }

        await new Promise((resolve) => setTimeout(resolve, 600));

        setLastSubmission({
          name: data.name,
          people: data.people,
          date: data.date,
          time: data.time,
        });
        setStatus('success');
        setOpenSuccess(true);
        onSuccess('Demande envoyée', 'Nous confirmons sous 24 h ouvrées.');
        reset(BOOKING_DEFAULT_VALUES);
      } catch {
        setStatus('error');
        onError('Échec de l’envoi', 'Réessayez dans un instant.');
      }
    },
    [onError, onSuccess, reset, shouldLogSubmission],
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
