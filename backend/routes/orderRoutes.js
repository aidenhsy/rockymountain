import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const Router = express.Router();

import {
  createOrder,
  getOrderDetails,
  updateOrderToPaid,
} from "../controllers/orderControllers.js";

Router.route("/").post(protect, createOrder);
Router.route("/:id").get(protect, getOrderDetails);
Router.route("/:id/pay").put(protect, updateOrderToPaid);

export default Router;
