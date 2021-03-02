const { CelebrateError } = require('celebrate');

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  /* eslint-disable no-console */
  console.log(err);
  if (err instanceof CelebrateError) {
    return res.status(400).send(err.details.get('body'));
  } if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  return res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
