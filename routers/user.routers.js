const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwAuth, mwUser } = require('../middlewares');
const { createUserValidator, updateUserValidator } = require('../validators/user');

router.route('/')
    .get(userControllers.getUsers) // TODO check accountStatus

    .post(mwUser.normalizationUserData,
      mwUser.isUserExist('create'),
      mwUser.isUserValid(createUserValidator),
      userControllers.createUser);

router.route('/:userID') // TODO check accountStatus
    .get(mwUser.findUserById,
      userControllers.getUserById)

    .put(mwAuth.checkAccessToken,
      mwUser.findUserById,
      mwAuth.isAllowed,
      mwUser.normalizationUserData,
      mwUser.isUserValid(updateUserValidator),
      userControllers.updateUser)

    .patch(mwUser.checkActivateToken,
      userControllers.activateAccount)

    .delete(mwAuth.checkAccessToken,
      mwUser.findUserById,
      mwAuth.isAllowed,
      userControllers.softDeleteUser);

module.exports = router;
