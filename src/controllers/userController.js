/* eslint-disable camelcase */
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('../libs/validator');
const { successResponse, errorResponse } = require('../libs/response');
const { User } = require('../models');
const { safelyStringifyJSON } = require('../libs/parser');

const login = async (req, res) => {
  try {
    await validator(req, 'login');
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_LIFETIME },
      );

      const data = {
        id: user.id,
        email: user.email,
        access_token: token,
      };

      return successResponse(res, data);
    }
    return errorResponse(res, 'Invalid credentials. please check again your input.', 400);
  } catch (error) {
    if (error.isJoi === true) return errorResponse(res, error.message, 422);
    return errorResponse(res, safelyStringifyJSON(error.message));
  }
};

const register = async (req, res) => {
  try {
    await validator(req, 'register');
    const {
      first_name, last_name, email, password,
    } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return errorResponse(res, 'Email already registered, please use another email.', 400);
    }

    await User.create({
      first_name,
      last_name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return successResponse(res, {}, null, 'User registered successfully!');
  } catch (error) {
    if (error.isJoi === true) return errorResponse(res, error.message, 422);
    return errorResponse(res, safelyStringifyJSON(error.message));
  }
};

module.exports = { login, register };
