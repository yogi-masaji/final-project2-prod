const router = require('express').Router();
const PhotosController = require('../controllers/photos-controller');
const {authorizationPhoto} = require('../middlewares/authorization-middleware');

router.post('', PhotosController.create);
router.get('' ,PhotosController.getAll);
router.put('/:photoId', authorizationPhoto, PhotosController.update);
router.delete('/:photoId', authorizationPhoto, PhotosController.delete);

module.exports = router;