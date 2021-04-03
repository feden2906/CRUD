const db = require('../dataBase').getInstance();

const { AUTH } = require('../constants/modelNames.enum');

module.exports = {
  saveTokenToBD: (tokensObj, transaction) => {
    const Auth = db.getModel(AUTH);

    return Auth.create(tokensObj, transaction);
  },

  getTokens: (findObj) => {
    const Auth = db.getModel(AUTH);

    return Auth.findOne({ where: findObj });
  },

  deleteTokens: (tokensObj, transaction) => {
    const Auth = db.getModel(AUTH);

    return Auth.destroy({ where: tokensObj }, transaction);
  }
};
