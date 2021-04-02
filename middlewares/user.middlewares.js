const { userService } = require('../services');
const { statusCodes } = require('../constants');
const { ErrorHandler, utils } = require('../helpers');

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
  },

  normalizationUserData: (req, res, next) => {
    try {
      const { name, email, phone } = req.body;

      if (name) {
        req.body.name = utils.nameNormalizator(name);
      }

      if (email) {
        req.body.email = utils.emailNormalizator(email);
      }

      // if (phone) {
      //   utils.phoneNormalizator(phone);
      // }

      next();
    } catch (e) {
      next(e);
    }
  }
};
