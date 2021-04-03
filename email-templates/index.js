const { emailActions } = require('../constants');

module.exports = {
  [emailActions.CONFIRM]: {
    templateName: 'confirm-email',
    subject: 'Confirm your email'
  }
};