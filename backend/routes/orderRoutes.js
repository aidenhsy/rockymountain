import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const Router = express.Router();

import {
  createOrder,
  getOrderDetails,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  deleteOrder,
  updateOrderToDelivered,
} from "../controllers/orderControllers.js";

Router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
Router.route("/myorders").get(protect, getMyOrders);
Router.route("/:id")
  .get(protect, getOrderDetails)
  .delete(protect, admin, deleteOrder);
Router.route("/:id/pay").put(protect, updateOrderToPaid);
Router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default Router;
