import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    imp_uid: { type: String }, // 아임포트 `unique key`(환불 요청시 `unique key`로 사용)
    amount: { type: Number, default: 0 }, // 결제 금액(환불 가능 금액 계산시 사용)
    cancel_amount: { type: Number, default: 0 }, // 환불 된 총 금액(환불 가능 금액 계산시 사용)
});
const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;