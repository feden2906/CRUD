const db = require('../dataBase').getInstance();

const { USER } = require('../constants/modelNames.enum');

module.exports = {
  findUsers: () => {
  },

  findUsersById: () => {
  },

  createUser: (userObj) => {
    const User = db.getModel(USER);

    return User.create(userObj);
  },

  updateUser: () => {
  },

  deleteUser: () => {
  }
};
