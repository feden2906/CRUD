const router = require('express').Router();

const { userControllers } = require('../controllers');

router.route('/')
    .get(userControllers.getUsers)
    .post(userControllers.createUser);

router.route('/:userID')
    .get(userControllers.getUserById)
    .put(userControllers.updateUser)
    .delete(userControllers.deleteUser);

module.exports = router;
