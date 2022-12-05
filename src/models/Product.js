import mongoose from "mongoose";

//아이템 선언

const productSchema = new mongoose.Schema({
    proName: { type: String, required: true, unique: true },
    proKindName: { type: String, required: true },
    proMaterial: [{ type: String }],
    proSize: [{
        proSize_ID: {type:String, required: true},
        proColor: [{   
            size: { type: String, required: true },
            colorAmout: [{
                color: { type: String, required: true },

                amout: { type: Number, required: true, default: 0 },

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


productSchema.pre('save', function (next) {
    var product = this;
    console.log(product);
    let num = 0;
    for(var i = 0 ; i < product.proSize[0].proColor.length; i++){
        for(var j = 0; j < product.proSize[0].proColor[i].colorAmout.length; j++){
            const amount = product.proSize[0].proColor[i].colorAmout[j];
            if(amount.amout == 0 || (amount.amout - amount.orderQuan) <= 0){
                amount.salesStatus = "품절";
            }else{ num++; }
        }
    }
    if(num == 0){
        product.num = "품절";
    }
    next();
});
productSchema.static("salesStatus", function(product){
    var product = product;
    let num = 0;
    for(var k = 0; k < product.length; k++){
        for(var i = 0 ; i < product[k].proColor.length; i++){
            for(var j = 0; j < product[k].proColor[i].colorAmout.length; j++){
                const amount = product[k].proColor[i].colorAmout[j];
                if(amount.amout == 0 || (amount.amout - amount.orderQuan) <= 0){
                    amount.salesStatus = "품절";
                }else{ num++; }
            }
        }
    }
    if(num == 0){
        product.num = "품절";
    }
    return product;
});

const Product = mongoose.model("Product", productSchema);

export default Product;