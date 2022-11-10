import mongoose from "mongoose";

const ProductDetailSchema = new mongoose.Schema({
    pro_ID: { type: String, required: true, unique: true },
    content: { type: String }
});

const ProductDetail = mongoose.model("productDetail", ProductDetailSchema);
export default ProductDetail;