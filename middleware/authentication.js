const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isValidToken } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  console.log(token);
  if (!token) {
    throw new UnauthenticatedError('You are not logged in (no token present)');
  }
  try {
    const { name, role, userID } = isValidToken(token);
    req.userInfo = { name, role, userID };
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError('Invalid token');
  }
  next();
}

const authorisePermissions = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.userInfo.role)) {
      throw new UnauthorizedError('You don`t have permission for this action');
    }
    next();
  }
}

module.exports = {
  authenticateUser,
  authorisePermissions,
}