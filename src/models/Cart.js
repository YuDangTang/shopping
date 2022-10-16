import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    pro_ID: { type: String, required: true, unique: true },
    userID: { type: String, required: true, unique: true },
    cartQuan: {
        color: { type: String, required: true},
        quan: { type: Number, required: true},
    },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;