const { DB_DIALECT, DB_HOST, DB_LOGIN, DB_PASSWORD, DB_SCHEMA } = require('./configs');

module.exports = {
  development: {
    username: DB_LOGIN,
    password: DB_PASSWORD,
    database: DB_SCHEMA,
    host: DB_HOST,
    dialect: DB_DIALECT
  }
};
