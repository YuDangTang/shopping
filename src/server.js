import express from "express";
import cors from "cors";
import "./db.js";
import session from "express-session";
import adminRouter from "./routers/adminRouter.js";
import Product from "./models/Product.js";
import { get } from "mongoose";

const PORT = 4000;	
const app = express();
app.use(cors())
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


const getMain = async(req,res) =>{
    const products = await Product.find({});//상품 모든것을 긁어와 await에 저장해라
    try{
    console.log(" 나는 서버: ", products); //상품이 있다면 콘솔창에 뜰것이다.
    }catch(error){console.log(error)};
    return res.send(products);
        
    }



app.get("/",getMain);

// app.get("/", function(req, res){
//     // res.send("Hello World");

// });


app.use("/admin", adminRouter);

app.listen(PORT, handelListening);

//회원가입 -> 추후 파일 따로 만들어 관리할 것
const join = async (req, res) => {
    const { joinId,
        joinPw,
        joinName,
        joinTel,
        joinFullAddress, joinBirth } = req.body;
    try {
        await User.create({
            userId: joinId,
            userPw: joinPw,
            userName: joinName,
            userTel: joinTel,
            userAddress: joinFullAddress,
            userBirth: joinBirth,
        });
    } catch (err) {
        console.log(err);
    }
};
app.post("/join", join);

//로그인 -> 추후 파일 따로 만들어 관리할 것
const login = async (req, res) => {
    const {
        loginId,
        loginPw
    } = req.body;
    console.log(loginId, loginPw);
    try {
        const pw = await User.findOne({ "userId": loginId });
        const checkPW = pw.userPw;
        const byID = await bcrypt.compare(loginPw, checkPW);
        if (byID) {
            req.session.user = loginId;
            // const user = req.session.user;
            // console.log("user: ", user);
            return res.send("sucess");
        }
        return res.send("fail");
    }
    catch (err) {
        console.log(err);
    }
};
app.post("/login", login);