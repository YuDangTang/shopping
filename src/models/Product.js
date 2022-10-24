import mongoose from "mongoose";

//아이템 선언

const productSchema = new mongoose.Schema({
    proName: { type: String, required: true, unique: true },
    proKindName: { type: String, required: true },
    proMaterial: [{ type: String }],
    proSize: [{
        proSize_ID: {type:String, required: true, unique: true},
        proColor: [{   
            size: { type: String, required: true },
            colorAmout: [{
                color: { type: String, required: true },
                amout: { type: Number, required: true },
                orderQuan: { type: Number, required: true, default: 0 },
                notiQuan: { type: Number, required: true, default: 0 },
                salesStatus: { type: String, required: true, default: "판매" },
            }],
        }],
    }],
    proImg: [{ type: String }],
    proDetail: { type: String, required: true },
    proPrice: { 
        cost: { type: Number, required: true },
        price: { type: Number, required: true },
        profit: { type: Number, required: true},
     },
    proStatus: { type: String, required: true, default: "판매"},
    proDate: { type: Date, required: true, default: Date.now },
});

const Product = mongoose.model("Products", productSchema);
export default Product;