const AsyncHandler = require("express-async-handler");
const Product = require("../model/staff/product");

// @desc Create product
// @route POST /api/products
// @access Private (seller only)
exports.createProduct = AsyncHandler(async (req, res) => {
  const { name, price, category } = req.body;
  const createdBy = req.userAuth._id; // Seller ID

  // Create new product
  const newProduct = await Product.create({
    name,
    price,
    category,
    createdBy
  });

  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: newProduct
  });
});

// @desc Get all products
// @route GET /api/products
// @access Private (admin and seller)
exports.getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    data: products
  });
});

// @desc Get single product by ID
// @route GET /api/products/:productID
// @access Private (admin and seller)
exports.getProduct = AsyncHandler(async (req, res) => {
  const productID = req.params.productID;
  const product = await Product.findById(productID);
  if (!product) {
    throw new Error("Product not found");
  }
  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    data: product
  });
});

// @desc Update product
// @route PUT /api/products/:productID
// @access Private (seller only)
exports.updateProduct = AsyncHandler(async (req, res) => {
  const { name, price, category } = req.body;
  const productID = req.params.productID;

  // Find the product by ID
  const product = await Product.findById(productID);
  if (!product) {
    throw new Error("Product not found");
  }

  // // Check if the seller is authorized to update the product
  // if (product.createdBy.toString() !== req.userAuth._id.toString()) {
  //   return res.status(403).json({
  //     status: "fail",
  //     message: "You are not authorized to update this product"
  //   });
  // }

  // Update the product
  const updatedProduct = await Product.findByIdAndUpdate(
    productID,
    { name, price, category },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: updatedProduct
  });
});

// @desc Delete product
// @route DELETE /api/products/:productID
// @access Private (admin and seller)
exports.deleteProduct = AsyncHandler(async (req, res) => {
  const productID = req.params.productID;
  const product = await Product.findById(productID);
  if (!product) {
    throw new Error("Product not found");
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    data: product
  });
});
