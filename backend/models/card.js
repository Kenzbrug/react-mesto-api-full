const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^[a-zа-яё0-9-:;.,\s]{2,30}$/i
        return regex.test(v)
      }
    }
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^(https?\:\/\/)(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,6}([a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+)?(#?)$/i;
        return regex.test(v);
      },
      message: 'URL веден неверно',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: Array,
    "default": []
  },
  createdAt: {
    type: Date,
    "default": Date.new
  }
})

module.exports = mongoose.model('card', cardSchema)