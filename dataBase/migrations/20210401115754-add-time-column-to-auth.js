const DataTypes = require('sequelize');

const { tableNames } = require('../../constants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(tableNames.AUTH, 'createdAt', { type: DataTypes.STRING });
    await queryInterface.addColumn(tableNames.AUTH, 'updatedAt', { type: DataTypes.STRING });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(tableNames.AUTH, 'createdAt');
    await queryInterface.removeColumn(tableNames.AUTH, 'updatedAt');
  }
};
