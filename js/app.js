jQuery(($) => {
    const $subscription_form = $('#subscription_form');
    if ($subscription_form) {
        const $name_input = $('#name');
        const $email_input = $('#email');
        $subscription_form.on('submit', (e) => {
            e.preventDefault();

            $('.input-error').remove();
            $name_input.removeClass('invalid');
            $email_input.removeClass('invalid');

            const $name_err = validateName($name_input.val());
            const $email_err = validateEmail($email_input.val());
            if ($name_err || $email_err) {
                if ($name_err) {
                    showError($name_err, $name_input);
                    $name_input.addClass('invalid');
                }
                if ($email_err) {
                    showError($email_err, $email_input);
                    $email_input.addClass('invalid');
                }
            } else {
                showFields($name_input.val(), $email_input.val());
            }

        });
    }
});

function showError(err, $input) {
    const $el = $(`<div class="input-error">${err}</div>`);
    $el.insertAfter($input);
}

function validateName(val) {
    let err = null;
    if (!val) {
        err = 'Введите имя';
    } else if(!/^[А-Яа-яіA-Za-z\s-]*$/.test(val)) {
        err = 'Имя должно состоять только с букв, пробелов или дефисов';
    } else if(val.length < 2 || val.length > 70) {
        err = 'Имя должно быть от 2 до 70 символов';
    }
    return err;
}

function validateEmail(email) {
    let err = null;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
        err = 'Введите Email';
    } else if (!re.test(email)) {
        err = 'Некорректный Email';
    }
    return err;
}

function showFields(name, email){
    let text = '';
    text += `Имя => ${name}\n`;
    text += `Email => ${email}\n`;
    alert(text);
}