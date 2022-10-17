const router = require('express').Router();
const UsersController = require('../controllers/users-controller');


router.post('/register', UsersController.signUp);
router.post('/login', UsersController.signIn);
// router.put('/:userId', UsersController.update);
// router.delete('/:userId', UsersController.delete);

module.exports = router;