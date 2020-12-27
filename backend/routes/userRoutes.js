import {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import express from "express";

const Router = express.Router();

Router.route("/login").post(login);
Router.route("/").post(register).get(protect, admin, getUsers);
Router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
Router.route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default Router;
