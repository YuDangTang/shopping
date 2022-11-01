import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    products: [{
        proName: { type: String},
        cartQuan: [{
            size: { type: String},
            colorAmount: [{
                color: { type: String},
                quan: { type: Number}
            }],
        }],
    }],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;