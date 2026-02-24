'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BookingSuccess from '@/features/booking/components/BookingSuccess';
import BookingFields from '@/features/booking/components/BookingFields';
import BookingConsent from '@/features/booking/components/BookingConsent';
import BookingActions from '@/features/booking/components/BookingActions';
import { useToast } from '@/shared/ui/fx/ToastProvider';
import ScrollReveal from '@/shared/ui/fx/ScrollReveal';
import SectionTitle from '@/shared/ui/SectionTitle';
import SectionDivider from '@/shared/ui/SectionDivider';

import { BOOKING_DEFAULT_VALUES } from '@/features/booking/model/booking.constants';
import { bookingFormSchema, type BookingFormInput, type BookingFormValues } from '@/features/booking/model/booking.schema';

export default function BookingForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [last, setLast] = useState<Partial<BookingFormValues>>({});
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

    const onSubmit = async (data: BookingFormValues) => {
        setStatus('loading');
        try {
            if (data.bot) {
                setStatus('success');
                setOpenSuccess(true);
                success('Demande envoyée', 'Nous confirmons sous 24 h ouvrées.');
                reset(BOOKING_DEFAULT_VALUES);
                return;
            }

            console.group('%c[Reservation DEMO]', 'color:#D4AF37;font-weight:bold;');
            console.table({ Nom: data.name, Email: data.email, Téléphone: data.phone, Date: data.date, Heure: data.time, Personnes: data.people, Menu: data.menuId });
            if (data.allergies) console.log('Allergies:', data.allergies);
            if (data.message) console.log('Message:', data.message);
            console.groupEnd();

            await new Promise((r) => setTimeout(r, 600));

            setLast({ name: data.name, people: data.people, date: data.date, time: data.time });
            setStatus('success');
            setOpenSuccess(true);
            success('Demande envoyée', 'Nous confirmons sous 24 h ouvrées.');
            reset(BOOKING_DEFAULT_VALUES);
        } catch {
            setStatus('error');
            error('Échec de l’envoi', 'Réessayez dans un instant.');
        }
    };

    const loading = status === 'loading';

    return (
        <section id="reserver" aria-labelledby="reserver-title" className="relative md:py-24 py-14 bg-muted/30">
            <div className="container">
                <div className="md:mx-8 lg:mx-0">
                    <div className="max-w-2xl">
                        <ScrollReveal>
                            <SectionTitle id="reserver-title">Réserver</SectionTitle>
                        </ScrollReveal>
                        <p className="mt-3 text-muted-foreground">Envoyez une demande — nous confirmons par email sous 24&nbsp;h ouvrées.</p>
                    </div>

                    <SectionDivider />

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
                        <fieldset className="contents" disabled={loading}>
                            <BookingFields register={register} errors={errors} />
                            <BookingConsent register={register} errors={errors} />
                            <BookingActions loading={loading} status={status} />
                        </fieldset>
                    </form>
                </div>
            </div>

            <BookingSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} name={last.name} people={last.people} date={last.date} time={last.time} />
        </section>
    );
}
