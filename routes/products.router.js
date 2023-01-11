const express = require('express');
const { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/products.controller');
const { authenticateUser, authorisePermissions } = require('../middleware/authentication');
const productsRouter = express.Router();

productsRouter.post('/', [authenticateUser, authorisePermissions('admin')], createProduct);
productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getSingleProduct);
productsRouter.patch('/:id', [authenticateUser, authorisePermissions('admin')], updateProduct);
productsRouter.delete('/:id', [authenticateUser, authorisePermissions('admin')], deleteProduct);
productsRouter.post('/upload', uploadImage);

module.exports = productsRouter;