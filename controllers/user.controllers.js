const { userService } = require('../services');

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.findUsers();

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      await userService.createUser(req.body);

      res.json('created');
    } catch (e) {
      next(e);
    }
  },

  updateUser: (req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  },

  deleteUser: (req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  }
};
