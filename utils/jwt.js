const jwt = require('jsonwebtoken');

function createJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
  console.log(token);
  return token;
}

function isValidToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

function attachCookiesToResponse(res, userInfo) {
  const authToken = createJWT(userInfo);
  const EXPIRATION_TIME = 24 * 60 * 60 * 1000;
  res.cookie('token', authToken, {
    httpOnly: true,
    expires: new Date(Date.now() + EXPIRATION_TIME),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
  console.log(authToken);
  return authToken;
}

module.exports = {
  createJWT,
  isValidToken,
  attachCookiesToResponse,
}