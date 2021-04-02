const router = require('express').Router();

const { userControllers } = require('../controllers');
const { mwUser } = require('../middlewares');

router.route('/')
    .get(userControllers.getUsers)

    .post(mwUser.normalizationUserData,
      userControllers.createUser);

router.route('/:userID')
    .get(mwUser.findUserById,
      userControllers.getUserById)

    .put(mwUser.findUserById,
      userControllers.updateUser)

    .delete(mwUser.findUserById,
      userControllers.deleteUser);

module.exports = router;
