import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    material: { type: String, required: true, unique: true },
});

const Material = mongoose.model("Material", materialSchema);
export default Material;