export default function openHide() {
    const languageContainer = document.querySelector('.language') || null;
    if (languageContainer) {
        const activeLang = languageContainer.querySelector('.active_lang img');
        const languageChange = languageContainer.querySelector('.language_change');

        activeLang.addEventListener('click', (e) => {
            languageChange.classList.toggle('change_active');
            e.stopPropagation();
        });

        document.addEventListener('click', (e) => {
            if (!languageContainer.contains(e.target)) {
                languageChange.classList.remove('change_active');
            }
        });
    }




    const subnavItems = document.querySelectorAll('.subnav_item') || null;
    if (subnavItems) {
        const sublinks = document.querySelectorAll('.block_sublink .sublink');
        let activeIndex = 0;

        sublinks.forEach((sublink, index) => {
            sublink.style.display = index === activeIndex ? 'block' : 'none';
        });

        subnavItems.forEach((item, index) => {
            item.addEventListener('mouseover', () => {
                activeIndex = index;
                sublinks.forEach((sublink, sublinkIndex) => {
                    sublink.style.display = sublinkIndex === activeIndex ? 'block' : 'none';
                });
            });
        });
    }



    const menuItems = document.querySelectorAll('.mobile_menu-nav li > span');
    const body = document.body;

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const submenu = item.nextElementSibling;

            if (submenu && submenu.tagName === 'UL') {
                const siblingSubmenus = Array.from(item.parentElement.parentElement.querySelectorAll('ul.active'));

                siblingSubmenus.forEach(siblingSubmenu => {
                    if (siblingSubmenu !== submenu) {
                        siblingSubmenu.classList.remove('active');
                        const siblingSpan = siblingSubmenu.previousElementSibling;
                        if (siblingSpan && siblingSpan.tagName === 'SPAN') {
                            siblingSpan.classList.remove('expanded');
                        }
                    }
                });

                submenu.classList.toggle('active');
                item.classList.toggle('expanded');

                const isAnyMenuActive = document.querySelectorAll('.mobile_menu-nav ul ul.active').length > 0;
                body.classList.toggle('no-scroll', isAnyMenuActive);
            }
        });
    });




    const burger = document.querySelector('.header_burger') || null;
    if (burger) {
        const menu = document.querySelector('.mobile_menu');
        const close = document.querySelector('.mobile_menu-close');

        if (!burger || !menu || !close) return;

        const toggleMenu = (isOpen) => {
            menu.classList.toggle('mobile_menu-active', isOpen);
            body.classList.toggle('no-scroll', isOpen);
        };

        burger.addEventListener('click', () => toggleMenu(true));

        close.addEventListener('click', () => toggleMenu(false));

        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !burger.contains(event.target)) {
                toggleMenu(false);
            }
        });
    }

    const sidevarMenu = document.querySelector('.service_sidebar') || null;
    if (sidevarMenu) {
        document.querySelectorAll('.service_sidebar-navigation > li > a').forEach((link) => {
            link.addEventListener('click', function (event) {
                const parentLi = this.parentElement;
                const subnav = parentLi.querySelector('.service_sidebar-subnav');
                if (subnav) {
                    event.preventDefault();
                    parentLi.classList.toggle('active');
                    document.querySelectorAll('.service_sidebar-subnav').forEach((otherSubnav) => {
                        if (otherSubnav !== subnav) {
                            otherSubnav.classList.remove('service_sidebar-subnav-active');
                        }
                    });
                    subnav.classList.toggle('service_sidebar-subnav-active');
                    document.querySelectorAll('.service_sidebar-navigation > li > a').forEach((otherLink) => {
                        if (otherLink !== this) {
                            otherLink.classList.remove('active');
                        }
                    });
                    this.classList.toggle('active');
                }
            });
        });
    }


    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function () {
            const faqItem = this.parentElement;
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            faqItem.classList.toggle('active');
        });
    });



    const mainImgBlock = document.querySelector('.main_img-block');
    const messengers = document.querySelector('.messengers');
    const footerWidgets = document.querySelector('.footer-widgets');

    if (mainImgBlock && messengers && footerWidgets) {
        mainImgBlock.addEventListener('click', (event) => {
            event.stopPropagation(); 
            messengers.classList.toggle('messengersActive');
            footerWidgets.classList.toggle('footer-widgetsActive');
        });
        document.addEventListener('click', (event) => {
            if (!footerWidgets.contains(event.target)) {
                messengers.classList.remove('messengersActive');
                footerWidgets.classList.remove('footer-widgetsActive');
            }
        });
    }



    document.querySelector('.active_lang').addEventListener('click', function () {
        const languageChange = document.querySelector('.language_change');
        if (languageChange) {
            languageChange.classList.add('language_changeShow');
        }
    });
}