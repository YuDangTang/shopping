import Product from "../../models/Product.js";
import Bottom from "../../models/size/Bottom.js";
import Shoes from "../../models/size/Shoes.js";
import Top from "../../models/size/Top.js";
import Obj from "../../models/Obj.js";

export const postRegProduct = async (req, res) => {
    const ProductObj  = req.body;
    // 빈객체인지(이미지가 보내졌는지, 겍체가 보내졌는지);
    let isEmpty = Object.entries(ProductObj).length === 0;  
    if(isEmpty){
        const imgPath= req.files;
        const arr = [];
        for(var i = 0; i < imgPath.length; i++){
            let path = imgPath[i].path.split("\\");    // 역슬래시 사용시 2개 입력
            path = path.slice(-2);
            // 파일 이름과 상위 폴더 이름만 가져옴 ex) img/짱구
            path = path[0] + "\\" + path[1];    
            arr.push(path);
        }
        try{
            await Obj.create({  // 이미지 파일 경로 저장
                imgPath: arr,
            });
        }catch(error){console.log(error)};
    }else{   
        console.log("내가 보낸 데이터: ",ProductObj);
        const proName = ProductObj.proName;
        const proKindName = ProductObj.proKindName;
        const proMaterial = ProductObj.proMaterial;
        const proSize =  ProductObj.proSizeArr;    // 부모 테이블에 먼저 저장

        // 가장 최근에 추가한 이미지 경로 데이터 찾기
        const objImgPathArr = await Obj.find().sort({_id: -1}).limit(1);
        const proImg = objImgPathArr[0].imgPath;
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
            if(proKindName === "BOTTOM"){
                await Bottom.create({
                    detail: size,
                });
                const Latest = Bottom.find().sort({_id: -1}).limit(1);
            }else if(proKindName === "SHOES"){
                await Shoes.create({
                    detail: size,
                });
                const Latest = Shoes.find().sort({_id: -1}).limit(1);
            }else{
                await Top.create({
                    detail: size,
                });
            }
            // 가장 최근에 추가한 데이터 찾기
            const Latest = await Top.find().sort({_id: -1}).limit(1);
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
        }catch(error){
            console.log(error);
        }
    }
    return res.send('success');
};
