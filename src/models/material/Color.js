import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
    color: { type: String, required: true, unique: true },
    colorCode: { type: String },
});

const Color = mongoose.model("Color", colorSchema);
export default Color;