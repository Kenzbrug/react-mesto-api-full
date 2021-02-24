const Card = require('../models/card')

// запрос на отображение всех карточек
const getCards = (req, res) => {
  Card.find({}) // ищем все карточки
    .then((cards) => res.status(200).send(cards))
    .catch(err => res.status(500).send({ message: err.message }))
}

// создание карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id
  Card.create({ name, link, owner })
    .then(card => res.status(200).send(card))
    .catch((err) => {
      // проверка на валидность введенных данных
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "При создании карточки переданы некорректные данные" })
      }
      return res.status(500).send({ message: err.message })
    })
}

// удаляем карточку
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        return res.status(200).send(card)
      }
      return res.status(404).send({ message: "При удалении карточки не удалось найти карточку" })
    })
    .catch((err) => {
      // проверка на валидность запрашиваемых данных
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Переданы некорректные данные в методe удаления карточки"
        })
      }
      return res.status(500).send({ message: err.message })
    })
}

// ставим лайк карточке
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card)
      }
      return res.status(404).send({ message: "При постановке лайка не удалось найти карточку" })
    })
    .catch((err) => {
      // проверка на валидность запрашиваемых данных
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданы некорректные данные в методe поставновки лайка" })
      }
      return res.status(500).send({ message: err.message })
    })
}


// убираем лайк карточке
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card)
      }
      return res.status(404).send({ message: "При удалении лайка не удалось найти карточку" })
    })
    .catch((err) => {
      // проверка на валидность запрашиваемых данных
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Переданы некорректные данные в методe удаления лайка" })
      }
      return res.status(500).send({ message: err.message })
    })
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }

