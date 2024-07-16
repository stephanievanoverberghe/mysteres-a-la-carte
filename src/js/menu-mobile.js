const menu = document.querySelector('#menu');
const menuTrigger = document.querySelector('#menuTrigger');
const menuTriggerIcons = menuTrigger.querySelectorAll('.menu__icon');

const toggleMenu = () => {
    if (menu.classList.contains('menu__visible')) {
        closeMenu();
    } else {
        openMenu();
    }
};

const openMenu = () => {
    menu.classList.add('menu__visible');
    toggleMenuIcons(true);
    document.addEventListener('click', closeMenuOnClickOutside);
};

const closeMenu = () => {
    menu.classList.remove('menu__visible');
    toggleMenuIcons(false);
    document.removeEventListener('click', closeMenuOnClickOutside);
};

const toggleMenuIcons = (isOpen) => {
    menuTriggerIcons[0].classList.toggle('icon__hidden', isOpen);
    menuTriggerIcons[0].classList.toggle('icon__visible', !isOpen);
    menuTriggerIcons[1].classList.toggle('icon__hidden', !isOpen);
    menuTriggerIcons[1].classList.toggle('icon__visible', isOpen);
};

const closeMenuOnClickOutside = (event) => {
    if (!menu.contains(event.target) && !menuTrigger.contains(event.target)) {
        closeMenu();
    }
};

menuTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1050) {
        closeMenu();
    }
});
