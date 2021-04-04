const { authService } = require('../services');
const { instanceTransaction } = require('../dataBase').getInstance();
const { passHasher, tokenizer } = require('../helpers');

module.exports = {
  authUser: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { body, user } = req;

      await passHasher.compare(body.password, user.password);

      const tokens = tokenizer.authTokens();

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

      const tokens = tokenizer.authTokens();

      await authService.saveTokenToBD({ ...tokens, userID }, transaction);

      transaction.commit();
      res.json(tokens);
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  }
};
