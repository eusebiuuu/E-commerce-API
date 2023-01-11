const express = require('express');
const userRouter = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/user.controller');
const { authenticateUser, authorisePermissions } = require('../middleware/authentication');

userRouter.get('/', authenticateUser, authorisePermissions('user', 'admin'), getAllUsers);
userRouter.get('/showMe', authenticateUser, showCurrentUser);
userRouter.get('/:id', authenticateUser, getSingleUser);
userRouter.patch('/', authenticateUser, updateUser);
userRouter.patch('/password', authenticateUser, updateUserPassword);

module.exports = userRouter;
