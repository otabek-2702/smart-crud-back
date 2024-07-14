const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Admin"],
    default: "Admin"
  }
});

// model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
