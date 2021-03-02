const router = require('express').Router();
const controller = require('../controllers/cards');
const findCardIdIdValidator = require('../middlewares/validators/findCardId');
const creatCardValidator = require('../middlewares/validators/createCard');

router.get('/', controller.getCards);
router.post('/', creatCardValidator.createCard, controller.createCard);
router.delete('/:id', findCardIdIdValidator.findCardId, controller.deleteCard);
router.put('/:id/likes', controller.likeCard);
router.delete('/:id/likes', controller.dislikeCard);

module.exports = router;
