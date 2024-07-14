const Admin = require("../model/staff/admin");
const verifyToken = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
  // Get token from header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  // Verify token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    // Find the admin
    const user = await Admin.findById(verifiedToken.id).select(
      "name email role"
    );
    if (user && user.role === "Admin") {
      // Save the user into req. object
      req.userAuth = user;
      next();
    } else {
      const err = new Error("Not authorized as an admin");
      next(err);
    }
  } else {
    const err = new Error("Token expired/invalid");
    next(err);
  }
};

module.exports = isAdmin;
