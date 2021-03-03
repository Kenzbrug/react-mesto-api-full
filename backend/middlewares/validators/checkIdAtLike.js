const { celebrate, Joi } = require('celebrate');

const checkIdAtLike = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24)
      .messages({
        'string.length': 'Несуществующий id карточки',
      }),
  }),
});

module.exports = { checkIdAtLike };
