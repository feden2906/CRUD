const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwAuth, mwUser } = require('../middlewares');

router.route('/')
    .get(userControllers.getUsers)

    .post(mwUser.normalizationUserData,
      userControllers.createUser);

router.route('/:userID')
    .get(mwUser.findUserById,
      userControllers.getUserById)

    .put(mwAuth.checkAccessToken,
      mwUser.findUserById,
      mwUser.normalizationUserData,
      userControllers.updateUser)

    .delete(mwAuth.checkAccessToken,
      mwUser.findUserById,
      userControllers.deleteUser);

module.exports = router;
