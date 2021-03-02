const router = require('express').Router();
const controller = require('../controllers/users');
const findUserIdValidator = require('../middlewares/validators/findUserId');
const profileEditValidator = require('../middlewares/validators/profileEdit');
const avatarEditValidator = require('../middlewares/validators/avatarEdit');

router.get('/me', controller.getProfile);

router.get('/', controller.getUsers);

router.patch('/me', profileEditValidator.profileEdit, controller.updateUser);
router.patch('/me/avatar', avatarEditValidator.avatarEdit, controller.updateAvatar);

router.post('/', controller.createUser);

router.get('/:id', findUserIdValidator.findUserId, controller.getUser);

module.exports = router;
