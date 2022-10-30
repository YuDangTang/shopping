import Product from "../../models/Product.js";

export const getProductDetail = async(req, res) => {
    
}
export const postProductDetail = async(req, res) => {
    const id = req.body.id;
    const product = await Product.find({"_id" : id});
    console.log(product)
    if(product != null){
        return res.send(product);
    }
    return res.send("fail");
} 