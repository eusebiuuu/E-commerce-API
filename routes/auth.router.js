const express = require('express');
const { httpLogoutUser, httpLoginUser, httpRegisterUser } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.get('/logout', httpLogoutUser);
authRouter.post('/login', httpLoginUser);
authRouter.post('/register', httpRegisterUser);

module.exports = authRouter;