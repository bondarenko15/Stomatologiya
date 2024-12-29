import openHide from './openHide.min.js';
import select from './select.min.js';
import tabs from './tabs.min.js';
import slider from './slider.min.js';
import validateForm from './validate.min.js';


validateForm()
tabs()
openHide();
select();
slider();



const fancybox = document.querySelector('[data-fancybox]') || null;
if (fancybox) {
    Fancybox.bind('[data-fancybox]', {
        groupAll: true,
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const topIcon = document.querySelector('.top_icon');

    if (!topIcon) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 2000) {
            topIcon.classList.add('top_iconVisible');
        } else {
            topIcon.classList.remove('top_iconVisible');
        }
    });
    topIcon.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});









