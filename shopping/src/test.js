import express from "express";
import cors from 'cors';

const PORT = 3000;	
const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true}));  // body-parse
// npm i cors -> 포트 번호가 달라도 데이터를 꺼내갈 수 있게 해줌

let id = 2;
const todoList = [{
    id: 1,
    text: "할일 1",
    done: false,
}];

const handelListening = () => 
    console.log("서버 시작 " + `http://localhost:${PORT}`);

app.get("/", function(req, res){
    res.send("Hello World");
});

app.get("/api/todo", function(req, res){
     res.json(todoList);
});

app.post("/api/todo", function(req, res){
    const {text, done} = req.body;
    todoList.push(
        id++,
        text,
        done,
    );
    return res.send('success');
});

app.listen(PORT, handelListening);