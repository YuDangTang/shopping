import express from "express";
import cors from "cors";
import "./db.js";
import session from "express-session";
import adminRouter from "./routers/adminRouter.js";
import User from "./models/User.js"
import bcrypt from 'bcrypt'

const PORT = 4000;	
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));  // body-parse
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true
}));

const handelListening = () => 
    console.log("서버 시작 " + `http://localhost:${PORT}`);

app.get("/", function(req, res){
    res.send("Hello World");
});

app.use("/admin", adminRouter);

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
