import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    cart_ID: { type: String, required: true, unique: true },
    payDate: { type: Date, required: true },
    payPrice: {
        cost: { type: Number, default: 0, required: true},
        payAmount: { type: Number, default: 0, required: true},
    },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;