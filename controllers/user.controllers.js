const { userService } = require('../services');
const { instanceTransaction } = require('../dataBase').getInstance();

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.findUsers(req.query);

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      res.json(req.profile);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      await userService.createUser(req.body);

      transaction.commit();
      res.json('created');
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { userID } = req.params;

      transaction.commit();
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { body, params: { userID } } = req;

      userService.deleteUser()
      transaction.commit();
      res.json('user was deleted');
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  }
};
