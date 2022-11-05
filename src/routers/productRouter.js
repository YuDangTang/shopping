import express from "express";
import { getProductDetail, postProductDetail, postProBoard } from "../controllers/Product/productController.js";
const productRouter = express.Router();

productRouter.route("/:id").get(getProductDetail).post(postProductDetail);
productRouter.route("/:id/postCommend").post(postProBoard);

export default productRouter;