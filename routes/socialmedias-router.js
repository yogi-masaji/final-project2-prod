const router = require('express').Router();
const SocialmediasController = require('../controllers/socialmedias-controller');
const  {authorizationSocialMedia}  = require('../middlewares/authorization-middleware');

router.post('', SocialmediasController.create);
router.get('' , SocialmediasController.getAll);
router.put('/:socialMediaId', authorizationSocialMedia, SocialmediasController.update);
router.delete('/:socialMediaId', authorizationSocialMedia, SocialmediasController.delete);

module.exports = router;