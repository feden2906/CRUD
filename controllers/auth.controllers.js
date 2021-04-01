const { authService } = require('../services');
const { instanceTransaction } = require('../dataBase').getInstance();

module.exports = {
  authUser: (req, res, next) => {
    try {

    } catch (e) {
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
