import Color from "../../models/material/Color.js";
import Material from "../../models/material/Material.js";
import Obj from "../../models/Obj.js";
import Product from "../../models/Product.js";
import Top from '../../models/size/Top.js';
import Bottom from '../../models/size/Bottom.js';
import Shoes from '../../models/size/Shoes.js';


export const getAdmin = async (req, res) => {
    const find = await Product.find({});
    return res.send(find);
}
export const postAdmin = async (req, res) => {

}
export const getRegProductName = async (req, res) => {
    // console.log("세션: ",req.session.obj);
    // if(req.session.obj != null){
    //     return res.send(req.session.obj);
    // }
    // return res.send("No Session");
}
export const getUpdate = async (req, res) => {

}
export const postUpdate = async (req, res) => {
    if (req.body.id != null) {
        const search = req.body.id;
        const find = await Product.findOne({ "_id": search });
        if (find == null) {
            return res.send("fail");
        }
        return res.send(find);
    } else if (req.body.originName != null) {
        console.log(req.body.originName);
        const name = req.body.proName;
        if (req.body.originName != name) {
            const find = await Product.findOne({ "proName": name });
            if (find != null) {
                return res.send("fail");
            }
        }
        return res.send("sucess");
    }
}
export const getUpdate2 = async (req, res) => {
    const showColor = await Color.find({});
    return res.send(showColor);
}
export const postUpdate2 = async (req, res) => {
    const search = req.body.id;
    const find = await Product.findOne({ "_id": search });
    if (find == null) {
        return res.send("fail");
    }
    return res.send(find);
}
export const postRegProductName = async (req, res) => {
    if (req.body.proDetail == null) {
        const name = req.body.proName;
        const find = await Product.findOne({ "proName": name });
        if (find != null) {
            return res.send("fail");
        }
    }
    // else{
    //     req.session.obj = req.body;
    // }
    return res.send("sucess");
}
export const postRegColor = async (req, res) => {
    const { mat, colorCode } = req.body;
    await Color.create({
        color: mat,
        colorCode,
    });
}
export const getRegMat = async (req, res) => {
    const mat = await Material.find({});
    const arr = new Array();
    for (var i = 0; i < mat.length; i++) {
        arr.push(mat[i].material);
    }
    //console.log("소재: ", mat);
    res.send(arr);
}
export const postRegMat = async (req, res) => {
    const mat = req.body.mat;
    await Material.create({
        material: mat,
    });
}
export const getRegSize = async (req, res) => {
    const showColor = await Color.find({});
    return res.send(showColor);
}
export const getRegProduct = async (req, res) => {
    const showMat = await Material.find({});
    return res.send(showMat);
}
export const getStocks = async (req, res) => {

}
export const postStocks = async (req, res) => {
    if (req.body.data != null) {
        const data = req.body;
        // console.log(data.proName);  // 상품명
        // console.log(data.data);     // colorData
        //console.log(data.data[0].proColor[0].colorAmout);
        try {
            await Product.updateOne({ "proName": data.proName }, { "$set": { "proSize": data.data } });
        } catch (error) {
            console.log(error)
            return res.send("fail");
        };
        const find = await Product.findOne({ "proName": data.proName });
        return res.send(find);
    } else if (req.body.id != null) {
        const search = req.body.id;
        const find = await Product.findOne({ "_id": search });
        if (find == null) {
            return res.send("fail");
        }
        res.send(find);
    }
}

export const getUpdateDetail = async (req, res) => {
    try {

        await Product.findOne({});
    } catch (err) {
        console.log(err);
    }
}

export const getData = async (req, res) => {
    try {
        const params = req.body.params;
        const proName = req.body.proName;
        const detail = req.body.detail;

        if (params != null) {
            const pro = await Product.findOne({ "_id": params.id });
            const obj = {};
            if (pro.proKindName === "OUTER" || pro.proKindName === "DRESS"
                || pro.proKindName === "TOP" || pro.proKindName === "BLOUSE & SHIRT") {
                const size = await Top.findOne({ "_id": pro.proSize[0].proSize_ID })
                obj.product = pro;
                obj.size = size;
                return res.send(obj);
            } else if (pro.proKindName === "SKIRT" || pro.proKindName === "PANTS") {
                const size = await Bottom.findOne({ "_id": pro.proSize[0].proSize_ID })
                obj.product = pro;
                obj.size = size;
                return res.send(obj);
            } else if (pro.proKindName === "SHOES") {
                const size = await Shoes.findOne({ "_id": pro.proSize[0].proSize_ID })
                obj.product = pro;
                obj.size = size;
                // console.log("양시팔", obj);
                return res.send(obj);
            }
        } else if (detail[0] != null) {
            if (proName === "OUTER" || proName === "DRESS"
                || proName === "TOP" || proName === "BLOUSE & SHIRT") {
                try {
                    let search = await Top.findOne({ _id: detail[0].id });
                    for (var i = 0; i < detail.length; i++) {
                        search.detail[i].shoulder = detail[i].shoulder;
                        search.detail[i].chest = detail[i].chest;
                        search.detail[i].armhole = detail[i].armhole;
                        search.detail[i].armholeSide = detail[i].armholeSide;
                        search.detail[i].sleeveSide = detail[i].sleeveSize;
                        search.detail[i].sleeveLength = detail[i].sleeveLength;
                        search.detail[i].totalLength = detail[i].totalLength;
                        await Top.updateOne({ _id: detail[i].id }, { $set: search });
                    } 
                } catch (error) { console.log(error); }
                return res.send("success");
            } else if (proName === "SKIRT" || proName === "PANTS") {
                try {
                    let search = await Bottom.findOne({ _id: detail[0].id });
                    for (var i = 0; i < detail.length; i++) {
                        search.detail[i].waist = detail[i].waist;
                        search.detail[i].hip = detail[i].hip;
                        search.detail[i].thigh = detail[i].thigh;
                        search.detail[i].hem = detail[i].hem;
                        search.detail[i].crotch = detail[i].crotch;
                        search.detail[i].totalLength = detail[i].totalLength;
                        await Bottom.updateOne({ _id: detail[i].id }, { $set: search });
                    }
                } catch (error) { console.log(error); }
                return res.send("success");
            } else if (proName === "SHOES") {
                try {
                    let search = await Shoes.findOne({ _id: detail[0].id });
                    for (var i = 0; i < detail.length; i++) {
                        search.detail[i].heelHeight = detail[i].heelHeight;
                        search.detail[i].heelBall = detail[i].heelBall;
                        search.detail[i].totalHeight = detail[i].totalHeight;
                        search.detail[i].heel = detail[i].heel;
                        await Shoes.updateOne({ _id: detail[i].id }, { $set: search });
                    }
                } catch (error) { console.log(error); }
                return res.send("success");
            }
        }
    } catch (err) {
        console.log(err);
    }
}