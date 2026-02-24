import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BookingFormInput } from '@/features/booking/model/booking.schema';

type Props = {
    register: UseFormRegister<BookingFormInput>;
    errors: FieldErrors<BookingFormInput>;
};

export default function BookingConsent({ register, errors }: Props) {
    return (
        <>
            <div className="md:col-span-2 flex items-start gap-3">
                <input
                    id="consent"
                    type="checkbox"
                    className="mt-1"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'err-consent' : undefined}
                    {...register('consent')}
                />
                <label htmlFor="consent" className="text-sm text-muted-foreground">
                    J’accepte que mes informations soient utilisées pour traiter ma demande de réservation.
                </label>
            </div>
            {errors.consent && (
                <p id="err-consent" className="md:col-span-2 text-sm text-red-400">
                    {errors.consent.message}
                </p>
            )}
        </>
    );
}
