// 바지, 치마
import mongoose from "mongoose";

const bottomSchema = new mongoose.Schema({
    proName: {type: String, required: true},
    detail: [{
        size: { type: String, required: true},
        waist: { type: String },    // 허리단면
        hip: { type: String },  // 힙단면
        thigh: { type: String },    // 허벅지단면
        hem: { type: String },  // 밑단단면
        crotch: { type: String },   // 밑위
        totalLength: { type: String },  // 총기장
    }],
});

const Bottom = mongoose.model("Bottom", bottomSchema);
export default Bottom;