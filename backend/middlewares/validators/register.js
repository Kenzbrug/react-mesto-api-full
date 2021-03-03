const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const register = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа в поле Имя',
        'string.max': 'Максимум 30 символов',
      }),
    password: Joi.string().min(4).required().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
      .messages({
        'string.min': 'Минимум 4 символа в поле пароля',
        'any.required': 'Обязательное поле для заполенния поле Пароля',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.messages('Неправильно введен email при регистрации');
    })
      .messages({
        'any.required': 'Обязательно для заполенния поле email',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимум 2 символа в поле О себе',
        'string.max': 'Максимум 30 символов в поле О себе',
      }),
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.messages('Неверно введен адрес ссылки аватарки');
    }),
  }).unknown(true),
});

module.exports = { register };
