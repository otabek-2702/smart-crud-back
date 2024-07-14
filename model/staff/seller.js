const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  role: {
    type: String,
    enum: ["seller"],
    default: "seller"
  }
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
