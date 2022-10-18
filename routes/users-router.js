const router = require('express').Router();
const UsersController = require('../controllers/users-controller');
const {authorizationUser} = require('../middlewares/authorization-middleware');

router.use('/:userId', authorizationUser);
router.put('/:userId', UsersController.update);
router.delete('/:userId', UsersController.delete);

module.exports = router;