import Color from "../../models/material/Color.js";
import Material from "../../models/material/Material.js";
import Product from "../../models/Product.js";

export const postRegProductName = async(req, res) =>{
    if(req.body.proDetail == null){
        const name = req.body.proName;
        const find = await Product.findOne({"proName": name});
        if(find != null){
            return res.send("fail");
        }
    }else{
        req.session.obj = req.body;
        console.log("세션: ",req.session.obj);
    }
    return res.send("sucess");
}
export const postRegColor = async(req, res) => {
    const {mat, colorCode} = req.body;
    await Color.create({
        color: mat,
        colorCode,
    });
}
export const getRegMat = async(req, res) => {
    const mat = await Material.find({});
    const arr = new Array();
    for(var i = 0; i < mat.length; i++){
        arr.push(mat[i].material);
    }
    //console.log("소재: ", mat);
    res.send(arr);
}
export const postRegMat = async(req, res) => {
    const mat = req.body.mat;
    await Material.create({
        material: mat,
    });
}
export const getRegSize = async(req, res) => {
    const showColor = await Color.find({});
    return res.send(showColor);
}
export const getRegProduct = async(req, res) => {
    const showMat = await Material.find({});
    return res.send(showMat);
}
export const getStocks = async(req, res) => {

}
export const postStocks = async(req, res) => {
    if(req.body.data != null){
        const data = req.body;
        // console.log(data.proName);  // 상품명
        // console.log(data.data);     // colorData
        //console.log(data.data[0].proColor[0].colorAmout);
        try{
            await Product.updateOne({"proName": data.proName}, {"$set": {"proSize": data.data}});
        }catch(error){
            console.log(error)
            return res.send("fail");
        };
        const find = await Product.findOne({"proName": data.proName});
        return res.send(find);
    }else if(req.body.search != null){
        const search = req.body.search;
        const find = await Product.findOne({"proName": search});
        if(find == null){
            return res.send("fail");
        }
        res.send(find);
    }
}
