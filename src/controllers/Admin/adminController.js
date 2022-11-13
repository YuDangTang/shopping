import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
export const getChart = async(req, res) => {
    
}
export const postChart = async(req, res) => {
    var findAll;
    console.log(req.body);
    if(req.body.type == "년도별" || req.body.type == "날짜"){
        if(req.body.type == "년도별"){
            findAll = await Order.find({}, {pro_ID:1});
        }else if(req.body.type == "날짜"){
            console.log(req.body.date1, req.body.date2)
            findAll = await Order.find({
                payDate: {$gte: new Date(req.body.date1), $lte: new Date(req.body.date2)}}, 
                {pro_ID:1}
            );
        }
        if(findAll.length == 0){return res.send("fail");}
        const obj = {
            products: [],
            proKind: [],
        };
        const nameArr = [];     // 이미 저장되어 있는 상품명인지 확인
        for(var i = 0; i < findAll.length; i++){
            for(var j = 0; j < findAll[i].pro_ID.length; j++){
                if(obj.products.length == 0 || !nameArr.includes(findAll[i].pro_ID[j].proName)){
                    const name = await Product.findOne({proName: findAll[i].pro_ID[j].proName}, {proKindName: 1});
                    const obj2 = {
                        proName: findAll[i].pro_ID[j].proName,
                        quan: 0,
                        cost: 0,
                        price: 0,
                        profit: 0
                    };
                    for(var a = 0; a < findAll[i].pro_ID[j].cartQuan.length; a++){
                        for(var b = 0; b < findAll[i].pro_ID[j].cartQuan[a].colorAmount.length; b++){
                            obj2.quan += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].quan;
                            obj2.cost += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].cost;
                            obj2.price += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].price;
                            obj2.profit += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].profit;
                        }
                    }
                    if(!obj.proKind.includes(name.proKindName)){
                        // 상품 종류별로 상품 정보 정리
                        const kind = {
                            proKindName: name.proKindName,
                            info: [],
                        };
                        kind.info.push(obj2); 
                        obj.proKind.push(name.proKindName);
                        obj.products.push(kind); 
                    }else{
                        for(var q = 0; q < obj.products.length; q++){
                            if(obj.products[q].proKindName == name.proKindName){ obj.products[q].info.push(obj2); }
                        }
                    }
                    nameArr.push(findAll[i].pro_ID[j].proName);  
                }else{
                    k: for(var k = 0; k < obj.products.length; k++){
                        for(var q = 0; q < obj.products[k].info.length; q++){
                            if(obj.products[k].info[q].proName == findAll[i].pro_ID[j].proName){
                                for(var a = 0; a < findAll[i].pro_ID[j].cartQuan.length; a++){
                                    for(var b = 0; b < findAll[i].pro_ID[j].cartQuan[a].colorAmount.length; b++){
                                        obj.products[k].info[q].quan += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].quan;
                                        obj.products[k].info[q].cost += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].cost;
                                        obj.products[k].info[q].price += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].price;
                                        obj.products[k].info[q].profit += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].profit;
                                    }
                                }
                                break k;
                            }
                        }
                    }
                }
            }
        }
        return res.send(obj);
    }else{
        findAll = await Order.find({});
        if(findAll.length == 0){return res.send("fail");}
        const obj = {
            products: [],
            proYear: [],
        };
        const yearArr = [];     // 이미 저장되어 있는 상품명인지 확인
        for(var i = 0; i < findAll.length; i++){
            for(var j = 0; j < findAll[i].pro_ID.length; j++){
                const name = await Product.findOne({proName: findAll[i].pro_ID[j].proName});
                let year = findAll[i].payDate.toString();
                year = Number(year.split(" ")[3]);
                console.log(year);
                if(!yearArr.includes(year)){ 
                    yearArr.push(year);
                    const obj2 = {
                        year,
                        quan: 0,
                        cost: 0,
                        price: 0,
                        profit: 0
                    };
                    for(var a = 0; a < findAll[i].pro_ID[j].cartQuan.length; a++){
                        for(var b = 0; b < findAll[i].pro_ID[j].cartQuan[a].colorAmount.length; b++){
                            obj2.quan += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].quan;
                            obj2.cost += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].cost;
                            obj2.price += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].price;
                            obj2.profit += findAll[i].pro_ID[j].cartQuan[a].colorAmount[b].profit;
                        }
                    }
                    obj.products.push(obj2);
                }else{
                    for(var a = 0; a < obj.products.length; a++){
                        if(obj.products[a].year == year){
                            loop: for(var b = 0; b < findAll[i].pro_ID[j].cartQuan.length; b++){
                                for(var c2 = 0; c2 < findAll[i].pro_ID[j].cartQuan[b].colorAmount.length; c2++){
                                    obj.products[a].quan += findAll[i].pro_ID[j].cartQuan[b].colorAmount[c2].quan;
                                    obj.products[a].cost += findAll[i].pro_ID[j].cartQuan[b].colorAmount[c2].cost;
                                    obj.products[a].price += findAll[i].pro_ID[j].cartQuan[b].colorAmount[c2].price;
                                    obj.products[a].profit += findAll[i].pro_ID[j].cartQuan[b].colorAmount[c2].profit;
                                    break loop;
                                }
                            }
                        }
                    }
                }
            }
        }
        obj.proYear = yearArr;
        return res.send(obj);
    }
}