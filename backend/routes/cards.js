const router = require('express').Router();
const controller = require('../controllers/cards')

router.get('/', controller.getCards)
router.post('/', controller.createCard)
router.delete('/:id', controller.deleteCard)
router.put('/:id/likes', controller.likeCard)
router.delete('/:id/likes', controller.dislikeCard)

module.exports = router