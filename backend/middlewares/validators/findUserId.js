const { celebrate, Joi } = require('celebrate');

const findUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24)
      .messages({
        'string.length': 'Несуществующий id пользователя',
      }),
  }),
});

module.exports = { findUserId };
