export type MenuId = 'carn-hivor' | 'botanique' | 'evasion' | 'aventure-gourmande';

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
};

export type BookingSubmission = BookingRequest & {
    consent: boolean;
    bot: string;
};
