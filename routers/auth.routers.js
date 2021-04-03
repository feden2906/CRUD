const router = require('express').Router();

const { authControllers } = require('../controllers');
const { mwUser } = require('../middlewares');

router.route('/')
    .post(mwUser.isUserExist,
      authControllers.authUser);

router.route('refreshToken')
    .post(authControllers.updateTokens);

module.exports = router;
