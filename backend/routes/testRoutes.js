import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const Router = express.Router();

import { getMyOrders } from "../controllers/testControllers.js";

Router.route("/myorders").get(protect, getMyOrders);

export default Router;
