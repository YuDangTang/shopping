import express from "express";
import cors from "cors";
import "./db.js";
import session from "express-session";
import adminRouter from "./routers/adminRouter.js";
import productRouter from "./routers/productRouter.js"

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

app.get("/", function(req, res){
    res.send("Hello World");
});


app.use("/admin", adminRouter);
app.use("/product", productRouter);

app.listen(PORT, handelListening);
