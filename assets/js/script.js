import openHide from './openHide.min.js';
import select from './select.min.js';
import tabs from './tabs.min.js';
import slider from './slider.min.js';


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




