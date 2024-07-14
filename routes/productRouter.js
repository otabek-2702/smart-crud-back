const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controller/productCtrl");
const isSeller = require("../middlewares/isSeller");
const isAdmin = require("../middlewares/isAdmin");
const isAuthorised = require("../middlewares/isAuthorised");

const productRouter = express.Router();

productRouter.post("/", isSeller, createProduct);
// productRouter.get("/", isAdmin, getProducts);
productRouter.get("/", isAuthorised, getProducts);
productRouter.get("/:productID", isAdmin, getProduct);
productRouter.put("/:productID", isSeller, updateProduct); // Update product route
productRouter.delete("/:productID", isAuthorised, deleteProduct);

module.exports = productRouter;
