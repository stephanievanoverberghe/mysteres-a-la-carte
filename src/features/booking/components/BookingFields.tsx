/* eslint-disable complexity */
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MENUS } from '@/content/menus';
import type { BookingFormInput } from '@/features/booking/model/booking.schema';

type Props = {
    register: UseFormRegister<BookingFormInput>;
    errors: FieldErrors<BookingFormInput>;
};

export default function BookingFields({ register, errors }: Props) {
    return (
        <>
            <label htmlFor="bot" className="sr-only">
                Ne pas remplir
            </label>
            <input id="bot" type="text" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" {...register('bot')} />

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
                    <p id="err-name" role="alert" aria-live="assertive" className="text-sm text-red-400">
                        {errors.name.message}
                    </p>
                )}
            </div>

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
                    <p id="err-email" role="alert" aria-live="assertive" className="text-sm text-red-400">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phone">Téléphone</label>
                <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className="rounded-xl border border-muted bg-background/60 px-3 py-2"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                    {...register('phone')}
                />
                {errors.phone && (
                    <p id="err-phone" role="alert" aria-live="assertive" className="text-sm text-red-400">
                        {errors.phone.message}
                    </p>
                )}
            </div>

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
                        <p id="err-date" role="alert" aria-live="assertive" className="text-sm text-red-400">
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
                        <p id="err-time" role="alert" aria-live="assertive" className="text-sm text-red-400">
                            {errors.time.message}
                        </p>
                    )}
                </div>
            </div>

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
                    <p id="err-people" role="alert" aria-live="assertive" className="text-sm text-red-400">
                        {errors.people.message}
                    </p>
                )}
            </div>

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
                    <p id="err-menu" role="alert" aria-live="assertive" className="text-sm text-red-400">
                        {errors.menuId.message}
                    </p>
                )}
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="allergies">Allergies / restrictions</label>
                    <textarea id="allergies" className="rounded-xl border border-muted bg-background/60 px-3 py-2 min-h-24" {...register('allergies')} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" className="rounded-xl border border-muted bg-background/60 px-3 py-2 min-h-24" {...register('message')} />
                </div>
            </div>
        </>
    );
}
