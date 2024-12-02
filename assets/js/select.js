export default function select() {
    document.querySelectorAll('.custom-select').forEach(select => {
        const selected = select.querySelector('.custom-select__selected');
        const options = select.querySelector('.custom-select__options');

        selected.addEventListener('click', () => {
            select.classList.toggle('custom-select--open');
        });

        options.addEventListener('click', (event) => {
            if (event.target.classList.contains('custom-select__option')) {
                selected.textContent = event.target.textContent;
                select.classList.remove('custom-select--open');
            }
        });

        document.addEventListener('click', (event) => {
            if (!select.contains(event.target)) {
                select.classList.remove('custom-select--open');
            }
        });
    });
}
