const Joi = require('joi');

const { constants, regexpEnum } = require('../../constants');

module.exports = Joi.object({
  name: Joi
      .string()
      .alphanum()
      .min(2)
      .max(50),
  password: Joi
      .string()
      .regex(regexpEnum.PASSWORD_REGEXP),
  phone: Joi
      .string()
      .regex(regexpEnum.PHONE_REGEXP),
  gender: Joi
      .string(),
  yearBorn: Joi
      .number()
      .min(constants.CURRENT_YEAR - 100)
      .max(constants.CURRENT_YEAR - 18)
});
