import session from "express-session";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
export const getBasket = (req, res) => {
    console.log("hI?");
    console.log(session.user);
}
export const postBasket = async(req, res) => {
    if(req.body.id != null){
        const user = req.body.id;
        const basket = await Cart.findOne({userID: user});
        if(basket != null){
            const data = {products:[]};
            for(var i = 0; i < basket.products.length; i++){
                const product = await Product.findOne({proName: basket.products[i].proName});
                const cart = {};
                cart.productInfo = product;
                cart.carInfo = basket.products[i];
                data.products.push(cart)
            }
            console.log(data)
            if(data == null){return res.send({})}
            return res.send(data);
        }
    }else if(req.body.deteId != null){
        try{
            // req.body.deteId
            const del = await Cart.findOne({userID: req.body.userId});
            for(var i = 0; i < del.products.length; i++){
                if(del.products[i].proName == req.body.proName){
                    for(var j = 0; j < del.products[i].cartQuan.length; j++){
                        for(var k = 0; k < del.products[i].cartQuan[j].colorAmount.length; k++){
                            if(del.products[i].cartQuan[j].colorAmount[k].id == req.body.deteId){
                                del.products[i].cartQuan[j].colorAmount.splice(i, 1);
                                try{
                                    await Cart.updateOne({userID: req.body.userId}, {$set: {products: del.products}})
                                    return res.send("success");
                                }catch(error){console.log(error); return res.send("fail")}
                            }
                        }
                    } 
                }
            }
        }catch(error){console.log(error); return res.send("fail")}
    }else if(req.body.updateId != null){
        const data = req.body;
        try{
            const modifyData = await Cart.findOne({userID: req.body.userId});
            for(var i = 0; i < modifyData.products.length; i++){
                if(modifyData.products[i].id == data.updateId){
                    for(var j = 0; j < modifyData.products[i].cartQuan.length; j++){
                        if(modifyData.products[i].cartQuan[j].size == data.size){
                            for(var k = 0; k < modifyData.products[i].cartQuan[j].colorAmount.length; k++){
                                if(modifyData.products[i].cartQuan[j].colorAmount[k].color == data.color){
                                    modifyData.products[i].cartQuan[j].colorAmount[k].quan = data.updateAmount;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            try{
                await Cart.updateOne({userID: req.body.userId}, {$set: {products: modifyData.products}})
            }catch(error){console.log(error); return res.send("fail")}
            return res.send("success");
        }catch(error){console.log(error); return res.send("fail")}
    }
    return res.send([]);
}
export const getOrderForm = async(req, res) => {
    
}
export const postOrderForm = async(req, res) => {
    if(req.body.buyer_name != null){
        const data = req.body;
        // const cart = await Cart.findOne({userID: data.userID});
        // for(var i = 0; i < cart.products.length; i++){

        // }
        try{
            await Order.create({
                pro_ID : data.pro_ID,
                user_ID : data.userID,
                buyerName: data.buyer_name,
                buyerTel: data.buyer_tel,
                recipientName: data.recipient,
                recipAddress: data.recipAddress,
                recipientTel: data.recipientTel,
                payPrice: data.payPrice,
            })
            const cart = await Cart.findOne({userID: data.userID});
            // 결제 후 장바구니 비우기 필요
            for(var i = 0; i < cart.products.length; i++){
                for(var j = 0; j < data.pro_ID.length; j++){
                    if(cart.products[i].proName == data.pro_ID[j].proName){
                        let idx = 0;
                        for(var k = 0; k < data.pro_ID[j].colorSizeAmount.length; k++){
                            if(cart.products[i].cartQuan[j].size == data.pro_ID[j].colorSizeAmount[k].size){
                                for(var q = 0; q < data.pro_ID[j].colorSizeAmount[k].sizeColorAmount.length; q++){
                                    if(cart.products[i].cartQuan[j].colorAmount[k].color
                                        == data.pro_ID[j].colorSizeAmount[k].sizeColorAmount[q].color){
                                            cart.products[i].cartQuan[j].colorAmount.splice(k, 1);
                                            break;
                                        }
                                }
                            }
                        }
                    } 
                }
            }
            try{
                const updateData = await Cart.updateOne({userID: data.userID}, {$set: cart});
                if(!updateData){console.log("업데이트 실패"); return res.send("fail");}
                return res.send("success");
            }catch(error){console.log(error); return res.send("fail");}
            return res.send("success");
        }catch(error){console.log(error); return res.send("fail");}
    }
}