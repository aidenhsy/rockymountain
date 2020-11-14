import { addOrderItems } from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const Router = express.Router();

Router.route("/").post(protect, addOrderItems);

export default Router;
