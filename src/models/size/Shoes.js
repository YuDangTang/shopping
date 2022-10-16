import mongoose from "mongoose";

const shoesSchema = new mongoose.Schema({
    detail: [{
        size: { type: String, required: true},
        heelHeight: { type: String },   // 굽높이
        heelBall: { type: String },     // 발볼
        totalHeight: { type: String },    // 총높이
        heel: { type: String },         // 뒷굽
    }],
});

const Shoes = mongoose.model("Shoes", shoesSchema);
export default Shoes;