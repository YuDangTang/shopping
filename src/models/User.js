import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    userPw: { type: String, required: true },
    userName: { type: String, required: true },
    userTel: { type: Number, required: true, 
                minLength: 11, maxLength: 11 },
    userAddress: { type: String, required: true },
    userBirth: { type: Number, required: true,
                    minLength: 8, maxLength: 8 },
    userGrade: { type: String, required: true, default: "white"},
    userPoint: { type: Number, required: true, default: 0 },
});

const User = mongoose.model("User", userSchema);
export default User;