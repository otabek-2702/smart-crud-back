const AsyncHandler = require("express-async-handler");
const Category = require("../model/staff/category");
const Product = require('./models/staff/product');

// @desc Create a new category
// @route POST /api/categories
// @access Private (admin only)
exports.createCategory = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Check if category already exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new Error("Category already exists");
  }

  // Create new category
  const category = await Category.create({
    name,
    description,
    createdBy: req.userAuth._id
  });

  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: category
  });
});

// @desc Get all categories
// @route GET /api/categories
// @access Private (admin only)
exports.getCategories = AsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    data: categories
  });
});

// @desc Get a single category by ID
// @route GET /api/categories/:categoryID
// @access Private (admin only)
exports.getCategoryById = AsyncHandler(async (req, res) => {
  const categoryID = req.params.categoryID;
  const category = await Category.findById(categoryID);
  if (!category) {
    throw new Error("Category not found");
  }
  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    data: category
  });
});

// @desc Update a category
// @route PUT /api/categories/:categoryID
// @access Private (admin only)
exports.updateCategory = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categoryID = req.params.categoryID;

  // Find the category by ID and update
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryID,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!updatedCategory) {
    throw new Error("Category not found");
  }

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: updatedCategory
  });
});

// @desc Delete a category
// @route DELETE /api/categories/:categoryID
// @access Private (admin only)
exports.deleteCategory = AsyncHandler(async (req, res) => {
  const categoryID = req.params.categoryID;

  // Delete products associated with the category
  await Product.deleteMany({ category: categoryID });

  // Find the category by ID and delete
  const deletedCategory = await Category.findByIdAndDelete(categoryID);

  if (!deletedCategory) {
    throw new Error("Category not found");
  }

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    data: deletedCategory
  });
});
