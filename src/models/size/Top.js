// 드레스, 아우터, 탑, 나시, 블라우스
import mongoose from "mongoose";

const topSchema = new mongoose.Schema({
    detail: [{
        size: { type: String, required: true},
        shoulder: { type: String }, 
        chest: { type: String }, 
        armhole: { type: String }, 
        armholeSide: { type: String }, 
        sleeveSide: { type: String }, 
        sleeveLength: { type: String }, 
        totalLength: { type: String },
    }],
});

const Top = mongoose.model("Top", topSchema);
export default Top;