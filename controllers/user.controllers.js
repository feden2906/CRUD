const { instanceTransaction } = require('../dataBase').getInstance();
const { userService } = require('../services');
const { passHasher } = require('../helpers');

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
      const { body } = req;

      const password = await passHasher.hash(body.password);

      await userService.createUser({ ...body, password }, transaction);

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
      const { body, params: { userID } } = req;

      await userService.updateUser(userID, body, transaction);

      transaction.commit();

      res.json('user was updated');
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { userID } = req.params;

      await userService.deleteUser(userID, transaction)

      transaction.commit();

      res.json('user was deleted');
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  }
};
