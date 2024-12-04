export default function tabs() {
    const pricesTabs = document.querySelectorAll('.default_tab');
    const blockTabs = document.querySelectorAll('.block_tab');

    pricesTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            document.querySelector('.default_tab-active')?.classList.remove('default_tab-active');
            document.querySelector('.block_tab-active')?.classList.remove('block_tab-active');

            tab.classList.add('default_tab-active');
            blockTabs[index].classList.add('block_tab-active');
        });
    });
}