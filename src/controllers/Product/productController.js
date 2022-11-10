import Product from "../../models/Product.js";
import Review from "../../models/Review.js";

export const getProductDetail = async(req, res) => {
    
}
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

export const getProductReview = async(req, res) => {
    
} 
export const postProductReview = async(req, res) => {
    // const revi2ewbox = req.body;
    // console.log("나오나요?", req.body.pro_id);
    // console.log("나오나요?", req.body.proGPA);
    // console.log("나오나요?", req.body.proReview);
    // console.log("나오나요?", req.body.userId);
    // await Review.create({
    //     pro_ID : revi2ewbox.pro_id,
    //     proGPA: revi2ewbox.proGPA,
    //     proReview: revi2ewbox.proReview,
    //     userId: revi2ewbox.userId,
    // });


    // const proreview = await Review.find({pro_ID: props.url}); //Review collection에 있는 pro_ID값만 찾아와서 proreview에 넣어줘유
    // console.log("하이요" + proreview);
    // if(proreview != null){//proreview가 있으면 보내줘유 
    //     return res.send(proreview);
    // }
    // return res.send("fail");//proreviw가 없으면 fail이라는 문구를 보내줘유
  
} 
