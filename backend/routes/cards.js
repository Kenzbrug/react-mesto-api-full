const router = require('express').Router();
const controller = require('../controllers/cards');
const findCardIdIdValidator = require('../middlewares/validators/findCardId');
const creatCardValidator = require('../middlewares/validators/createCard');
const checkIdAtLikeValidator = require('../middlewares/validators/checkIdAtLike');

router.get('/', controller.getCards);
router.post('/', creatCardValidator.createCardValid, controller.createCard);
router.delete('/:id', findCardIdIdValidator.findCardId, controller.deleteCard);
router.put('/:id/likes', checkIdAtLikeValidator.checkIdAtLike, controller.likeCard);
router.delete('/:id/likes', checkIdAtLikeValidator.checkIdAtLike, controller.dislikeCard);

module.exports = router;
