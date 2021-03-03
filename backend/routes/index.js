const router = require('express').Router();
const bodyParser = require('body-parser');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { NotFound } = require('../errors');

const jsonParser = bodyParser.json();

router.use('/users', jsonParser, auth, userRoutes);
router.use('/cards', jsonParser, auth, cardRoutes);

// обработка ошибки при некорректном вводе адреса
/* eslint-disable no-unused-vars */
router.use('*', (req, res) => { // res, req
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
