const moment = require('moment');

module.exports = {
  CURRENT_YEAR: new Date().getFullYear(),
  CURRENT_DATA: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
};
