const { authService } = require('../services');
const { instanceTransaction } = require('../dataBase').getInstance();
const { tokenizer } = require('../helpers');

module.exports = {
  authUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const tokens = await tokenizer();
      tokens.userID = req.user.id;
      await authService.saveTokenToBD(tokens, transaction);

      transaction.commit();
      res.json('welcome');
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  },

  updateTokens: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      transaction.commit();
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  }
};
