const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { BadRequest } = require('../../errors');

const avatarEdit = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (validator.isURL(value)) {
        return value;
      }
      throw new BadRequest('Ошибка валидации аватарки');
    }),
  }),
});

module.exports = { avatarEdit };
