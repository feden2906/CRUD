module.exports = {
  CHECK_EMAIL_FOR_ACTIVATE: 'Check your email for activation account',

  FORBIDDEN: 'Forbidden',

  TOKEN_IS_REQUIRED: 'Token is required',
  TOKEN_NOT_VALID: 'Not valid Token',

  USER_DELETED_NOW: 'Remove was successful',
  USER_IS_EXISTS: 'User with this email exists',
  USER_NOT_FOUND: 'User not found',
  USER_WAS_CREATED: 'User was created',
  USER_WAS_DELETED: (data) => `User account was deleted at ${data}`,
  USER_WAS_UPDATED: 'User was updated',

  UNAUTHORIZED: 'Must authorization',

  WRONG_EMAIL_ACTION: 'Wrong email action',
  WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password',

  // NOT_VALID_ID: 'Not Valid ID',
  NOT_VALID_FILE: 'Not allowed file type',
  FILE_TOO_BIG: 'File to big',
  JUST_ONE_PHOTO: 'Can upload only one photo via field - "avatar"',
};
