const Admin = require("../model/staff/admin");
const Seller = require("../model/staff/seller");
const verifyToken = require("../utils/verifyToken");

const isAdminOrSeller = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const admin = await Admin.findById(verifiedToken.id).select(
    "name email role"
  );
  const seller = await Seller.findById(verifiedToken.id).select(
    "name email role"
  );

  if (admin || seller) {
    req.userAuth = admin || seller;
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Not authorized as an admin or seller" });
  }
};

module.exports = isAdminOrSeller;
