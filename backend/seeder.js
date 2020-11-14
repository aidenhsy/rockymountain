import User from "../backend/models/User.js";
import Product from "../backend/models/Product.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import users from "./data/users.js";
import products from "./data/products.js";

dotenv.config();
connectDB();

const dataIn = asyncHandler(async () => {
  await User.deleteMany();
  await Product.deleteMany();

  const createdUsers = await User.insertMany(users);
  const adminUser = createdUsers[0]._id;
  const sampleProducts = products.map((product) => {
    return { ...product, user: adminUser };
  });

  await Product.insertMany(sampleProducts);
  console.log("data imported");
  process.exit();
});

const dataOut = asyncHandler(async () => {
  await User.deleteMany();
  await Product.deleteMany();
  console.log("data removed");
  process.exit();
});

if (process.argv[2] === "-d") {
  dataOut();
} else {
  dataIn();
}
