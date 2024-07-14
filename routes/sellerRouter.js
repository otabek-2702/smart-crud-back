const express = require("express");
const {
  registerSeller,
  loginSeller,
  getSellers,
  getSeller,
  updateSeller,
  deleteSeller
} = require("../controller/sellerCtrl");
const isAdmin = require("../middlewares/isAdmin");
const sellerRouter = express.Router();

sellerRouter.post("/register", isAdmin, registerSeller);
sellerRouter.post("/login", loginSeller);
sellerRouter.get("/", isAdmin, getSellers);
sellerRouter.get("/:sellerID", isAdmin, getSeller);
sellerRouter.put("/:sellerID", isAdmin, updateSeller);
sellerRouter.delete("/:sellerID", isAdmin, deleteSeller);

module.exports = sellerRouter;
