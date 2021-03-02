const router = require('express').Router();
const controller = require('../controllers/users');
const findUserIdValidator = require('../middlewares/validators/findUserId');
const profileEditValidator = require('../middlewares/validators/register');

router.get('/me', controller.getProfile);

router.get('/', controller.getUsers);

router.patch('/me', profileEditValidator.register, controller.updateUser);
router.patch('/me/avatar', profileEditValidator.register, controller.updateAvatar);

router.post('/', controller.createUser);

router.get('/:id', findUserIdValidator.findUserId, controller.getUser);

module.exports = router;
