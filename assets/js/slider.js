export default function slider() {
    const serviceSwiper = document.querySelectorAll('.service-swiper') || null;

    if (serviceSwiper) {
        serviceSwiper.forEach((newSwiper) => {
            const progressBar = newSwiper.querySelector('.swiper-progressbar');
            const nextButton = newSwiper.querySelector('.swiper-button-next');
            const prevButton = newSwiper.querySelector('.swiper-button-prev');

            if (newSwiper) {
                const serviceSlider = new Swiper(newSwiper, {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    loop: true,
                    on: {
                        slideChange: function () {
                            const progress = this.progress;
                            progressBar.style.width = `${progress * 100}%`;
                        },
                    },
                    navigation: {
                        nextEl: nextButton,
                        prevEl: prevButton,
                    },
                    pagination: {
                        el: progressBar,
                        type: 'progressbar',
                    },
                    breakpoints: {
                        1880: {
                            spaceBetween: 40,
                        },
                    },
                });
            }
        });
    }
}