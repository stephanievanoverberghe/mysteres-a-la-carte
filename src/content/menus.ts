export const MENUS = [
    {
        id: 'carn-hivor',
        title: 'Carn Hivor',
        price: 60,
        desc: 'Parcours carné, indices fumés & textures franches.',
        tags: ['carné', 'signature'],
        image: '/menu/carn-hivor.webp',
    },
    {
        id: 'botanique',
        title: 'Botanique',
        price: 50,
        desc: 'Épopée végétale, herbes fines & révélations florales.',
        tags: ['végétarien'],
        image: '/menu/botanique.webp',
    },
    {
        id: 'evasion',
        title: 'Évasion',
        price: 50,
        desc: 'Allergies & restrictions prises en compte.',
        tags: ['ajusté'],
        image: '/menu/evasion.webp',
    },
    {
        id: 'aventure-gourmande',
        title: 'Aventure gourmande (enfants)',
        price: 30,
        desc: 'Mystère ludique aux saveurs douces, dès 8 ans.',
        tags: ['kids'],
        image: '/menu/aventure.webp',
    },
] as const;

export type MenuId = (typeof MENUS)[number]['id'];

export const MENU_IDS = MENUS.map((menu) => menu.id) as [MenuId, ...MenuId[]];
