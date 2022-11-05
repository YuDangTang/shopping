import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    pay_ID : {type: String, required: true },
    pro_ID : [{
        proName: { type: String, required: true },
        cartQuan: [{
            size: { type: String, required: true },
            colorAmount: [{
                color: { type: String, required: true },
                quan: { type: String, required: true },
            }]
        }]
    }],
    user_ID : { type: String, required: true },
    buyerName: { type: String, required: true },
    buyerTel: { type: String, required: true },
    recipientName: { type: String, required: true },
    recipAddress: { type: String, required: true },
    recipientTel: { type: String, required: true },
    payPrice: {
        cost: { type: Number, default: 0, required: true},
        payAmount: { type: Number, default: 0, required: true},
    },
    payDate: { type: Date, required: true, default: Date.now  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;