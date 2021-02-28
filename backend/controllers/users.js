const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { NotFound, Conflict, Unauthorized } = require('../errors')
const {JWT_SECRET, JWT_TTL} = require('../config/index')

// отображаем всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(500).send({ message: err.message }))
}

// ищем пользователя
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      // обрабатываем ошибку, если пользователь не найден с указанным id
      if (!user) {
        throw new NotFound('Нет пользователя с таким id')
      }
      return res.status(200).send(user)
    })
    .catch(err => {
      // проверка на валидность запрашиваемых данных
      next(err)

    })
}

// создаем нового пользователя
const createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  User.findOne({email})
    .then((user) => {
      if (user) {
        throw new Conflict('Почта уже используется')
      }
      bcrypt.hash(password, 10)
        .then(hash => User.create({
          email: req.body.email,
          password: hash,
          name: name,
          about: about,
          avatar: avatar
          }))
          .then(({_id, email}) => {
            res.send({_id, email})
          })
          .catch((err) => {
            return res.status(400).send({ message: err.message })
        })
    })
    .catch(next)

}
const login = (req, res, next) => {
  const { email, password } = req.body
  User.findOne({email}).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неприравильный логин или пароль')
      }
      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            return user
          }
          throw new Unauthorized('Неприравильный логин или пароль')
        })
    })
    .then(({_id}) => {
      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: JWT_TTL })
      res.send({ token })
    })
    .catch(next)
}

// обновляем данные пользователя
const updateUser = (req, res, next) => {
  const { name, about } = req.body
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // then получит на вход обнавленные данные
    runValidators: true, // валидация данных перед изменением
    upsert: true // если нет пользователя, то создать нового
  })
    .then((user) => {
      if (user) {
        return res.status(200).send(user)
      }
      throw new NotFound('Пользователь не найден')
    })
    .catch(next)
}

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true
  })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден')
      }
      return res.status(200).send(user)
    })
    .catch(next)
}

module.exports = {
  getUsers, getUser, createUser, login, updateUser, updateAvatar
}