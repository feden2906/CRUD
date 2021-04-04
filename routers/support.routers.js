const router = require('express').Router();

const { AUTH } = require('../constants/keyWords.enum');
const { supportControllers } = require('../controllers');
const { mwUser } = require('../middlewares');

router.route('/forgotPassword')
    .post(mwUser.normalizationUserData,
      mwUser.isUserExist(AUTH),
      supportControllers.restorePassword);


module.exports = router;
