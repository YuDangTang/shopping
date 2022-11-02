import express from "express";
import Cart from "../models/Cart.js"; 
import Order from "../models/Order.js"; 
import { getBasket, postBasket,
    getOrderForm, postOrderForm } from "../controllers/order/orderController.js";

const orderRouter = express();
orderRouter.route("/basket").get(getBasket).post(postBasket);
orderRouter.route("/OrderForm").get(getOrderForm).post(postOrderForm);
export default orderRouter;