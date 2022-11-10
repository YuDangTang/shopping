import express from "express";
import cors from "cors";
import "./db.js";
import session from "express-session";
import adminRouter from "./routers/adminRouter.js";
import productRouter from "./routers/productRouter.js"
import User from "./models/User.js"
import bcrypt from 'bcrypt'
import Product from "./models/Product.js";
// 리뷰 import 추가함
import Review from "./models/Review.js";
// import reviewRouter from"./routers/reviewRouter";


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


//main에 사용할 함수 모든 상품 가져온다.
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
    console.log("로그인 id 콘솔",loginId);
    console.log("로그인 id 콘솔",loginPw);
    try {
        const pw = await User.findOne({ "userId": loginId });
        if (pw == null) {
            return res.send("fail");   
        }
        const checkPw = pw.userPw;
        const byID = await bcrypt.compare(loginPw, checkPw);
        if (byID) {
            req.session.user = loginId;
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

// // 리뷰 부분 추가함
// app.post('/add', function(req, res){
//     res.send("리뷰 데이터 전송 완료");

// })


const review = async (req, res) => {
    try {
        const { 
            // order_ID,
            pro_ID,
            proGPA,
            proReview,
            userId, 
            // userImg 
        } = req.body;
        const rv = await Review.create({
            // order_ID: order_ID,
            pro_ID: pro_ID, //상품 id
            proGPA: proGPA, //조아유 싫어유
            proReview: proReview, //상품 리뷰
            userId:userId, //유저 id
            // userImg:userImg, //유저가 등록한 이미지(null 허용, 얘만 Array)
        });
        if (rv) {
            return res.send("Success");
        } else {
            return res.send("fail");
        }
    } catch (err) {
        console.log(err);
    }
};

app.post("/product/:id/review", review);


//리뷰 전체 보내기
const reviewvew = async (req, res) => {
    try {
        // //개수 보여줘유
        // const reviewcount = await Review.find({}).count();
        // console.log("review에 있는 전체 개수: "+reviewcount);
        console.log("????: "+req.body.pro_ID)
        
        const proreview = await Review.find({pro_ID: req.body.pro_ID});//Review collection에 있는 pro_ID값만 가져와서 proreview에 넣어줘유
        console.log("하이요" + proreview);
        if(proreview != null){//proreview가 있으면 보내줘유
            return res.send(proreview);
        }
        return res.send("fail");//proreview가 없으면 fail문구를 보내줘유
    }
    catch (err) {
        console.log(err);
    }
};

app.post("/product/:id/reviewview", reviewvew); //보내준 값들은 reviewview로 갑니다유

app.post("/member/GetInfo", GetInfo);




//검색기능 검색어가 포함된 상품만 가져온다. 이 코드 밑에는 db에서 가져오는 코드

//객체로 많은값을 받아올때는 cosnt ={ ??,??} = req.body 형식으로 하면된다.
const search = async ( req,res) =>{
    var proSearch = req.body.tmp;
    console.log("서치에서 받은 req",proSearch);
    try{
        const tmp = new RegExp(`[${proSearch}]`, 'g');
        // const productSearch = await Product.find({proName:{ $regex: /^{proSearch}/i}})
        const productSearch = await Product.find({"proName":{'$regex': tmp}});
        console.log("프로덕트서치",productSearch);
        if(productSearch ==null){
            console.log('fail에 들어왔습니다')
            return res.send("fail");

        }else{
            console.log('객체를 가지고 리턴합니다')
            return res.send(productSearch);
        }


    }catch(err){
        console.log("서버에서 검색값을 불러오는중 에러발생" +err);
    }
}
app.post("/product/search/DataSite", search); //해당 주소로 객체를 쏴준다. 받기도 함
//굳이 url 쏴주는 곳은 동적으로 받을 필요가 없다.그냥 주고받는 장소는 한곳이면 되니까.

