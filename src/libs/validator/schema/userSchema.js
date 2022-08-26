const Joi = require('joi');

module.exports = {
  login: Joi.object({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  register: Joi.object({
    body: Joi.object({
      email: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().allow('', null),
      password: Joi.string().required(),
    }),
  }),
};
