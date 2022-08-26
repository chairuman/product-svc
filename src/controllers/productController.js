const { safelyStringifyJSON } = require('../libs/parser');
const { errorResponse, successResponse, pagination } = require('../libs/response');
const validator = require('../libs/validator');
const { Product } = require('../models');

const create = async (req, res) => {
  try {
    await validator(req, 'createProduct');

    const {
      name, kode, quantity, image,
    } = req.body;

    const extProduct = await Product.findOne({ where: { kode } });
    if (extProduct) {
      return errorResponse(res, 'Product code already exist.', 400);
    }
    const product = await Product.create({
      nama: name,
      kode,
      quantity,
      image,
    });

    return successResponse(res, product.toJSON());
  } catch (error) {
    if (error.isJoi === true) return errorResponse(res, error.message, 422);
    return errorResponse(res, error.message);
  }
};

const update = async (req, res) => {
  try {
    await validator(req, 'updateProduct');
    const {
      name, kode, quantity, image,
    } = req.body;
    const { id } = req.params;
    let product = await Product.findOne({ where: { id } });

    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    product.set({
      nama: name,
      kode,
      quantity,
      image,
    });

    product = await product.save();

    return successResponse(res, product);
  } catch (error) {
    if (error.isJoi === true) return errorResponse(res, error.message, 422);
    return errorResponse(res, safelyStringifyJSON(error.message));
  }
};

const deleteProduct = async (req, res) => {
  try {
    await validator(req, 'deleteProduct');
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    const deleted = await product.destroy();
    if (deleted) {
      return successResponse(res, {}, null, 'Product deleted successfully');
    }
    return errorResponse(res, 'Failed to delete product', 400);
  } catch (error) {
    if (error.isJoi === true) return errorResponse(res, error.message, 422);
    return errorResponse(res, safelyStringifyJSON(error.message));
  }
};

const list = async (req, res) => {
  try {
    const {
      page = 1, perPage = 10,
    } = req.query;

    const { rows, count } = await Product.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    return successResponse(res, rows, pagination({ page, perPage, count }));
  } catch (error) {
    return errorResponse(res, safelyStringifyJSON(error.message));
  }
};

const detail = async (req, res) => {
  try {
    await validator(req, 'detailProduct');
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }
    return successResponse(res, product);
  } catch (error) {
    if (error.isJoi === true) return errorResponse(res, error.message, 422);
    return errorResponse(res, safelyStringifyJSON(error.message));
  }
};

module.exports = {
  create,
  update,
  deleteProduct,
  list,
  detail,
};
