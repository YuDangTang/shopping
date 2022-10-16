import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    proName: { type: String, required: true, unique: true },
    proKindName: { type: String, required: true },
    proMaterial: [{ type: String }],
    proSize: { type: String, required: true, unique: true },
    proColor: [{
        color: { type: String, required: true },
        amout: { type: Number, required: true },
    }],
    proImg: [{ type: String }],
    proDetail: { type: String, required: true },
    proPrice: { 
        cost: { type: Number, required: true },
        price: { type: Number, required: true },
        profit: { type: Number, required: true },
     },
    proStatus: { 
        orderQuan: { type: Number, required: true },
        notiQuan: { type: Number, required: true },
        salesStatus: { type: String, required: true },
     },
    proDate: { type: Date, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;