const { ErrorHandler } = require('../helpers');
const { constants: { PHOTO_MAX_SIZE, PHOTO_MIMETYPES }, statusCodes, statusMessages } = require('../constants');

module.exports = {
  checkAvatar: (req, res, next) => {
    try {
      if (req.files) {
        const { avatar } = req.files;

        if (!avatar) {
          throw new ErrorHandler(statusMessages.JUST_ONE_PHOTO, statusCodes.BAD_REQUEST);
        }

        const { size, mimetype } = avatar;

        if (PHOTO_MAX_SIZE < size) {
          throw new ErrorHandler(statusMessages.FILE_TOO_BIG, statusCodes.BAD_REQUEST);
        }

        if (!PHOTO_MIMETYPES.includes(mimetype)) {
          throw new ErrorHandler(statusMessages.NOT_VALID_FILE, statusCodes.BAD_REQUEST);
        }

        req.avatar = avatar;
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
