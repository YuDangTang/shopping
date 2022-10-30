import express from "express";
import {getProductDetail, postProductDetail} from "../controllers/Product/productController.js";
const productRouter = express.Router();


productRouter.route("/:id").get(getProductDetail).post(postProductDetail);
 
export default productRouter;