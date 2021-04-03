const DataTypes = require('sequelize');

const { tableNames } = require('../../constants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(tableNames.USERS, 'deletedData', { type: DataTypes.STRING });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(tableNames.USERS, 'deletedData');
  }
};
