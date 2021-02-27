const Card = require('../models/card')
const { NotFound } = require('../errors')
// запрос на отображение всех карточек
const getCards = (req, res) => {
  Card.find({}) // ищем все карточки
    .then((cards) => res.status(200).send(cards))
    .catch(err => res.status(500).send({ message: err.message }))
}

// создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id
  Card.create({ name, link, owner})
    .then(card =>res.status(200).send(card))
    .catch(next)
}

// удаляем карточку
const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        return res.status(200).send(card)
      }
      throw new NotFound('При удалении карточки не удалось найти карточку')
    })
    .catch(next)
}

// ставим лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card)
      }
      throw new NotFound('При постановке лайка не удалось найти карточку')
    })
    .catch(next)
}


// убираем лайк карточке
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card)
      }
      throw new NotFound('При удалении лайка не удалось найти карточку')
    })
    .catch(next)
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }

