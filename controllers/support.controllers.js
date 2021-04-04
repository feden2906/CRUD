const { emailActions, statusMessages } = require('../constants');
const { DOMEN, PROTOCOL } = require('../configs/configs');
const { instanceTransaction } = require('../dataBase').getInstance();
const { tokenizer } = require('../helpers');
const { mailService, userService } = require('../services');

module.exports = {
  restorePassword: async (req, res, next) => {
    const transaction = await instanceTransaction();
    try {
      const { id, name, email } = req.user;

      const restore_token = tokenizer.restoreToken();

      const urlWithToken = `${PROTOCOL}${DOMEN}/users/restore_token?restore_token=${restore_token}`;

      await mailService.sendMail(email, emailActions.RESTORE, { name, urlWithToken });

      await userService.updateUser(id, { restoreToken: restore_token }, transaction);

      await transaction.commit();
      res.json(statusMessages.CHECK_EMAIL_FOR_RESET);
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  },
};
