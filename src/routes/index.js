const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const controllers = {};
const controllerPath = path.join(__dirname, '../controllers');

fs.readdirSync(controllerPath)
  .forEach((filename) => {
    const file = filename.replace('.js', '');
    // eslint-disable-next-line
    controllers[file] = require(path.join(controllerPath, file));
  });
// Route for Authentication
router.post('/login', controllers.userController.login);
router.post('/register', controllers.userController.register);
// Route for products
router.post('/products', auth, controllers.productController.create);
router.put('/products/:id', auth, controllers.productController.update);
router.delete('/products/:id', auth, controllers.productController.deleteProduct);
router.get('/products/:id', auth, controllers.productController.detail);
router.get('/products', auth, controllers.productController.list);

module.exports = router;
