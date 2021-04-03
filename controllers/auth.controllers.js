const { authService } = require('../services');
const { instanceTransaction } = require('../dataBase').getInstance();
const { tokenizer } = require('../helpers');

module.exports = {
  authUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const tokens = tokenizer();

      await authService.saveTokenToBD({ ...tokens, userID: req.user.id }, transaction);

      transaction.commit();
      res.json(tokens);
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  },

  updateTokens: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { userID } = req.tokens;

      const tokens = tokenizer();

      await authService.saveTokenToBD({ ...tokens, userID }, transaction);

      transaction.commit();
      res.json(tokens);
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  }
};
