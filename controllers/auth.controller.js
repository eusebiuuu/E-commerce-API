const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const { UnauthenticatedError } = require('../errors');
const createUserToken = require('../utils/createUserToken');
const { attachCookiesToResponse } = require('../utils/jwt');

async function httpLoginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide all credentials');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('Email does`t exist');
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new UnauthenticatedError('Wrong password provided');
  }
  attachCookiesToResponse(res, createUserToken(user));
  res.status(StatusCodes.OK).json({ user: user });
}

async function httpLogoutUser(req, res) {
  res.cookie('token', '', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ message: 'User logged out' });
}

async function httpRegisterUser(req, res) {
  const user = req.body;
  const { email, password, name } = user;
  const userWithSameEmail = await User.findOne({ email: email });
  if (userWithSameEmail) {
    throw new BadRequestError('Email already exists');
  }
  const isFirstUser = await User.countDocuments({}) === 0;
  const role = isFirstUser ? 'admin' : 'user';
  const savedUser = await User.create({ email, password, name, role });
  const userInfo = createUserToken(savedUser);
  const authToken = attachCookiesToResponse(res, userInfo);
  return res.status(StatusCodes.CREATED).json({ user: savedUser, token: authToken });
}

module.exports = {
  httpLoginUser,
  httpLogoutUser,
  httpRegisterUser,
}