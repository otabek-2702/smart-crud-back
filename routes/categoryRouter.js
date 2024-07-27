const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controller/categoryCtrl");
const isAdmin = require("../middlewares/isAdmin");
const isSeller = require("../middlewares/isSeller");
const categoryRouter = express.Router();

categoryRouter.post("/", isAdmin, createCategory);
categoryRouter.get("/", [isAdmin, isSeller], getCategories);
categoryRouter.get("/:categoryID", isAdmin, getCategoryById);
categoryRouter.put("/:categoryID", isAdmin, updateCategory);
categoryRouter.delete("/:categoryID", isAdmin, deleteCategory);

module.exports = categoryRouter;
