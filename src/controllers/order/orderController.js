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
            let index;
            for(var i = 0; i < del.products.length; i++){
                if(del.products[i].id == req.body.deteId){
                    index = i;
                    break;
                }
            }
            del.products.splice(i, 1);
            await Cart.updateOne({userID: req.body.userId}, {$set: {products: del.products}})
            return res.send("success");
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
        const cart = await Cart.findOne({userID: data.userID});
        for(var i = 0; i < cart.products.length; i++){

        }
        await Order.create({
            pro_ID : data.pro_ID,
            buyerName: data.buyer_name,
            buyerTel: data.buyer_tel,
            recipientName: data.recipient,
            recipAddress: data.recipAddress,
            recipientTel: data.recipientTel,
            payPrice: {
                cost: data.cost,
                payAmount: data.amount,
            },
        })
    }
}