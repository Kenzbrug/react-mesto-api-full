const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const avatarEdit = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.messages('Неверно введен адрес ссылки');
    })
      .messages({
        'any.required': 'Обязательно для заполенния',
      }),
  })
})

module.exports = { avatarEdit };