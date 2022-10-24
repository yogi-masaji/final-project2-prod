const router = require('express').Router();
const SocialmediasController = require('../controllers/socialmedias-controller');
const {authorizationSocialMedia} = require('../middlewares/authorization-middleware');

router.post('', SocialmediasController.create);
router.get('' , SocialmediasController.getAll);

module.exports = router;