import Product from "../models/Product.js";
import Bottom from "../models/size/Bottom.js";
import Shoes from "../models/size/Shoes.js";
import Top from "../models/size/Top.js";
export const postRegProduct = async (req, res) => {
    const {
        ProductObj
    } = req.body;
    console.log("내가 보낸 데이터: ",ProductObj);
    const proName = ProductObj.proName;
    const proKindName = ProductObj.proKindName;
    const proMaterial = ProductObj.proMaterial;
    const proSize =  ProductObj.proSizeArr;    // 부모 테이블에 먼저 저장
    const proImg = ProductObj.proImg;
    const proDetail = ProductObj.proDetail;
    const proPrice = ProductObj.proPrice;
    try{
        const size = [];
        for(var i = 0; i < proSize.length; i++){
            let obj = {
                size: proSize[i],
            };
            size.push(obj);
        }
        console.log(size);
        if(proKindName === "BOTTOM"){
            await Bottom.create({
                detail: size,
            });
            const Latest = Bottom.find().sort({_id: -1}).limit(1);
            console.log(Latest._id);
        }else if(proKindName === "SHOES"){
            await Shoes.create({
                detail: size,
            });
            const Latest = Shoes.find().sort({_id: -1}).limit(1);
            console.log(Latest._id);
        }else{
            await Top.create({
                detail: size,
            });
        }
        // 가장 최근에 추가한 데이터 찾기
        const Latest = await Top.find().sort({_id: -1}).limit(1);
        console.log("컬러 예시: " , ProductObj.proSize[0]);
        console.log("이것은 디비: " ,Latest);
        console.log("이건은 사이즈: ", Latest[0].detail);
        console.log("이건은 사이즈 디테일 수: ", Latest[0].detail.length);
        const colorObj= {
            proSize_ID: "",
        };
        // proColor의 proSize_ID 설정(다른 collections _id값)
        colorObj.proSize_ID = Latest[0].id; 
        const newColorArr = [];
        for(var i = 0; i < Latest[0].detail.length; i++){
            console.log(Latest[0].detail[i].size);
            const newColorObj = {
                size: Latest[0].detail[i].size,
                colorAmout: [],
            };
            // 각 사이즈 당 컬러-수량 저장한 객체
            const colorAmoutArr = ProductObj.proSize[i];
            newColorArr.push(colorAmoutArr);
        }
        colorObj.proColor=newColorArr;
        console.log("제발여..",colorObj);
        console.log("제발여2222..",colorObj.proColor[0].colorAmout);
        console.log(Latest[0].id);
        const arr = [];
        arr.push(proImg);
        await Product.create({
            proName,
            proKindName,
            proMaterial,
            proSize: colorObj,
            proImg: arr,
            proDetail,
            proPrice,
        });  
    }catch(error){
        console.log(error);
    }
    return res.send('success');
};
