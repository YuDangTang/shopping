import Color from "../../models/material/Color.js";
import Material from "../../models/material/Material.js";
import Product from "../../models/Product.js";

export const postRegProductName = async(req, res) =>{
    const name = req.body.proName;
    const find = await Product.findOne({"proName": name});
    if(find != null){
        return res.send("fail");
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