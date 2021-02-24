const router = require('express').Router();
const userRoutes = require('./users')
const cardRoutes = require('./cards')

router.use('/users', userRoutes)
router.use('/cards', cardRoutes)

// обработка ошибки при некорректном вводе адреса
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' })
})


module.exports = router