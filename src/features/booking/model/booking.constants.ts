import { MENUS } from '@/content/menus';
import type { BookingFormInput } from './booking.schema';

export const BOOKING_DEFAULT_VALUES: BookingFormInput = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    people: 2,
    menuId: MENUS[0].id,
    allergies: '',
    message: '',
    consent: false,
    bot: '',
};
