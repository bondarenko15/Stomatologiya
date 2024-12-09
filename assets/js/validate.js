export default function validateForm() {
    function handleContactForm(formSelector = '.form') {
        const forms = document.querySelectorAll(formSelector);

        if (forms) {
            forms.forEach(form => {
                const contactName = form.querySelector('[name="name"]');
                const contactPhone = form.querySelector('[name="phone"]');
                const contactEmail = form.querySelector('[name="mail"]');
                const contactMessage = form.querySelector('[name="textarea"]');
                const customSelect = form.querySelector('.custom-select');
                const namePage = form.querySelector('[name="page_name"]');
                const checkbox = form.querySelector('.custom-checkbox');

                document.querySelectorAll('[name="phone"]').forEach(input => {
                    const mask = new Inputmask("+38 (099) 999-99-99");
                    mask.mask(input);
                });

                form.addEventListener('submit', e => {
                    e.preventDefault();

                    let errors = [];
                    const formData = new FormData(form);

                    if (!checkEmptyField(contactName)) {
                        markErrorField(contactName);
                        errors.push('name');
                    } else if (!checkStringValidation(contactName)) {
                        markErrorField(contactName);
                        errors.push('name');
                    } else {
                        resetField(contactName);
                    }

                    if (!checkEmptyField(contactPhone)) {
                        markErrorField(contactPhone);
                        errors.push('phone');
                    } else if (!validatePhoneNumber(contactPhone)) {
                        markErrorField(contactPhone);
                        errors.push('phone');
                    } else {
                        resetField(contactPhone);
                    }

                    if (contactEmail && isFieldVisible(contactEmail)) {
                        if (!checkEmptyField(contactEmail)) {
                            markErrorField(contactEmail);
                            errors.push('email');
                        } else if (!checkEmailValidation(contactEmail)) {
                            markErrorField(contactEmail);
                            errors.push('email');
                        } else {
                            resetField(contactEmail);
                        }
                    }

                    if (customSelect && isFieldVisible(customSelect)) {
                        const selectedValue = customSelect.getAttribute("data-value") || "";
                        if (!selectedValue) {
                            errors.push("Выберите значение из списка");
                            markError(customSelect);
                        } else {
                            resetError(customSelect);
                            formData.append("custom_select", selectedValue);
                        }
                    }

                    if (!checkbox || !checkbox.checked) {
                        errors.push("Поле соглашения не отмечено");
                        markErrorField(checkbox);
                    } else {
                        resetField(checkbox);
                    }

                    if (!errors.length) {
                        const message = `---------------------------\n\r
Заявка прийшла з сторінки: ${namePage?.value || 'Не вказано'}\n\r
Ім'я користувача: ${contactName.value}\n\r
Телефон користувача: ${contactPhone.value}\n\r
Email: ${contactEmail?.value || 'Не вказано'}\n\r
Тип послуги: ${customSelect?.getAttribute("data-value") || 'Не вказано'}\n\r
Повідомлення користувача: ${contactMessage?.value || 'Не вказано'}\n\r
---------------------------`;

                        sendMessageToTelegram(token, chatId, message);

                        sendForm(formData, '/wp-admin/admin-ajax.php')
                            .then(response => {
                                if (response.status === 'SUCCESS') {
                                    clearForm(form);
                                    showSuccessModal();
                                } else {
                                    console.error(response.error);
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                });
            });
        }
    }

    function isFieldVisible(field) {
        return field && field.offsetParent !== null;
    }

    function checkEmptyField(field) {
        return field && field.value.trim().length > 0;
    }

    function checkStringValidation(field) {
        const regex = /^[a-zA-Zа-яА-Я'\- ]{2,50}$/;
        return regex.test(field.value.trim());
    }

    function checkEmailValidation(field) {
        const regex = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i;
        return regex.test(field.value.trim());
    }

    function validatePhoneNumber(field) {
        const regex = /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        return regex.test(field.value.trim());
    }

    function markErrorField(field) {
        field.classList.add('error');
    }

    function resetField(field) {
        field.classList.remove('error');
    }

    function clearForm(form) {
        form.reset();
        form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    }

    function showSuccessModal() {
        const modalPopUp = document.querySelector('.modal_form');
        if (modalPopUp) {
            modalPopUp.classList.add('isShow');
            const modalWrapper = document.querySelector('.wrapper_form');
            modalWrapper.style.display = 'none';

            const modalSuccess = document.querySelector('.modal_form .modal_thanks');
            modalSuccess.style.display = 'block';
        }
    }

    async function sendForm(formData, url) {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        return await response.json();
    }

    async function sendMessageToTelegram(token, chatId, message) {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const params = { chat_id: chatId, text: message };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
        } catch (error) {
            console.error('Ошибка отправки в Telegram:', error);
        }
    }

    const token = "7688977543:AAHlh-ypLSRkSZpJUWofjINHqtlYt6ib4Kg";
    const chatId = "-1002489103555";

    handleContactForm();

    const modalForm = document.querySelector('.modal_form') || null;
    if (modalForm) {
        const modalOpenBtn = document.querySelectorAll('.btn_modalOpen');
        const modalCloseBtn = document.querySelector('.modal_close');
        const modalWrapper = document.querySelector('.modal_wrapper');
        const modalOpenBtnTwo = document.querySelectorAll('.btn_modalIsOpen');

        modalOpenBtnTwo.forEach((button) => {
            button.addEventListener('click', () => {
                modalForm.classList.add('modal_form-openNarrow');
            });
        });

        modalOpenBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                modalForm.classList.add('modal_form-openWide');
            });
        });

        modalCloseBtn.addEventListener('click', () => {
            modalForm.classList.remove('modal_form-openWide');
            modalForm.classList.remove('modal_form-openNarrow');
            document.querySelectorAll('.form').forEach(clearForm);
        });

        modalForm.addEventListener('click', (e) => {
            if (!modalWrapper.contains(e.target)) {
                modalForm.classList.remove('modal_form-openWide');
                modalForm.classList.remove('modal_form-openNarrow');
                document.querySelectorAll('.form').forEach(clearForm);
            }
        });
    }
}
