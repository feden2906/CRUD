const DataTypes = require('sequelize');

const { modelNames, tableNames } = require('../../constants');

module.exports = (client) => {
  const User = client.define(
    modelNames.USER,
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
    },
    {
      tableName: tableNames.USERS,
      timestamps: true
    }
  );

  return User;
};
