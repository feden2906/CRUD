const jwt = require('jsonwebtoken');
const { JWT_CONFIRM_SECRET, JWT_REFRESH_SECRET, JWT_SECRET } = require('../configs/configs');

module.exports = {
  authTokens: () => {
    const access_token = jwt.sign({}, JWT_SECRET, { expiresIn: '5h' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return {
      access_token,
      refresh_token
    };
  },

  confirmToken: () => jwt.sign({}, JWT_CONFIRM_SECRET, { expiresIn: '1d' })
};
