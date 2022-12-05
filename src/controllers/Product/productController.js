import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";
import Bottom from "../../models/size/Bottom.js";
import Shoes from "../../models/size/Shoes.js";
import Top from "../../models/size/Top.js";
import Obj from "../../models/Obj.js";
import Review from "../../models/Review.js";
import ProductDetail from "../../models/ProductDetail.js";

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
export const getProductReview = async (req, res) => {

}
export const postProductReview = async (req, res) => {
    const revi2ewbox = req.body;
    console.log("나오나요?", req.body.pro_id);
    console.log("나오나요?", req.body.proGPA);
    console.log("나오나요?", req.body.proReview);
    console.log("나오나요?", req.body.userId);
    await Review.create({
        pro_ID: revi2ewbox.pro_id,
        proGPA: revi2ewbox.proGPA,
        proReview: revi2ewbox.proReview,
        userId: revi2ewbox.userId,
    });
    // await Review.create({
    //     pro_ID:revi2ewbox.pro_ID,
    //     proGPA: revi2ewbox.proGPA, //조아유 싫어유
    //     proReview: revi2ewbox.proReview, //상품 리뷰
    //     userId:revi2ewbox.userId, //유저 id
    //     // userImg:reviewbox.userImg, 
    // });
    // const review = await Review.find({reviewbox:revi2ewbox});
    // console.log("들어오나요?"+revi2ewbox)
    // 유저아이디도 받아오기
    // const order_ID = await Order.find({}) pro_ID와 유저아이디로 찾기
    // review.create({
    //     // order_ID: order_ID,
    //     pro_ID: reviewbox.pro_ID, //상품 id
    //     proGPA: reviewbox.proGPA, //조아유 싫어유
    //     proReview: reviewbox.proReview, //상품 리뷰
    //     userId:reviewbox.userId, //유저 id
    //     // userImg:reviewbox.userImg, //유저가 등록한 이미지(null 허용, 얘만 Array)
    // })
}
export const postRegProduct = async (req, res) => {
    const ProductObj = req.body;
    // 빈객체인지(이미지가 보내졌는지, 겍체가 보내졌는지);
    let isEmpty = Object.entries(ProductObj).length === 0;
    if (isEmpty) {
        const imgPath = req.files;
        const arr = [];
        for (var i = 0; i < imgPath.length; i++) {
            let path = imgPath[i].path.split("\\");    // 역슬래시 사용시 2개 입력
            path = path.slice(-2);
            // 파일 이름과 상위 폴더 이름만 가져옴 ex) img/짱구
            path = path[0] + "\\" + path[1];
            arr.push(path);
        }
        try {
            await Obj.create({  // 이미지 파일 경로 저장
                imgPath: arr,
            });
        } catch (error) { console.log(error) };
    } else {

        const proName = ProductObj.proName;
        const proKindName = ProductObj.proKindName;
        const proMaterial = ProductObj.proMaterial;
        const proSize = ProductObj.proSizeArr;    // 부모 테이블에 먼저 저장

        // 가장 최근에 추가한 이미지 경로 데이터 찾기
        const objImgPathArr = await Obj.find().sort({ _id: -1 }).limit(1);
        const proImg = objImgPathArr[0].imgPath;
        const proDetail = ProductObj.proDetail;
        const proPrice = ProductObj.proPrice;

        try {
            const size = [];

            let Latest;

            for (var i = 0; i < proSize.length; i++) {
                let obj = {
                    size: proSize[i],
                };
                size.push(obj);
            }

            if (proKindName === "SKIRT" || proKindName === "PANTS") {
                await Bottom.create({
                    proName,
                    detail: size,
                });
                Latest = await Bottom.findOne({ proName: proName });
            } else if (proKindName === "SHOES") {
                await Shoes.create({
                    proName,
                    detail: size,
                });
                Latest = await Shoes.findOne({ proName: proName });
            } else {
                await Top.create({
                    proName,
                    detail: size,
                });
                Latest = await Top.findOne({ proName: proName });
            }
            const colorObj = {};
            // proColor의 proSize_ID 설정(다른 collections _id값)
            colorObj.proSize_ID = Latest.id;
            const newColorArr = [];
            for (var i = 0; i < Latest.detail.length; i++) {
                const newColorObj = {
                    size: Latest.detail[i].size,

                    colorAmout: [],
                };
                // 각 사이즈 당 컬러-수량 저장한 객체
                const colorAmoutArr = ProductObj.proSize[i];
                newColorArr.push(colorAmoutArr);
            }
            colorObj.proColor = newColorArr;
            const arr = [];
            arr.push(proImg);
            await Product.create({
                proName,
                proKindName,
                proMaterial,
                proSize: colorObj,
                proImg,
                proDetail,
                proPrice,
            });

            const sucess = await Product.find({ "proName": proName });
            await Obj.remove({});
            return res.send(sucess);

        } catch (error) {
            console.log(error);
        }
    }

    return res.send("fail");

};
export const postProBoard = async (req, res) => {
    const id = req.body.proID;
    const content = await ProductDetail.findOne({ "pro_ID": id });
    if (content === null) {
        return res.send("fail");
    } else {
        return res.send(content.content);
    }
}