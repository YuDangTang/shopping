import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminID: { type: String, required: true, unique: true },
    adminPw: { type: String, required: true },
    adminTel: { type: Number, required: true, 
                minLength: 11, maxLength: 11 },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;