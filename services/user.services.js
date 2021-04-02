const db = require('../dataBase').getInstance();

const { USER } = require('../constants/modelNames.enum');

module.exports = {
  findUsers: (findObj) => {
    const User = db.getModel(USER);

    return User.findAll({ where: findObj });
  },

  findUserById: async (userID) => {
    const User = db.getModel(USER);

    const { dataValues } = await User.findByPk(userID) || { };

    return dataValues;
  },

  createUser: (userObj, transaction) => {
    const User = db.getModel(USER);

    return User.create(userObj, transaction);
  },

  updateUser: (id, userObj, transaction) => {
    const User = db.getModel(USER);

    return User.update(userObj, { where: { id }, transaction });
  },

  deleteUser: (id, transaction) => {
    const User = db.getModel(USER);

    return User.destroy({ where: { id }, transaction });
  }
};
