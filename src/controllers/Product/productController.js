import Product from "../../models/Product.js";
import Review from "../../models/Review.js";
import ProductDetail from "../../models/ProductDetail.js";

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
    const revi2ewbox = req.body;
    console.log("나오나요?", req.body.pro_id);
    console.log("나오나요?", req.body.proGPA);
    console.log("나오나요?", req.body.proReview);
    console.log("나오나요?", req.body.userId);
    await Review.create({
        pro_ID : revi2ewbox.pro_id,
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
export const postProBoard = async (req, res) => {
    const id = req.body.proID;
    const content = await ProductDetail.findOne({ "pro_ID": id });
    if (content === null) {
        return res.send("fail");
    } else {
        return res.send(content.content);
    }
}