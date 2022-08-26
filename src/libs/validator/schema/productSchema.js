const Joi = require('joi');

module.exports = {
  createProduct: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      kode: Joi.string().required(),
      quantity: Joi.number().required(),
      image: Joi.string().allow('', null),
    }),
  }),
  updateProduct: Joi.object({
    body: Joi.object({
      name: Joi.string().required(),
      kode: Joi.string().required(),
      quantity: Joi.number().required(),
      image: Joi.string().allow('', null),
    }),
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  detailProduct: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  deleteProduct: Joi.object({
    params: Joi.object({
      id: Joi.number().required(),
    }),
  }),
};
