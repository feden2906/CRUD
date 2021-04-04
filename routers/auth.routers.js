const router = require('express').Router();

const { AUTH } = require('../constants/keyWords.enum');
const { authControllers } = require('../controllers');
const { mwAuth, mwUser } = require('../middlewares');

router.route('/')
    .post(mwUser.isUserExist(AUTH),
      authControllers.authUser);

router.route('/refreshToken')
    .post(mwAuth.checkRefreshToken,
      authControllers.updateTokens);

module.exports = router;
