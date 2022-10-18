import Product from "../models/Product.js";
import Bottom from "../models/size/Bottom.js";
import Shoes from "../models/size/Shoes.js";
import Top from "../models/size/Top.js";
export const postRegProduct = async (req, res) => {
    const {
        proName, proKindName, proSize, 
        proMaterial, proColor,
        proImage, proDetail, proPrice, proStatus
    } = req.body;
    console.log(proName, proKindName, proSize, 
        proMaterial, proColor,
        proImage, proDetail, proPrice, proStatus);
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
            const Latest = await Top.find().sort({_id: -1}).limit(1);
            console.log("이것은 디비: " ,Latest);
            console.log(Latest[0]._id);
        }
        // await Product.create({
        // });  
    }catch(error){
        console.log(error);
    }
    return res.send('success');
};
