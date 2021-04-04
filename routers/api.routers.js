const router = require('express').Router();

const authRouter = require('./auth.routers');
const supportRouter = require('./support.routers');
const userRouter = require('./user.routers');

router.use('/auth', authRouter);
router.use('/support', supportRouter);
router.use('/users', userRouter);

module.exports = router;
