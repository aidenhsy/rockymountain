import express from "express";
const Router = express.Router();

import {
  getProducts,
  getProductDetails,
} from "../controllers/productControllers.js";

Router.route("/").get(getProducts);
Router.route("/:id").get(getProductDetails);

export default Router;
