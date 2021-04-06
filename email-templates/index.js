const { emailActions } = require('../constants');

module.exports = {
  [emailActions.CONFIRM]: {
    templateName: 'confirm-email',
    subject: 'Confirm your email'
  },

  [emailActions.RESTORE]: {
    templateName: 'reset-password',
    subject: 'Reset your password'
  }
};
