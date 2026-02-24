import { MENUS } from '@/content/menus';
import type { BookingFormInput } from './booking.schema';

const DEFAULT_MENU_ID = MENUS.at(0)?.id ?? 'carn-hivor';

export const BOOKING_DEFAULT_VALUES: BookingFormInput = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    people: 2,
    menuId: DEFAULT_MENU_ID,
    allergies: '',
    message: '',
    consent: false,
    bot: '',
};
