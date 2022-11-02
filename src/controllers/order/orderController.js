import session from "express-session";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";
import Payment from "../../models/Payment.js";
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
        // const cart = await Cart.findOne({userID: data.userID});
        // for(var i = 0; i < cart.products.length; i++){

        // }
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
                for(var i = 0; i < cart.products.length; i++){
                    for(var j = 0; j < data.pro_ID.length; j++){
                        console.log("------------------------------------------------")
                        console.log(cart.products[i].proName, data.pro_ID[j].proName)
                        if(cart.products[i].proName == data.pro_ID[j].proName){
                            let idx = 0;
                            for(var k = 0; k < data.pro_ID[j].colorSizeAmount.length; k++){
                                console.log(cart.products[i].cartQuan[idx].size, data.pro_ID[j].colorSizeAmount[k].size)
                                if(cart.products[i].cartQuan[idx].size == data.pro_ID[j].colorSizeAmount[k].size){
                                    // let idx2 = 0;
                                    let idx2 = 0;
                                    if(cart.products[i].cartQuan[idx].colorAmount[idx2].color != null){
                                        for(var q = 0; q < data.pro_ID[j].colorSizeAmount[k].sizeColorAmount.length; q++){
                                            console.log(cart.products[i].cartQuan[idx].colorAmount[k].color, 
                                                data.pro_ID[j].colorSizeAmount[k].sizeColorAmount[q].color)
                                            if(cart.products[i].cartQuan[idx].colorAmount[idx2].color
                                                == data.pro_ID[j].colorSizeAmount[k].sizeColorAmount[q].color){
                                                    cart.products[i].cartQuan[idx].colorAmount.splice(idx2, 1);
                                            }
                                        }
                                    }
                                    idx2++;
                                }
                            } 
                            idx++;
                        } 
                    }
                }
                const sizeArr = [];
                const nameArr = [];
                for(var i = 0; i < cart.products.length; i++){
                    for(var j = 0; j < cart.products[i].cartQuan.length; j++){
                        if(cart.products[i].cartQuan[j].colorAmount.length == 0){
                            const arr = [];
                            arr.push(i); arr.push(j);
                            sizeArr.push(arr);
                        }
                    }
                }
                let size = 0;
                let name = 0;
                for(var i = 0; i < sizeArr.length; i++){
                    for(var j = 0; j < sizeArr[i].length ; j++){
                        cart.products[sizeArr[j][0]].cartQuan.splice([sizeArr[j][1]-size], 1);
                        size++;
                    }
                }
                for(var i = 0; i < cart.products.length; i++){
                    console.log(cart.products[i].cartQuan.length)
                    if(cart.products[i].cartQuan.length == 0){
                        nameArr.push(i)
                    }
                }
                for(var i = 0; i < nameArr.length; i++){
                    cart.products.splice(nameArr[i]-name, 1);
                    name++;
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
}