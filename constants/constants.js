const moment = require('moment');

module.exports = {
  CURRENT_YEAR: new Date().getFullYear(),
  CURRENT_DATA: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),

  PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  PHOTO_MIMETYPES: [
    'image/gif', // .gif
    'image/jpeg', // .jpeg .jpg
    'image/png', // .png
    'image/tiff' // .tiff
  ],
};
