import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});
