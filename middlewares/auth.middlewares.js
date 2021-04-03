const jwt = require('jsonwebtoken');

const { authService } = require('../services');
const { statusCodes } = require('../constants');
const { JWT_SECRET } = require('../configs/configs');
const { ErrorHandler } = require('../helpers');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get('Authorization');

      if (!access_token) {
        throw new ErrorHandler('TOKEN_IS_REQUIRED', statusCodes.UNAUTHORIZED);
      }

      jwt.verify(access_token, JWT_SECRET, (err) => {
        if (err) {
          throw new ErrorHandler('TOKEN_NOT_VALID', statusCodes.UNAUTHORIZED);
        }
      });

      const tokens = await authService.getTokens({ access_token });

      if (!tokens) {
        throw new ErrorHandler('TOKEN_NOT_VALID', statusCodes.BAD_REQUEST);
      }

      req.tokens = tokens;
      next();
    } catch (e) {
      next(e);
    }
  }
};
