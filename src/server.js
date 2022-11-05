import express from "express";
import cors from "cors";
import "./db.js";
import session from "express-session";
import adminRouter from "./routers/adminRouter.js";
import productRouter from "./routers/productRouter.js"
import User from "./models/User.js"
import bcrypt from 'bcrypt'
import Product from "./models/Product.js";
import orderRouter from "./routers/orderRouter.js";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js";

const PORT = 4000;	
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));  // body-parse

// npm i cors -> 포트 번호가 달라도 데이터를 꺼내갈 수 있게 해줌

app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true
}));

const handelListening = () => 
    console.log("서버 시작 " + `http://localhost:${PORT}`);

// app.get("/", function(req, res){
//     res.send("Hello World");
// });

const getMain = async(req,res) =>{
    try{
        const products = await Product.find({});//상품 모든것을 긁어와 await에 저장해라
        return res.send(products);
    }catch(error){console.log(error)};
    }



app.get("/",getMain);

// app.get("/", function(req, res){
//     // res.send("Hello World");

// });





app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.listen(PORT, handelListening);

//회원가입 -> 추후 파일 따로 만들어 관리할 거임
const join = async (req, res) => {
    try {
        const { joinId,
            joinPw,
            joinName,
            joinTel,
            joinFullAddress, joinBirth } = req.body;
        const boo = await User.create({
            userId: joinId,
            userPw: joinPw,
            userName: joinName,
            userTel: joinTel,
            userAddress: joinFullAddress,
            userBirth: joinBirth,
        });
        if (boo) {
            await Cart.create({
                userID: joinId,
                // products: [{
                //     proName: cart.proName,
                //     cartQuan,
                // }],
            });
            return res.send("Success");
        } else {
            return res.send("fail");
        }
    } catch (err) {
        console.log(err);
    }
};
app.post("/member/Join", join);

//회원가입 - 아이디 중복 체크 -> 추후 파일 따로 만들어 관리할 거임
const idDupChk = async (req, res) => {
    try {
        let inputId = req.body;
        for (var i in inputId) {
            inputId = i;
        }
        const idDupChk = await User.findOne({ "userId": inputId });
        if (idDupChk) {
            return res.send("F");
        } else {
            return res.send("T");
        }
    } catch (err) {
        console.log(err);
    }
};
app.post("/member/Join/idDupTest/", idDupChk);

//로그인 -> 추후 파일 따로 만들어 관리할 거임
const login = async (req, res) => {
    const {
        loginId,
        loginPw
    } = req.body;
    try {
        const pw = await User.findOne({ "userId": loginId });
        if (pw == null) {
            return res.send("fail");   
        }
        const checkPw = pw.userPw;
        const byID = await bcrypt.compare(loginPw, checkPw);
        if (byID) {
            req.session.user = loginId;
            console.log("나 로그인함: ", req.session.user);
            // const user = req.session.user;
            // console.log("user: ", user);
            return res.send("sucess");
        } else {
            return res.send("fail");
        }
    }
    catch (err) {
        console.log(err);
    }
};
app.post("/member/login", login);


//유저정보 수정을 위한 유저정보 쏘기
const GetInfo = async (req, res) => {
    const userkey = req.body.userkey;

    try {
        const userInfo = await User.findOne({ "userId": userkey });

        if (userInfo == null) {
            return res.send("fail");   
        } else {
            return res.send(userInfo);
        }
    }
    catch (err) {
        console.log(err);
    }
};
app.post("/member/GetInfo", GetInfo);


// //회원정보 수정
const Modify = async (req, res) => {
    try {
        const { joinId,
            joinPw,
            joinName,
            joinTel,
            joinFullAddress, joinBirth } = req.body;

            console.log("요청바디확인", req.body);
            console.log("수정 전 비번 : ", joinPw);
            const newPw = await User.modifyPw(joinPw);
            console.log("수정 후 비번 : ",newPw);

        const boo = await User.updateOne(
            {userId : joinId}, 
            { $set: 
                { 
                    userPw : newPw,
                    userName: joinName,
                    userTel: joinTel,
                    userAddress: joinFullAddress,
                    userBirth: joinBirth
                }
            });
        if
        (boo) {
            return res.send("Success");
        } else {
            return res.send("fail");
        }
    } catch (err) {
        console.log("에러임",err);
    }
};
app.post("/member/Modify", Modify);



//주문내역 확인하기
const GetOrderHistory = async (req, res) => {
    const userkey = req.body.userkey;

    try {
        const userInfo = await Order.findOne({ "userId": userkey });

        if (userInfo == null) {
            return res.send("fail");   
        } else {
            return res.send(userInfo);
        }
    }
    catch (err) {
        console.log(err);
    }
};
app.post("/myshop/Order", GetOrderHistory);