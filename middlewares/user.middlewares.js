const { userService } = require('../services');
const { statusCodes } = require('../constants');
const { ErrorHandler } = require('../helpers');

module.exports = {
  findUserById: async (req, res, next) => {
    try {
      const { userID } = req.params;

      const user = await userService.findUserById(userID);

      if (!user) {
        throw new ErrorHandler('User not found', statusCodes.BAD_REQUEST);
      }

      req.profile = user;
      next();
    } catch (e) {
      next(e);
    }
  }
};
