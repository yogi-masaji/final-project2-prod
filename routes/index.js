const router = require('express').Router();
const userRouter = require('./users-router');
const errorMiddleware = require('../middlewares/error-middleware');

router.use('/user', userRouter);

router.use(errorMiddleware);

module.exports = router;