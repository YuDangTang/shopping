import express from "express";
import "./db.js";
const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: true} ));
const handelListening = () =>
    console.log("서버 시작 " + `http://localhost:${PORT}`);
app.listen(PORT, handelListening);