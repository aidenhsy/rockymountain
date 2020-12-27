import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const Router = express.Router();

import {
  getProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProduct,
  createProductReview,
} from "../controllers/productControllers.js";

Router.route("/").get(getProducts).post(protect, admin, createProduct);
Router.route("/listProducts").get(protect, admin, getProducts);
Router.route("/:id")
  .get(getProductDetails)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
Router.route("/:id/reviews").post(protect, createProductReview);

export default Router;
