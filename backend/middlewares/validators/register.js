const {celebrate, Joi} = require('celebrate')
const validator = require('validator')


const register = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).message({
      'string.min' : 'Минимум 2 символа',
      'string.max' : 'Максимум 30 символов'
    }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .message({
      'any.required': 'Обязательно для заполенния'
    }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Неправильно введен email')
    })
    .message({
      'any.required': 'Обязательно для заполенния'
    }),
    about: Joi.string().min(2).max(30).message({
      'string.min' : 'Минимум 2 символа',
      'string.max' : 'Максимум 30 символов'
    }),
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Неверно введен адрес ссылки')
    })
    .message({
      'any.required': 'Обязательно для заполенния'
    }),
  })
})

module.exports = {register}