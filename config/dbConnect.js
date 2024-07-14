const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../model/staff/admin");
const { hashPassword } = require("../utils/helpers");

dotenv.config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully");

    // Create Admin if not exists
    const admin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL
    });
    if (admin) {
      console.log("Admin already exists");
    } else {
      const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);
      await Admin.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "Admin"
      });
      console.log("Admin created");
    }
  } catch (error) {
    console.log("DB connection failed", error.message);
  }
};

dbConnect();
