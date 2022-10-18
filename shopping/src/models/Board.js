import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    Qtitle: { type: String, required: true },
    Qcontent: { type: String, required: true },
    adminID: { type: String },
    Acontent: { type: String },
});

const Board = mongoose.model("Board", boardSchema);
export default Board;