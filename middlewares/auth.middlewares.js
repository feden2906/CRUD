const { authService } = require('../services');

module.exports = {
  findUserById: async (req, res, next) => {
    try {
      const { userID } = req.params;

      const user = await authService.getTokensByAccess(userID);

      next()
    } catch (e) {
      next(e);
    }
  }
};
