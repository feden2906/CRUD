const DataTypes = require('sequelize');

const { tableNames } = require('../../constants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      tableNames.AUTH,
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        access_token: {
          type: DataTypes.STRING,
          allowNull: false
        },
        refresh_token: {
          type: DataTypes.STRING,
          allowNull: false
        },
        userID: {
          type: DataTypes.DECIMAL,
          allowNull: false
        }
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(tableNames.AUTH);
  }
};
