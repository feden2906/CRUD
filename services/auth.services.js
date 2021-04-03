const db = require('../dataBase').getInstance();

const { AUTH } = require('../constants/modelNames.enum');

module.exports = {
  saveTokenToBD: (tokensObj, transaction) => {
    const Auth = db.getModel(AUTH);

    return Auth.create(tokensObj, transaction);
  },

  getTokens: async (findObj) => {
    const Auth = db.getModel(AUTH);

    const { dataValues } = await Auth.findOne({ where: findObj }) || { };

    return dataValues;
  },

  deleteTokens: (tokensObj, transaction) => {
    const Auth = db.getModel(AUTH);

    return Auth.destroy({ where: tokensObj }, transaction);
  }
};
