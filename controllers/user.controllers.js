const { constants: { CURRENT_DATA }, emailActions } = require('../constants');
const { DOMEN, PROTOCOL } = require('../configs/configs');
const { instanceTransaction } = require('../dataBase').getInstance();
const { passHasher, tokenizer } = require('../helpers');
const { mailService, userService } = require('../services');

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
      const { body, body: { email, name, password } } = req;

      const hashPassword = await passHasher.hash(password);

      const activate_token = tokenizer.confirmToken();

      await userService.createUser({ ...body, accountStatus: activate_token, password: hashPassword }, transaction);

      const urlWithToken = `${PROTOCOL}${DOMEN}/users?activate_token=${activate_token}`;

      await mailService.sendMail(email, emailActions.CONFIRM, { name, urlWithToken });

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

  softDeleteUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { userID } = req.params;

      await userService.updateUser(userID, { deletedData: CURRENT_DATA }, transaction);

      transaction.commit();

      res.json('user was deleted');
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  }
};
