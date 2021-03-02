const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const register = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(6).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
    password: Joi.string().min(4).required().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
      .messages({
        'string.min': 'Минимум 4 символа',
        'any.required': 'Обязательное поле для заполенния',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.messages('Неправильно введен email');
    })
      .messages({
        'any.required': 'Обязательно для заполенния',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
      }),
    avatar: Joi.string().custom((value, helper) => {
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

module.exports = { register };
