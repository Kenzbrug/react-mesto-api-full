const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required()
      .messages({
        'string.min': 'Минимум 2 символа в поле имени карточки',
        'string.max': 'Максимум 30 символов в поле имени карточки',
        'any.required': 'Обязательно для заполенния',
      }),
    link: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.messages('Неверно введен адрес ссылки');
    })
      .messages({
        'any.required': 'Обязательно для заполенния',
      }),
  }).unknown(true),
});

module.exports = { createCardValid };
