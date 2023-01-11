const express = require('express');
const { createOrder, getAllOrders, getSingleOrder, getCurrentUserOrders, updateOrder } = require('../controllers/order.controller');
const { authenticateUser, authorisePermissions } = require('../middleware/authentication');
const orderRouter = express.Router();

orderRouter.post('/', authenticateUser, createOrder);
orderRouter.get('/', [authenticateUser, authorisePermissions('admin')], getAllOrders);
orderRouter.get('/user', authenticateUser, getCurrentUserOrders);
orderRouter.get('/:id', authenticateUser, getSingleOrder);
orderRouter.patch('/:id', updateOrder);

module.exports = orderRouter;