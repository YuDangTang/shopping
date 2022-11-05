import Product from "../../models/Product.js";
import ProductDetail from "../../models/ProductDetail.js";

export const getProductDetail = async(req, res) => {
    
}
// export const getProductDetail = async (req, res) => {
//     const find = await ProductDetail.find({});
//     console.log("연스 확인 : ", find);
//     res.send(find);
// }
export const postProductDetail = async(req, res) => {
    console.log("데이터받아온거: ", req.body)
    const id = req.body.id;
    const product = await Product.findOne({"_id" : id});
    console.log(product)
    if(product != null){
        return res.send(product);
    }
    return res.send("fail");
} 
export const postProBoard = async (req, res) => {
    const id = req.body.proID;
    const content = await ProductDetail.findOne({ "pro_ID": id });
    if (content === null) {
        return res.send("fail");
    } else {
        return res.send(content.content);
    }
}