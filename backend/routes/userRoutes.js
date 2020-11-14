import {
  login,
  register,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const Router = express.Router();

Router.route("/login").post(login);
Router.route("/").post(register);
Router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default Router;
