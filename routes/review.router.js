const express = require('express');
const { createReview, getAllReviews, getSingleReview, updateReview, deleteReview, getSingleProductReviews } = require('../controllers/review.controller');
const { authenticateUser } = require('../middleware/authentication');
const reviewRouter = express.Router();

reviewRouter.post('/', authenticateUser, createReview);
reviewRouter.get('/', getAllReviews);
reviewRouter.get('/product/:id', getSingleProductReviews);
reviewRouter.get('/:id', getSingleReview);
reviewRouter.patch('/:id', authenticateUser, updateReview);
reviewRouter.delete('/:id', authenticateUser, deleteReview);

module.exports = reviewRouter;