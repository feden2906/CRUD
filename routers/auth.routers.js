const router = require('express').Router();

const { authControllers } = require('../controllers');
const { mwAuth, mwUser } = require('../middlewares');

router.route('/')
    .post(mwUser.isUserExist,
      authControllers.authUser);

router.route('/refreshToken')
    .post(mwAuth.checkRefreshToken,
      authControllers.updateTokens);

module.exports = router;
