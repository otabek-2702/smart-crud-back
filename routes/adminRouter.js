const express = require("express");
const {
  loginAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin
} = require("../controller/adminCtrl");
const isAdmin = require("../middlewares/isAdmin");

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/", isAdmin, getAdmins);
adminRouter.get("/:adminID", isAdmin, getAdmin);
adminRouter.put("/:adminID", isAdmin, updateAdmin);
adminRouter.delete("/:adminID", isAdmin, deleteAdmin);

module.exports = adminRouter;
