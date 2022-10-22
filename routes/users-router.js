const router = require('express').Router();
const UsersController = require('../controllers/users-controller');
const {authorizationUser} = require('../middlewares/authorization-middleware');

// router.use('/:userId', );
router.put('/:userId', authorizationUser, UsersController.update);
router.delete('/:userId', authorizationUser, UsersController.delete);

module.exports = router;