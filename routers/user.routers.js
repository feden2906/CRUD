const router = require('express').Router();

const { CREATE } = require('../constants/keyWords.enum');
const { userControllers } = require('../controllers');
const { mwAuth, mwFile, mwUser } = require('../middlewares');
const { createUserValidator, updateUserValidator } = require('../validators/user');

router.route('/')
    .get(userControllers.getUsers)

    .post(mwUser.normalizationUserData,
      mwUser.isUserExist(CREATE),
      mwUser.isUserValid(createUserValidator),
      mwFile.checkAvatar,
      userControllers.createUser);

router.route('/:userID')
    .get(mwUser.findUserById,
      mwAuth.checkStatusAccount,
      userControllers.getUserById)

    .put(mwAuth.checkAccessToken,
      mwUser.findUserById,
      mwAuth.isAllowed,
      mwAuth.checkStatusAccount,
      mwUser.normalizationUserData,
      mwUser.isUserValid(updateUserValidator),
      mwFile.checkAvatar,
      userControllers.updateUser)

    .patch(mwUser.checkActivateToken,
      userControllers.activateAccount)

    .delete(mwAuth.checkAccessToken,
      mwUser.findUserById,
      mwAuth.isAllowed,
      mwAuth.checkStatusAccount,
      userControllers.softDeleteUser);

module.exports = router;
