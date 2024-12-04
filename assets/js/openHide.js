export default function openHide() {
    const languageContainer = document.querySelector('.language');
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




    const subnavItems = document.querySelectorAll('.subnav_item');
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



    document.addEventListener('DOMContentLoaded', () => {
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
    });

    document.addEventListener('DOMContentLoaded', () => {
        const burger = document.querySelector('.header_burger');
        const menu = document.querySelector('.mobile_menu');
        const close = document.querySelector('.mobile_menu-close');
        const body = document.body;

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
    });




    const modalOpenBtn = document.querySelectorAll('.btn_modalOpen');
    const modalForm = document.querySelector('.modal_form');
    const modalCloseBtn = document.querySelector('.modal_close');
    const modalWrapper = document.querySelector('.modal_wrapper');

    modalOpenBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            modalForm.classList.add('modal_form-open');
        });
    })

    

    modalCloseBtn.addEventListener('click', () => {
        modalForm.classList.remove('modal_form-open');
    });

    modalForm.addEventListener('click', (e) => {
        if (e.target === modalWrapper) {
            modalForm.classList.remove('modal_form-open');
        }
    });

}