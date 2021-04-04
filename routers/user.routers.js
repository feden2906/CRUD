const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwAuth, mwUser } = require('../middlewares');

router.route('/')
    .get(userControllers.getUsers)

    .post(mwUser.normalizationUserData,
      mwUser.isUserExist('create'),
      mwUser.isUserValid,
      userControllers.createUser);

router.route('/:userID')
    .get(mwUser.findUserById,
      userControllers.getUserById)

    .put(mwAuth.checkAccessToken,
      mwUser.findUserById,
      mwAuth.isAllowed,
      mwUser.normalizationUserData,
      userControllers.updateUser)

    .patch(mwUser.checkActivateToken,
      userControllers.activateAccount)

    .delete(mwAuth.checkAccessToken,
      mwUser.findUserById,
      mwAuth.isAllowed,
      userControllers.softDeleteUser);

module.exports = router;
