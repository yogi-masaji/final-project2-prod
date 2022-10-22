const router = require('express').Router();
const CommentsController = require('../controllers/comments-controller');
const {authorizationComment} = require('../middlewares/authorization-middleware');

router.post('', CommentsController.create);
router.get('' ,CommentsController.getAll);
router.put('/:commentId', authorizationComment, CommentsController.update);
router.delete('/:commentId', authorizationComment, CommentsController.delete);

module.exports = router;