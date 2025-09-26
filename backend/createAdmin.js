const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const hashed = await bcrypt.hash("admin@123", 10);

  await Admin.create({
    email: "admin@test.com",
    password: hashed
  });

  console.log("✅ Admin created: admin@test.com / admin123");
  process.exit();
}

createAdmin();
