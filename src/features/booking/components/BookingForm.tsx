'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BookingSuccess from '@/features/booking/components/BookingSuccess';
import { MENUS } from '@/content/menus';
import { useToast } from '@/shared/ui/fx/ToastProvider';
import ScrollReveal from '@/shared/ui/fx/ScrollReveal';

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
            // Honeypot: si rempli, on “réussit” silencieusement
            if (data.bot) {
                setStatus('success');
                setOpenSuccess(true);
                success('Demande envoyée', 'Nous confirmons sous 24 h ouvrées.');
                reset(BOOKING_DEFAULT_VALUES);
                return;
            }

            // LOG DEV — console navigateur
            console.group('%c[Reservation DEMO]', 'color:#D4AF37;font-weight:bold;');
            console.table({
                Nom: data.name,
                Email: data.email,
                Téléphone: data.phone,
                Date: data.date,
                Heure: data.time,
                Personnes: data.people,
                Menu: data.menuId,
            });
            if (data.allergies) console.log('Allergies:', data.allergies);
            if (data.message) console.log('Message:', data.message);
            console.groupEnd();

            // Latence simulée
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
                            <h2 id="reserver-title" className="text-3xl md:text-4xl font-semibold">
                                Réserver
                            </h2>
                        </ScrollReveal>
                        <p className="mt-3 text-muted-foreground">Envoyez une demande — nous confirmons par email sous 24&nbsp;h ouvrées.</p>
                    </div>

                    <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
                        <fieldset className="contents" disabled={loading}>
                            {/* honeypot : ne pas retirer la classe sr-only */}
                            <label htmlFor="bot" className="sr-only">
                                Ne pas remplir
                            </label>
                            <input id="bot" type="text" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" {...register('bot')} />

                            {/* Nom */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Nom</label>
                                <input
                                    id="name"
                                    autoComplete="name"
                                    className="rounded-xl border border-muted bg-background/60 px-3 py-2"
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? 'err-name' : undefined}
                                    {...register('name')}
                                />
                                {errors.name && (
                                    <p id="err-name" className="text-sm text-red-400">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className="rounded-xl border border-muted bg-background/60 px-3 py-2"
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'err-email' : undefined}
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p id="err-email" className="text-sm text-red-400">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Téléphone */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone">Téléphone</label>
                                <input
                                    id="phone"
                                    autoComplete="tel"
                                    className="rounded-xl border border-muted bg-background/60 px-3 py-2"
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                                    {...register('phone')}
                                />
                                {errors.phone && (
                                    <p id="err-phone" className="text-sm text-red-400">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            {/* Date / Heure */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="date">Date</label>
                                    <input
                                        id="date"
                                        type="date"
                                        className="rounded-xl border border-muted bg-background/60 px-3 py-2"
                                        aria-invalid={!!errors.date}
                                        aria-describedby={errors.date ? 'err-date' : undefined}
                                        {...register('date')}
                                    />
                                    {errors.date && (
                                        <p id="err-date" className="text-sm text-red-400">
                                            {errors.date.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="time">Heure</label>
                                    <input
                                        id="time"
                                        type="time"
                                        className="rounded-xl border border-muted bg-background/60 px-3 py-2"
                                        aria-invalid={!!errors.time}
                                        aria-describedby={errors.time ? 'err-time' : undefined}
                                        {...register('time')}
                                    />
                                    {errors.time && (
                                        <p id="err-time" className="text-sm text-red-400">
                                            {errors.time.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Personnes */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="people">Nombre de personnes</label>
                                <input
                                    id="people"
                                    type="number"
                                    min={1}
                                    max={8}
                                    className="rounded-xl border border-muted bg-background/60 px-3 py-2"
                                    aria-invalid={!!errors.people}
                                    aria-describedby={errors.people ? 'err-people' : undefined}
                                    {...register('people', { setValueAs: (value) => Number(value) || 0 })}
                                />
                                {errors.people && (
                                    <p id="err-people" className="text-sm text-red-400">
                                        {errors.people.message}
                                    </p>
                                )}
                            </div>

                            {/* Menu */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="menuId">Menu</label>
                                <select
                                    id="menuId"
                                    className="rounded-xl border border-muted bg-background/60 px-3 py-2"
                                    aria-invalid={!!errors.menuId}
                                    aria-describedby={errors.menuId ? 'err-menu' : undefined}
                                    {...register('menuId')}
                                >
                                    {MENUS.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.title} — {m.price}€
                                        </option>
                                    ))}
                                </select>
                                {errors.menuId && (
                                    <p id="err-menu" className="text-sm text-red-400">
                                        {errors.menuId.message}
                                    </p>
                                )}
                            </div>

                            {/* Allergies / Message */}
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="allergies">Allergies / restrictions</label>
                                    <textarea id="allergies" className="rounded-xl border border-muted bg-background/60 px-3 py-2 min-h-[96px]" {...register('allergies')} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" className="rounded-xl border border-muted bg-background/60 px-3 py-2 min-h-[96px]" {...register('message')} />
                                </div>
                            </div>

                            {/* RGPD consent */}
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

                            {/* Actions */}
                            <div className="md:col-span-2">
                                <button className="btn" type="submit" disabled={loading}>
                                    {loading ? 'Envoi…' : 'Envoyer la demande'}
                                </button>
                                <span className="ml-4 text-sm" aria-live="polite">
                                    {status === 'error' && <span className="text-red-400">Oups, réessayez dans un instant.</span>}
                                </span>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

            {/* overlay de succès */}
            <BookingSuccess open={openSuccess} onClose={() => setOpenSuccess(false)} name={last.name} people={last.people} date={last.date} time={last.time} />
        </section>
    );
}
