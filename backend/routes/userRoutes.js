import {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";

const Router = express.Router();

Router.route("/login").post(login);
Router.route("/").post(register).get(protect, admin, getUsers);
Router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default Router;
