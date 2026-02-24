import { z } from 'zod';
import { MENU_IDS } from '@/content/menus';

export const bookingFormSchema = z.object({
    name: z.string().min(2, 'Nom requis'),
    email: z.string().email('Email invalide'),
    phone: z.string().min(6, 'Téléphone requis'),
    date: z.string().min(1, 'Date requise'),
    time: z.string().min(1, 'Heure requise'),
    people: z.coerce.number().int().min(1, 'Min 1').max(8, 'Max 8'),
    menuId: z.enum(MENU_IDS),
    allergies: z.string().max(600).default(''),
    message: z.string().max(800).default(''),
    consent: z.boolean().refine((v) => v === true, { message: 'Consentement requis' }),
    bot: z.string().max(0).default(''),
});

export type BookingFormValues = z.output<typeof bookingFormSchema>;
export type BookingFormInput = z.input<typeof bookingFormSchema>;
