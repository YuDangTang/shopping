import express, { application } from "express";
import {postRegProduct} from "../controllers/adminController.js"
import Product from "../models/Product.js";

const adminRouter = express.Router();

adminRouter.post("/regProDetail", postRegProduct);

export default adminRouter;