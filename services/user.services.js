const db = require('../dataBase').getInstance();

const { USER } = require('../constants/modelNames.enum');

module.exports = {
  findUsers: (findObj) => {
    const User = db.getModel(USER);

    return User.findAll({
      where: findObj,
      attributes: { exclude: ['password'] }
    });
  },

  findUserById: async (userID) => {
    const User = db.getModel(USER);

    const { dataValues } = await User.findByPk(userID) || { };

    return dataValues;
  },

  findOneUser: async (findObj) => {
    const User = db.getModel(USER);

    const { dataValues } = await User.findOne({ where: findObj }) || { };

    return dataValues;
  },

  createUser: (userObj, transaction) => {
    const User = db.getModel(USER);

    return User.create(userObj, { transaction, returning: true });
  },

  updateUser: (id, userObj, transaction) => {
    const User = db.getModel(USER);

    return User.update(userObj, { where: { id }, transaction });
  }
};
