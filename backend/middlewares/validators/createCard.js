const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const createCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
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

module.exports = { createCard };
