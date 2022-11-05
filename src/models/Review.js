import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    order_ID: { type: String, required: true, unique: true },
    proGPA: { type: Boolean, required: true },
    proReview: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;