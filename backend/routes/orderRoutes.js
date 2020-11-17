import {
  addOrderItems,
  getOrderDetails,
  getMyOrders,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const Router = express.Router();

Router.route("/").post(protect, addOrderItems);
Router.route("/myorders").get(protect, getMyOrders);
Router.route("/:id").get(protect, getOrderDetails);

export default Router;
