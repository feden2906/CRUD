const { constants: { CURRENT_DATA }, emailActions } = require('../constants');
const { DOMEN, PROTOCOL } = require('../configs/configs');
const { instanceTransaction } = require('../dataBase').getInstance();
const { passHasher, tokenizer } = require('../helpers');
const { mailService, userService } = require('../services');

module.exports = {
  activateAccount: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      await userService.updateUser(req.user.id, { accountStatus: 'activated' }, transaction);

      await transaction.commit();
      res.json('Account was activated');
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { body, body: { email, name, password } } = req;

      const hashPassword = await passHasher.hash(password);

      const activate_token = tokenizer.confirmToken();

      const { id } = await userService.createUser(
        { ...body, accountStatus: activate_token, password: hashPassword },
        transaction
      );

      const urlWithToken = `${PROTOCOL}${DOMEN}/users/${id}?activate_token=${activate_token}`;

      await mailService.sendMail(email, emailActions.CONFIRM, { name, urlWithToken });

      transaction.commit();
      res.json('created');
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const users = await userService.findUsers({ ...req.query, accountStatus: 'activated' });

      res.json(users);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      delete req.profile.password;

      res.json(req.profile);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { body, params: { userID } } = req;
      let { password } = body;

      if (password) {
        password = await passHasher.hash(password);
      }

      await userService.updateUser(userID, { ...body, password }, transaction);

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
