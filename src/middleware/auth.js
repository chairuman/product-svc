require('dotenv').config();
const jwt = require('jsonwebtoken');
const { errorResponse } = require('../libs/response');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return errorResponse(res, 'unauthorized', 401);
  }

  try {
    const token = authorization.replace('Bearer', '').trim();
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    return next();
  } catch (error) {
    return errorResponse(res, 'unauthorized', 401);
  }
};

module.exports = verifyToken;
