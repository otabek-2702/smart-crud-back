const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controller/categoryCtrl");
const isAdmin = require("../middlewares/isAdmin");
const isAuthorised = require("../middlewares/isAuthorised");
const categoryRouter = express.Router();

categoryRouter.post("/", isAdmin, createCategory);
categoryRouter.get("/", isAuthorised, getCategories);
categoryRouter.get("/:categoryID", isAuthorised, getCategoryById);
categoryRouter.put("/:categoryID", isAdmin, updateCategory);
categoryRouter.delete("/:categoryID", isAdmin, deleteCategory);

module.exports = categoryRouter;
