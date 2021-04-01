const router = require('express').Router();

const { authControllers } = require('../controllers');

router.route('/')
    .post(authControllers.authUser);

router.route('refreshToken')
    .post(authControllers.updateTokens);

module.exports = router;
