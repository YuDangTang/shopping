import express from "express";
import {getProductDetail, postProductDetail,
    getProductReview, postProductReview, postProBoard
} from "../controllers/Product/productController.js";
const productRouter = express.Router();


productRouter.route("/:id").get(getProductDetail).post(postProductDetail);
productRouter.route("/:id/review").get(getProductReview).post(postProductReview);
productRouter.route("/:id/postCommend").post(postProBoard);
 
export default productRouter;