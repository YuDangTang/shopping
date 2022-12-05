import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    // order_ID: { type: String, required: true, unique: true }, //상품 샀는지 안 샀는지
    pro_ID: { type: String, required: true }, //상품 id
    proGPA: { type: Boolean, required: true }, //조아유 싫어유
    proReview: { type: String, required: true }, //상품 리뷰
    userId: { type: String, required: true, minLength: 4, maxLength: 12 }, //유저 id
    // userImg:[{type: String}], //유저가 등록한 이미지
});
const Review = mongoose.model("Review", reviewSchema);
export default Review;