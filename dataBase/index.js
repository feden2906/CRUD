const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const { DB_DIALECT, DB_LOGIN, DB_PASSWORD, DB_SCHEMA } = require('../configs/configs');
