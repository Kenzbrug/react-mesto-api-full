const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { NotFound } = require('../errors');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

// обработка ошибки при некорректном вводе адреса
/* eslint-disable no-unused-vars */
router.use('*', (req, res) => { // res, req
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
