import session from "express-session";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
import Payment from "../../models/Payment.js";
import { cartSplice, cartProSplice, cartAmountSplice } from "./orderSplice.js";

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
        const del = await Cart.findOne({userID: req.body.userId});
        outer: for(var i = 0; i < del.products.length; i++){
            if(del.products[i].proName == req.body.proName){
                for(var j = 0; j < del.products[i].cartQuan.length; j++){
                    for(var k = 0; k < del.products[i].cartQuan[j].colorAmount.length; k++){
                        if(del.products[i].cartQuan[j].colorAmount[k].id == req.body.deteId){
                            console.log("지울거: ", del.products[i].cartQuan[j].colorAmount[k]);
                            del.products[i].cartQuan[j].colorAmount.splice(k, 1);
                            try{
                                await Cart.updateOne({userID: req.body.userId}, 
                                    {$set: {products: del.products}});
                            }catch(error){console.log(error); return res.send("fail")}
                            break outer;
                        }
                    }
                } 
            }
        }
        const sizeArr = [];
        const nameArr = [];
        const cart = await Cart.findOne({userID: req.body.userId});
        for(var i = 0; i < cart.products.length; i++){
            for(var j = 0; j < cart.products[i].cartQuan.length; j++){
                if(cart.products[i].cartQuan[j].colorAmount.length == 0){
                    sizeArr.push(cart.products[i].cartQuan[j]);
                }
            }
        }
        console.log("sizeArr : ", sizeArr);
        
        for(var i = 0; i < sizeArr.length; i++){
            await cartSplice(req.body.userId, sizeArr[i]);
        }
        const cart3 = await Cart.findOne({userID: req.body.userId});
        for(var i = 0; i < cart3.products.length; i++){
            if(cart3.products[i].cartQuan.length == 0){
                nameArr.push(cart3.products[i]);
            }
        }
        
        for(var i = 0; i < nameArr.length; i++){
            await cartProSplice(req.body.userId, nameArr[i]);
        }
        return res.send("success");
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
    if(req.body.imp_uid != null){
        try{
            const pay = await Payment.create({
                userID: req.body.userID,
                imp_uid: req.body.imp_uid, // 아임포트 `unique key`(환불 요청시 `unique key`로 사용)
                amount: req.body.amount, // 결제 금액(환불 가능 금액 계산시 사용)
                cancel_amount: req.body.cancel_amount,
            });
            if(!pay){return res.send("fail");}
        }catch(error){console.log(error); return res.send("fail");}
        return res.send("success");
    }
    else if(req.body.buyer_name != null){
        const data = req.body;
        const find = await Payment.findOne({ imp_uid : data.impID});
        console.log(data.impID);
        console.log(find);
        if(find != null){
            try{
                await Order.create({
                    pay_ID: find.imp_uid,
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
                let x = 0;
                let y = 0;
                const sizeColorArr = [];
                for(var i = 0; i < cart.products.length; i++){
                    for(var j = 0; j < cart.products[i].cartQuan.length; j++){
                        for(var k = 0; k < cart.products[i].cartQuan[j].colorAmount.length; k++){
                            if(x == data.id[y]){
                                sizeColorArr.push(cart.products[i].cartQuan[j].colorAmount[k]);
                                y++;
                            }
                            x++;
                        }
                    }
                }
                for(var i = 0; i < sizeColorArr.length; i++){
                    await cartAmountSplice(data.userID, sizeColorArr[i]);
                }
                const sizeArr = [];
                const nameArr = [];
                const cart2 = await Cart.findOne({userID: data.userID});
                for(var i = 0; i < cart2.products.length; i++){
                    for(var j = 0; j < cart2.products[i].cartQuan.length; j++){
                        if(cart2.products[i].cartQuan[j].colorAmount.length == 0){
                            sizeArr.push(cart2.products[i].cartQuan[j]);
                        }
                    }
                }
                
                for(var i = 0; i < sizeArr.length; i++){
                    await cartSplice(data.userID, sizeArr[i]);
                }
                const cart3 = await Cart.findOne({userID: data.userID});
                for(var i = 0; i < cart3.products.length; i++){
                    if(cart3.products[i].cartQuan.length == 0){
                        nameArr.push(cart3.products[i]);
                    }
                }
                
                for(var i = 0; i < nameArr.length; i++){
                    await cartProSplice(data.userID, nameArr[i]);
                }
                return res.send("success");
            }catch(error){console.log(error); return res.send("fail");}
        }
    }
}