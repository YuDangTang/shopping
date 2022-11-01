import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    pro_ID : [{
        proName: { type: String, required: true },
        colorSizeAmount: [{
            size: { type: String, required: true },
            color: { type: String, required: true },
            amount: { type: String, required: true },
        }]
    }],
    payDate: { type: Date, required: true, default: Date.now  },
    buyerName: { type: String, required: true },
    buyerTel: { type: String, required: true },
    recipientName: { type: String, required: true },
    recipAddress: { type: String, required: true },
    recipientTel: { type: String, required: true },
    payPrice: {
        cost: { type: Number, default: 0, required: true},
        payAmount: { type: Number, default: 0, required: true},
    },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;