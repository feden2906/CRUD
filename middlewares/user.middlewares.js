const jwt = require('jsonwebtoken');

const { userService } = require('../services');
const { keyWords: { AUTH, CREATE }, statusCodes, statusMessages } = require('../constants');
const { JWT_CONFIRM_SECRET } = require('../configs/configs');
const { ErrorHandler, utils } = require('../helpers');

module.exports = {
  checkActivateToken: async (req, res, next) => {
    try {
      const { activate_token } = req.query;

      const user = await userService.findOneUser({ accountStatus: activate_token });

      if (!user) {
        throw new ErrorHandler(statusMessages.TOKEN_NOT_VALID, statusCodes.BAD_REQUEST);
      }

      jwt.verify(activate_token, JWT_CONFIRM_SECRET, (err) => {
        if (err) {
          throw new ErrorHandler(statusMessages.TOKEN_NOT_VALID, statusCodes.UNAUTHORIZED);
        }
      });

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserExist: (purpose) => async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.findOneUser({ email });

      if (!user && purpose === AUTH) {
        throw new ErrorHandler(statusMessages.WRONG_EMAIL_OR_PASSWORD, statusCodes.BAD_REQUEST);
      }

      if (user && purpose === CREATE) {
        throw new ErrorHandler(statusMessages.USER_IS_EXISTS, statusCodes.BAD_REQUEST);
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserValid: (validatorType) => (req, res, next) => {
    try {
      const { error } = validatorType.validate(req.body);

      if (error) {
        throw new ErrorHandler(error.details[0].message, statusCodes.BAD_REQUEST);
      }

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
        throw new ErrorHandler(statusMessages.USER_NOT_FOUND, statusCodes.BAD_REQUEST);
      }

      if (user.deletedData) {
        throw new ErrorHandler(statusMessages.USER_WAS_DELETED(user.deletedData), statusCodes.FORBIDDEN);
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
