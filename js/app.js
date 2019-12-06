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
                showFields([
                    {
                        title: 'Имя',
                        value: $name_input.val(),
                    },
                    {
                        title: 'Email',
                        value: $email_input.val(),
                    }
                ]);
            }

        });
    }

    //При клике на изображение показать галерею slick
    $(document).ready(function () {
        //при клике на ссылку в слайде запускаем галерею
        $('.card__slider').each(function () {
            const slider = $(this);
            const gallery = slider.find('.card__fancybox');

            slider.on('click', '.card__fancybox', function (e) {
                e.preventDefault();
                //узнаём индекс слайда без учёта клонов
                var totalSlides = +$(this).parents('.slider').slick("getSlick").slideCount,
                    dataIndex = +$(this).parents('.slide').data('slick-index'),
                    trueIndex;
                switch (true) {
                    case (dataIndex < 0):
                        trueIndex = totalSlides + dataIndex;
                        break;
                    case (dataIndex >= totalSlides):
                        trueIndex = dataIndex % totalSlides;
                        break;
                    default:
                        trueIndex = dataIndex;
                }
                //вызывается элемент галереи, соответствующий индексу слайда
                $.fancybox.open(gallery, {}, trueIndex);
                return false;
            });

            slider.slick();
        })
    });
});

const NO_NAME_ERROR = 'Введите имя';
const NO_HYPHENS_ERROR = 'Имя должно состоять только с букв, пробелов или дефисов';
const NO_SYMBOL_ERROR = 'Имя должно быть от 2 до 70 символов';
const NO_ENTER_EMAIL = 'Введите Email';
const NO_INVALID_EMAIL = 'Некорректный Email';

function showError(err, $input) {
    const $el = $(`<div class="input-error">${err}</div>`);
    $el.insertAfter($input);
}

function validateName(val) {
    let err = null;
    if (!val) {
        err = NO_NAME_ERROR;
    } else if (!/^[А-Яа-яіA-Za-z\s-]*$/.test(val)) {
        err = NO_HYPHENS_ERROR;
    } else if (val.length < 2 || val.length > 70) {
        err = NO_SYMBOL_ERROR;
    }
    return err;
}

function validateEmail(email) {
    let err = null;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
        err = NO_ENTER_EMAIL;
    } else if (!re.test(email)) {
        err = NO_INVALID_EMAIL;
    }
    return err;
}

function showFields(fields) {
    const text = fields.map(({title, value}) => `${title} => ${value}`).join('\n');
    alert(text);
}
