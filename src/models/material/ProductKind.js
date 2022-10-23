import mongoose from "mongoose";

const ProductKindSchema = new mongoose.Schema({
    proKinds: [{
        proKind: [{
            proType: [{
                proTypeDetail: [{
                    type: String
                }],
            }],
        }],
    }],
});

const ProductKind = mongoose.model("ProductKind", ProductKindSchema);
export default ProductKind;