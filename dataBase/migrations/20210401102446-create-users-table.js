const DataTypes = require('sequelize');

const { tableNames } = require('../../constants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      tableNames.USERS,
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        phone: {
          type: DataTypes.STRING
        },
        yearBorn: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(tableNames.USERS);
  }
};
