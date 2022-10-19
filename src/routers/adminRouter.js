import express, { application } from "express";
import multer from "multer";
import fs from "fs"; 
import { postRegProduct } from "../controllers/Admin/registerProductController.js";
import { postRegColor, getRegColor, getRegMat, postRegMat,
	getRegSize, postRegSize, getRegProduct} from "../controllers/Admin/adminRegiserProductController.js";
const adminRouter = express.Router();
try {
    fs.readdirSync('frontend/public/img'); // 폴더 확인 
} catch(err) {
    console.error('frontend/public/img가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('frontend/public/img'); // 폴더 생성
}
// diskStorage: 하드디스크에 업로드 파일을 저장
// destination: 저장할 경로
// filename: 저장할 파일명(파일명+날짜+확장자 형식)
// Limits: 파일 개수나 파일 사이즈를 제한
const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'frontend/public/img');
		},
		filename: function (req, file, cb) {
			file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
			cb(null, Date.now() + file.originalname);
		},
	}),
    limits: { fieldSize: 10 * 1024 * 1024 },
});
adminRouter.route("/regProSzie").get(getRegSize).post(postRegSize);
adminRouter.get("/regProDetail", getRegProduct);
adminRouter.post("/regProDetail", upload.array("proImage"),postRegProduct);
adminRouter.route("/regProColor").get(getRegColor).post(postRegColor);
adminRouter.route("/regProMaterial").get(getRegMat).post(postRegMat);

export default adminRouter;