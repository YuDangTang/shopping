import express from "express";

import { getBasket, postBasket,
    getOrderForm, postOrderForm } from "../controllers/order/orderController.js";

const orderRouter = express();
orderRouter.route("/basket").get(getBasket).post(postBasket);
orderRouter.route("/OrderForm").get(getOrderForm).post(postOrderForm);
export default orderRouter;