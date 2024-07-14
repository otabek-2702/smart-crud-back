const AsyncHandler = require("express-async-handler");
const Admin = require("../model/staff/admin");
const { hashPassword, isPassMatched } = require("../utils/helpers");
const generateToken = require("../utils/generateToken");

// @desc Admin login
// @route POST /api/admins/login
// @access Public
exports.loginAdmin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the admin by email
  const admin = await Admin.findOne({ email });

  // Check if admin exists
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Verify password
  const isMatched = await isPassMatched(password, admin.password);

  if (!isMatched) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = generateToken(admin._id);

  res.status(200).json({
    status: "success",
    message: "Admin logged in successfully",
    data: token
  });
});

// @desc Get all admins
// @route GET /api/admins
// @access Private (admin only)
exports.getAdmins = AsyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: "success",
    message: "Admins fetched successfully",
    data: admins
  });
});

// @desc Get single admin by ID
// @route GET /api/admins/:adminID
// @access Private (admin only)
exports.getAdmin = AsyncHandler(async (req, res) => {
  const adminID = req.params.adminID;
  const admin = await Admin.findById(adminID);
  if (!admin) {
    throw new Error("Admin not found");
  }
  res.status(200).json({
    status: "success",
    message: "Admin fetched successfully",
    data: admin
  });
});

// @desc Update admin profile
// @route PUT /api/admins/:adminID
// @access Private (admin only)
exports.updateAdmin = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const adminID = req.params.adminID;

  // Hash the password if it is being updated
  let hashedPassword;
  if (password) {
    hashedPassword = await hashPassword(password);
  }

  // Find the admin by ID and update
  const updatedAdmin = await Admin.findByIdAndUpdate(
    adminID,
    { name, email, password: hashedPassword },
    { new: true, runValidators: true }
  );

  if (!updatedAdmin) {
    throw new Error("Admin not found");
  }

  res.status(200).json({
    status: "success",
    message: "Admin updated successfully",
    data: updatedAdmin
  });
});

// @desc Delete admin
// @route DELETE /api/admins/:adminID
// @access Private (admin only)
exports.deleteAdmin = AsyncHandler(async (req, res) => {
  const adminID = req.params.adminID;

  // Find the admin by ID and delete
  const deletedAdmin = await Admin.findByIdAndDelete(adminID);

  if (!deletedAdmin) {
    throw new Error("Admin not found");
  }

  res.status(200).json({
    status: "success",
    message: "Admin deleted successfully",
    data: deletedAdmin
  });
});
