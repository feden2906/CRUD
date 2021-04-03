const DataTypes = require('sequelize');

const { tableNames } = require('../../constants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(tableNames.USERS, 'accountStatus', {
      type: DataTypes.STRING,
      defaultValue: 'not activated'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(tableNames.USERS, 'accountStatus');
  }
};
