const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    // api не будет возвращать хеш пароля
    select: false,
  },

  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^.{2,30}$/i;
        return regex.test(v);
      },
    },
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^.{2,30}$/i;
        return regex.test(v);
      },
    },
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат почты',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
