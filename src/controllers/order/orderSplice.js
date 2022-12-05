import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

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
                    // 상품 재고 수정(창고재고: 주문 수량만큼 빼기)
                    const pro = await Product.findOne({$and: [{proName: cart.products[i].proName}, 
                        {"proSize.proColor.size": cart.products[i].cartQuan[j].size}]}, {proSize:1});
                    for(var n1 = 0; n1 < pro.proSize.length; n1++){
                        for(var n2 = 0; n2 < pro.proSize[n1].proColor.length; n2++){
                            if(pro.proSize[n1].proColor[n2].size == cart.products[i].cartQuan[j].size){
                                for(var n3 = 0; n3 < pro.proSize[n1].proColor[n2].colorAmout.length; n3++){
                                    if(pro.proSize[n1].proColor[n2].colorAmout[n3].color == cart.products[i].cartQuan[j].colorAmount[k].color){
                                        pro.proSize[n1].proColor[n2].colorAmout[n3].amout -= cart.products[i].cartQuan[j].colorAmount[k].quan;
                                    }
                                }
                            }
                        }
                    }
                    try{
                        await Product.updateOne({proName: cart.products[i].proName}, {$set: {proSize: pro.proSize}});
                    }catch(error){console.log(error); return res.send("fail")}
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