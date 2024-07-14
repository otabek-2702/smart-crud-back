const AsyncHandler = require("express-async-handler");
const Admin = require("../model/staff/admin");
const Seller = require("../model/staff/seller");
const { hashPassword, isPassMatched } = require("../utils/helpers");
const generateToken = require("../utils/generateToken");

// @desc Admin register seller
// @route POST /api/sellers/register
// @access Private (admin only)
exports.registerSeller = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if seller already exists
  const sellerExist = await Seller.findOne({ email });
  if (sellerExist) {
    throw new Error("Seller already registered");
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create new seller
  const newSeller = await Seller.create({
    name,
    email,
    password: hashedPassword,
    createdBy: req.userAuth._id // Save the admin who created this seller
  });

  res.status(201).json({
    status: "success",
    message: "Seller registered successfully",
    data: newSeller
  });
});

// @desc Seller login
// @route POST /api/sellers/login
// @access Private
exports.loginSeller = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the seller by email
  const seller = await Seller.findOne({ email });

  // Check if seller exists
  if (!seller) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Verify password
  const isMatched = await isPassMatched(password, seller.password);

  if (!isMatched) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = generateToken(seller._id);

  res.status(200).json({
    status: "success",
    message: "Seller logged in successfully",
    data: token
  });
});

// @desc Get all sellers
// @route GET /api/sellers
// @access Private (admin only)
exports.getSellers = AsyncHandler(async (req, res) => {
  const sellers = await Seller.find();
  res.status(200).json({
    status: "success",
    message: "Sellers fetched successfully",
    data: sellers
  });
});

// @desc Get single seller by ID
// @route GET /api/sellers/:sellerID
// @access Private (admin only)
exports.getSeller = AsyncHandler(async (req, res) => {
  const sellerID = req.params.sellerID;
  const seller = await Seller.findById(sellerID);
  if (!seller) {
    throw new Error("Seller not found");
  }
  res.status(200).json({
    status: "success",
    message: "Seller fetched successfully",
    data: seller
  });
});

// @desc Update seller profile
// @route PUT /api/sellers/:sellerID
// @access Private (seller only)
exports.updateSeller = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const sellerID = req.params.sellerID;

  // Hash the password if it is being updated
  let hashedPassword;
  if (password) {
    hashedPassword = await hashPassword(password);
  }

  // Find the seller by ID and update
  const updatedSeller = await Seller.findByIdAndUpdate(
    sellerID,
    { name, email, password: hashedPassword },
    { new: true, runValidators: true }
  );

  if (!updatedSeller) {
    throw new Error("Seller not found");
  }

  res.status(200).json({
    status: "success",
    message: "Seller updated successfully",
    data: updatedSeller
  });
});

// @desc Delete seller
// @route DELETE /api/sellers/:sellerID
// @access Private (admin only)
exports.deleteSeller = AsyncHandler(async (req, res) => {
  const sellerID = req.params.sellerID;

  // Find the seller by ID and delete
  const deletedSeller = await Seller.findByIdAndDelete(sellerID);

  if (!deletedSeller) {
    throw new Error("Seller not found");
  }

  res.status(200).json({
    status: "success",
    message: "Seller deleted successfully",
    data: deletedSeller
  });
});
