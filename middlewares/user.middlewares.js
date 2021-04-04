const { userService } = require('../services');
const { statusCodes } = require('../constants');
const { ErrorHandler, utils } = require('../helpers');

module.exports = {
  isUserExist: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.findOneUser({ email });

      if (!user) {
        throw new ErrorHandler('WRONG_EMAIL_OR_PASSWORD', statusCodes.BAD_REQUEST);
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  findUserById: async (req, res, next) => {
    try {
      const { userID } = req.params;

      const user = await userService.findUserById(userID);

      if (!user) {
        throw new ErrorHandler('User not found', statusCodes.BAD_REQUEST);
      }

      if (user.deletedData) {
        throw new ErrorHandler(`User account was deleted at ${user.deletedData}`, statusCodes.FORBIDDEN);
      }

      if (user.accountStatus !== 'activated') {
        throw new ErrorHandler('Check your email for activation account', statusCodes.FORBIDDEN);
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

      if (phone) {
        req.body.phone = utils.phoneNormalizator(phone);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
