const DataTypes = require('sequelize');

const { tableNames } = require('../../constants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(tableNames.USERS, 'createdAt', { type: DataTypes.STRING });
    await queryInterface.addColumn(tableNames.USERS, 'updatedAt', { type: DataTypes.STRING });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(tableNames.USERS, 'createdAt');
    await queryInterface.removeColumn(tableNames.USERS, 'updatedAt');
  }
};
