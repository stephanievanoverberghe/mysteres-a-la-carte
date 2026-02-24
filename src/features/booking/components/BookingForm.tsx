'use client';
import {
  type BookingFormInput,
  bookingFormSchema,
  type BookingFormValues,
} from '@/features/booking/model/booking.schema';
import { BOOKING_DEFAULT_VALUES } from '@/features/booking/model/booking.constants';
import BookingActions from '@/features/booking/components/BookingActions';
import BookingConsent from '@/features/booking/components/BookingConsent';
import BookingFields from '@/features/booking/components/BookingFields';
import BookingSuccess from '@/features/booking/components/BookingSuccess';
import ScrollReveal from '@/shared/ui/fx/ScrollReveal';
import SectionDivider from '@/shared/ui/SectionDivider';
import SectionTitle from '@/shared/ui/SectionTitle';
import { useBookingSubmission } from '@/features/booking/hooks/useBookingSubmission';
import { useForm } from 'react-hook-form';
import { useToast } from '@/shared/ui/fx/ToastProvider';
import { zodResolver } from '@hookform/resolvers/zod';

export default function BookingForm() {
  const { success, error } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormInput, unknown, BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: BOOKING_DEFAULT_VALUES,
  });

  const errorCount = Object.keys(errors).length;

  const { loading, status, openSuccess, setOpenSuccess, lastSubmission, submit } =
    useBookingSubmission({
      onSuccess: success,
      onError: error,
      reset,
    });

  return (
    <section
      id="reserver"
      aria-labelledby="reserver-title"
      className="relative md:py-24 py-14 bg-muted/30"
    >
      <div className="container">
        <div className="md:mx-8 lg:mx-0">
          <div className="max-w-2xl">
            <ScrollReveal>
              <SectionTitle id="reserver-title">Réserver</SectionTitle>
            </ScrollReveal>
            <p className="mt-3 text-muted-foreground">
              Envoyez une demande — nous confirmons par email sous 24&nbsp;h ouvrées.
            </p>
          </div>

          <SectionDivider />

          <form
            onSubmit={handleSubmit(submit)}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
            noValidate
          >
            <p role="alert" aria-live="assertive" className="sr-only">
              {errorCount > 0
                ? `Le formulaire contient ${errorCount} erreur${errorCount > 1 ? 's' : ''}.`
                : ''}
            </p>
            <fieldset className="contents" disabled={loading}>
              <BookingFields register={register} errors={errors} />
              <BookingConsent register={register} errors={errors} />
              <BookingActions loading={loading} status={status} />
            </fieldset>
          </form>
        </div>
      </div>

      <BookingSuccess
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        name={lastSubmission.name}
        people={lastSubmission.people}
        date={lastSubmission.date}
        time={lastSubmission.time}
      />
    </section>
  );
}
