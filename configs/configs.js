module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'MY_SECRET',
  JWT_CONFIRM_SECRET: process.env.JWT_CONFIRM_SECRET || 'MY_CONFIRM_SECRET',
  JWT_RESTORE_SECRET: process.env.JWT_RESTORE_SECRET || 'MY_RESTORE_SECRET',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'MY_REFRESH_SECRET',

  SENTRY_DSN: process.env.SENTRY_DSN || 'MyDSN',
  PORT: process.env.PORT || 0,

  PROTOCOL: process.env.PROTOCOL || 'http://',
  DOMEN: process.env.DOMEN || 'localhost:5000',

  ROOT_EMAIL: process.env.ROOT_EMAIL || 'default@gmail.com',
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'default',

  DB_LOGIN: process.env.DB_LOGIN || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',

  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_SCHEMA: process.env.DB_SCHEMA || 'crud',
};
