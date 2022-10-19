import Color from "../../models/material/Color.js";
import Material from "../../models/material/Material.js";
export const getRegColor = async(req, res) => {
    
}
export const postRegColor = async(req, res) => {
    const {mat, colorCode} = req.body;
    await Color.create({
        color: mat,
        colorCode,
    });
}
export const getRegMat = async(req, res) => {

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
export const postRegSize = async(req, res) => {
    
}
export const getRegProduct = async(req, res) => {
    const showMat = await Material.find({});
    return res.send(showMat);
}