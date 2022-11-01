import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";

export const getProductDetail = async(req, res) => {
    
}
export const postProductDetail = async(req, res) => {
    console.log("데이터받아온거: ", req.body)
    if(req.body.id != null){
        const id = req.body.id;
        const product = await Product.findOne({"_id" : id});
        console.log(product)
        if(product != null){
            return res.send(product);
        }
    }else if(req.body.product != null){
        const cart = req.body;
        const find = await Cart.findOne({userID : cart.userID});
        if(find == null){
            try{
                await Cart.create({
                    userID: cart.userID,
                    // products: [{
                    //     proName: cart.proName,
                    //     cartQuan,
                    // }],
                });
                return res.send("fail");
            }catch(error){console.log(error); return res.send("fail");}
        }else{
            // 1. 장바구니에 존재하는 상품인지(있으면 alert)
            // 2. updateOne
            const product = await Cart.findOne({$and: [
                {userID: cart.userID}, 
                {products: {$elemMatch: {proName: cart.proName}}}
            ]});
            if(product == null){    // 장바구니에 없는 상품
                console.log("장바구니에 없음")
                const sizeArr = [];
                const obj = {
                    proName: cart.proName,
                    cartQuan: [],
                }
                let k = 0;
                for(var i = 0; i < cart.product.length; i++){
                    if(sizeArr.includes(cart.product[i].proSize)){
                        for(var j = 0; j < obj.cartQuan.length;j++){
                            console.log("사이즈: ", obj.cartQuan[j].size, cart.product[i].proSize)
                            if(obj.cartQuan[j].size == cart.product[i].proSize){
                                let num = 0;
                                for(var w = 0; w < obj.cartQuan[j].colorAmount.length; w++){
                                    console.log("색상: ", obj.cartQuan[j].colorAmount[w].color, cart.product[i].proColor)
                                    if(obj.cartQuan[j].colorAmount[w].color == cart.product[i].proColor){
                                        obj.cartQuan[j].colorAmount[w].quan += cart.product[i].proAmount;
                                        num++;
                                    }
                                }   
                                if(num == 0){
                                    const obj2 = {
                                        color: cart.product[i].proColor,
                                        quan: cart.product[i].proAmount
                                    }
                                    obj.cartQuan[j].colorAmount.push(obj2);
                                }        
                            }
                        }
                    }else{
                        const inputDB = {};
                        inputDB.size = cart.product[i].proSize;
                        inputDB.colorAmount = [];
                        const inputDB2 = {};
                        inputDB2.color = cart.product[i].proColor;
                        inputDB2.quan = cart.product[i].proAmount;
                        inputDB.colorAmount.push(inputDB2);
                        obj.cartQuan.push(inputDB);
                        sizeArr.push(cart.product[i].proSize)
                    }
                }
                find.products.push(obj);
                try{
                    const updateCart = await Cart.updateOne({userID: cart.userID}, {$set: find});
                    if(!updateCart){return res.send("fail")}
                }catch(error){console.log(error); return res.send("fail")}

            }else{ // 장바구니에 있는 상품
                console.log("장바구니에 있는 상품")
                const sizeArr = [];
                let index;
                for(var i = 0; i < product.products.length; i++){
                    if(product.products[i].proName == cart.proName){
                        index = i;
                        for(var j = 0; j < product.products[i].cartQuan.length; j++){
                            sizeArr.push(product.products[i].cartQuan[j].size);
                        }
                    }
                }
                
                for(var i = 0; i < cart.product.length; i++){
                    if(sizeArr.includes(cart.product[i].proSize)){
                        for(var j = 0; j < find.products[index].cartQuan.length ; j++ ){
                            if(find.products[index].cartQuan[j].size 
                                    == cart.product[i].proSize){
                                let num = 0;
                                for(var w = 0; w < find.products[index].cartQuan[j].colorAmount.length; w++){
                                    console.log(cart.product[i].proSize, find.products[index].cartQuan[j].colorAmount[w].color,
                                        cart.product[i].proColor)
                                    if(find.products[index].cartQuan[j].colorAmount[w].color == cart.product[i].proColor){
                                        find.products[index].cartQuan[j].colorAmount[w].quan += cart.product[i].proAmount;
                                        num++;
                                    }
                                }
                                if(num == 0){
                                    const obj2 = {
                                        color: cart.product[i].proColor,
                                        quan: cart.product[i].proAmount
                                    }
                                    find.products[index].cartQuan[j].colorAmount.push(obj2);
                                }
                            }
                        }
                    }else{
                        const arr= {
                            size: cart.product[i].proSize,
                            colorAmount: []
                        };
                        const obj = {
                            color: cart.product[i].proColor,
                            quan: cart.product[i].proAmount
                        };
                        arr.colorAmount.push(obj);
                        find.products[index].cartQuan.push(arr);
                        sizeArr.push(cart.product[i].proSize);   // 기존에 있는 사이즈인지 확인
                    }
                }
                for(var i = 0 ; i < find.products[0].cartQuan.length; i++){
                    console.log("제바아아알: ", find.products[0].cartQuan[i])
                }
                try{
                    const updateData = await Cart.updateOne({userID: cart.userID}, {$set: find});
                    if(!updateData){console.log("업데이트 실패"); return res.send("fail");}
                }catch(error){
                    console.log(error);
                    return res.send("fail");
                }
            }
        }
        return res.send("success")
    }
    
    return res.send("fail");
} 