const ESC_KEYCODE = 27

const settings = {
    inputSelector: '.popup__form-input', // находим инпуты
    submitButtonSelector: '.popup__save', // находим кнопку
    inactiveButtonClass: 'popup__save_disabled', // стиль кнопки off
    inputErrorClass: 'popup__input_type_error', // стиль красное подчеркивание инпутов
    errorClass: 'popup__error_visible' //стиль для ошибки
}

export { settings, ESC_KEYCODE }