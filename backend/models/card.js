const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        const regex = /^[a-zа-яё0-9-:;.,\s]{2,30}$/i;
        return regex.test(v);
      },
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        /* eslint-disable no-useless-escape */
        const regex = /^(https?\:\/\/)(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,6}([a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+)?(#?)$/i;
        /* eslint-enable no-useless-escape */
        return regex.test(v);
      },
      message: 'URL веден неверно',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: Array,
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
