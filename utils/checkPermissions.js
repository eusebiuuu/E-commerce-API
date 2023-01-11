const { UnauthorizedError } = require("../errors");

const checkPermissions = (requestUser, requestedUserID) => {
  console.log(typeof requestedUserID);
  if (requestUser.role === 'admin') {
    return;
  } else if (requestUser.userID === requestedUserID.toString()) {
    return;
  }
  throw new UnauthorizedError('You don`t have permission to access this route');
}

module.exports = checkPermissions;