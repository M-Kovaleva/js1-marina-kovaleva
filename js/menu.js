const burger = document.querySelector('.ham-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.menu-overlay');

if (burger) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
    });
}

if (overlay) {
    overlay.addEventListener('click', closeMenu);
}

const closeBtn = document.querySelector('.menu-close');

if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
}

function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
}
