const Seller = require("../model/staff/seller");
const verifyToken = require("../utils/verifyToken");

const isSeller = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const user = await Seller.findById(verifiedToken.id).select(
    "name email role"
  );
  if (!user) {
    return res.status(401).json({ message: "Seller not found" });
  }

  req.userAuth = user;
  next();
};

module.exports = isSeller;
