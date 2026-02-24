import type { MenuId } from '@/content/menus';

export type BookingRequest = {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    people: number;
    menuId: MenuId;
    allergies: string;
    message: string;
    consent: boolean;
    bot: string;
};
