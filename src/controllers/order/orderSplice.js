import Cart from "../../models/Cart.js";

export async function cartSplice(id, item){
    const cart = await Cart.findOne({userID: id});
    for(var i = 0; i < cart.products.length; i++){
        for(var j = 0; j < cart.products[i].cartQuan.length; j++){
            if(cart.products[i].cartQuan[j].id == item.id){
                cart.products[i].cartQuan.splice(j, 1);
                try{
                    await Cart.updateOne({userID: id}, {$set: {products: cart.products}});
                    return;
                }catch(error){console.log(error); return res.send("fail")}
            }
        }
    }
}
export async function cartProSplice(id, item){
    const cart = await Cart.findOne({userID: id});
    for(var i = 0; i < cart.products.length; i++){
        if(cart.products[i].id == item.id){
            cart.products.splice(i, 1);
            try{
                await Cart.updateOne({userID: id}, {$set: {products: cart.products}});
                return;
            }catch(error){console.log(error); return res.send("fail")}
        }
    }
}
export async function cartAmountSplice(id, item){
    const cart = await Cart.findOne({userID: id});
    for(var i = 0; i < cart.products.length; i++){
        for(var j = 0; j < cart.products[i].cartQuan.length; j++){
            for(var k = 0; k < cart.products[i].cartQuan[j].colorAmount.length; k++){
                if(cart.products[i].cartQuan[j].colorAmount[k].id == item.id){
                    cart.products[i].cartQuan[j].colorAmount.splice(k, 1);
                    try{
                        await Cart.updateOne({userID: id}, {$set: {products: cart.products}});
                        return;
                    }catch(error){console.log(error); return res.send("fail")}
                }
            }
        }
    }
}