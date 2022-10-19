import mongoose from "mongoose";

const objSchema = new mongoose.Schema({
    imgPath: [{ type: String }],
});

const Obj = mongoose.model("Obj", objSchema);
export default Obj;