import Color from "../../models/material/Color.js";
import Material from "../../models/material/Material.js";
import Product from "../../models/Product.js";


export const getAdmin = async(req, res) => {
    const find = await Product.find({});
    return res.send(find);    
}
export const postAdmin = async(req, res) => {

}
export const getRegProductName = async(req, res) => {
    // console.log("세션: ",req.session.obj);
    // if(req.session.obj != null){
    //     return res.send(req.session.obj);
    // }
    // return res.send("No Session");
}
export const getUpdate = async(req, res) =>{

}
export const postUpdate = async(req, res) =>{
    if(req.body.id != null){
        const search = req.body.id;
        const find = await Product.findOne({"_id": search});
        if(find == null){
            return res.send("fail");
        }
        return res.send(find);
    }else if(req.body.originName != null){
        console.log(req.body.originName);
        const name = req.body.proName;
        if(req.body.originName != name){
            const find = await Product.findOne({"proName": name});
            if(find != null){
                return res.send("fail");
            }
        }
        return res.send("sucess");
    }
}
export const getUpdate2 = async(req, res) =>{
    const showColor = await Color.find({});
    return res.send(showColor);
}
export const postUpdate2 = async(req, res) =>{
    const search = req.body.id;
    const find = await Product.findOne({"_id": search});
    if(find == null){
        return res.send("fail");
    }
    return res.send(find);    
}
export const getUpdate3 = async(req, res) =>{
    const mat = await Material.find({});
    const arr = new Array();
    for(var i = 0; i < mat.length; i++){
        arr.push(mat[i].material);
    }
    //console.log("소재: ", mat);
    res.send(arr);
}
export const postUpdate3 = async(req, res) => {
    // const newData = req.body;
    // console.log("넘어온거: ", newData.proSize[0].proColor);
    // const originName = newData.originName; // 변경전 이름
    // const DB = await Product.find({"proName": originName}); // 기존 이름으로 상품 찾기
    // const len = DB[0].proSize[0].proColor.length > newData.proSize[0].proColor ? DB[0].proSize[0].proColor.length : newData.proSize[0].proColor;
    // for(var i = 0; i < len; i++){
    //     if(newData.proSize[])
        //console.log(data.proSize[0].proColor[i])
        // const arr = Array();
        // for(var j = 0; j < data.proSize[0].proColor[i].colorAmout.length; j++){
        //     console.log("사이즈: ", data.proSize[0].proColor[i].size);
        //     console.log("색상: ", data.proSize[0].proColor[i].colorAmout[j].color);
            // const find = await Product.find({$and : 
            //     [{$and : 
            //         [{"proName" : data.proName}, 
            //             {"proSize" : {"$elemMatch" : {"proColor" : {"$elemMatch": {"size" : data.proSize[0].proColor[i].size}}}}}]}, 
            //             {"proSize" : {"$elemMatch" : {"proColor" : {"$elemMatch": {"colorAmout" : {"$elemMatch" : {"color" : data.proSize[0].proColor[i].colorAmout[j].color}}}}}}}]},
            //             {proSize: 1})
            // if(find.length != 0){console.log("proColor: " ,find[0].proSize[0].proColor[0].colorAmout); console.log("-------------------")}
            
            // if(find.length != 0 && data.proSize[0].proColor[i].size == "Free" && data.proSize[0].proColor[i].colorAmout[j].color == "블랙"){
            //     await Product.updateOne({$and : 
            //         [{$and : 
            //             [{"proName" : data.proName}, 
            //                 {"proSize" : {"$elemMatch" : {"proColor" : {"$elemMatch": {"size" : data.proSize[0].proColor[i].size}}}}}]}, 
            //                 {"proSize" : {"$elemMatch" : {"proColor" : {"$elemMatch": {"colorAmout" : {"$elemMatch" : {"color" : data.proSize[0].proColor[i].colorAmout[j].color}}}}}}}]}, 
            //                 {"$set" : {"proSize.$.proSize.$.proColor.$.colorAmout.$.color" : "퍼플"}},
            //                 {arrayFilters : {$and : [{"proSize.$.proSize.$.proColor.$.colorAmout.$.color" : data.proSize[0].proColor[i].colorAmout[j].color},
            //                     {"proSize.$.proSize.$.proColor.$.size" :  data.proSize[0].proColor[i].size}]}})
            //     const update = await Product.find({"proName" : data.proName})
            //     console.log(update[0].proSize[0].proColor[0].colorAmout);
            //}
             // const update = await Product.updateOne({"proName": data.proName, "proSize.proColor.size": data.proSize[0].proColor[i].size,
            // "proSize.proColor.colorAmout.color": data.proSize[0].proColor[i].colorAmout}, 
            // {$set: {"proSize.$.proColor.$.colorAmount.": "the new text"}});
    //     }
        
    // }
}
export const postRegProductName = async(req, res) =>{
    if(req.body.proDetail == null){
        const name = req.body.proName;
        const find = await Product.findOne({"proName": name});
        if(find != null){
            return res.send("fail");
        }
    }
    // else{
    //     req.session.obj = req.body;
    // }
    return res.send("sucess");
}
export const postRegColor = async(req, res) => {
    const {mat, colorCode} = req.body;
    await Color.create({
        color: mat,
        colorCode,
    });
}
export const getRegMat = async(req, res) => {
    const mat = await Material.find({});
    const arr = new Array();
    for(var i = 0; i < mat.length; i++){
        arr.push(mat[i].material);
    }
    //console.log("소재: ", mat);
    res.send(arr);
}
export const postRegMat = async(req, res) => {
    const mat = req.body.mat;
    await Material.create({
        material: mat,
    });
}
export const getRegSize = async(req, res) => {
    const showColor = await Color.find({});
    return res.send(showColor);
}
export const getRegProduct = async(req, res) => {
    const showMat = await Material.find({});
    return res.send(showMat);
}
export const getStocks = async(req, res) => {
    const showColor = await Color.find({});
    return res.send(showColor);
}
export const postStocks = async(req, res) => {
    if(req.body.data != null){  // 재고 수정
        const data = req.body;
        try{ 
            await Product.updateOne({"proName": data.proName}, {"$set": {"proSize": Product.salesStatus(data.data)}});
        }catch(error){
            console.log(error)
            return res.send("fail");
        };
        const find = await Product.findOne({"proName": data.proName});
        return res.send(find);
    }else if(req.body.size != null){    // 수량&색상 수정
        const data = req.body;
        if(data.size.length == 0 && data.color.length ==0){ return res.send("fail"); }  
        else if(data.size.length == 0 && data.color.length != 0){   // 색상만 추가
            const updateData = await Product.find({"proName":data.proName}, {proSize: 1});
            for(var i = 0; i < data.color.length; i++){
                const obj = {};
                obj.color = data.color[i];
                obj.amout = 0;
                for(var j = 0; j < updateData[0].proSize[0].proColor.length; j++){
                    updateData[0].proSize[0].proColor[j].colorAmout.push(obj);
                }
            }
            try{await Product.updateOne({"proName": data.proName}, {"$set": {"proSize": Product.salesStatus(updateData[0].proSize)}});}
            catch(error){
                console.log(error); 
                return res.send("fail");
            }
            return res.send("sucess");
        }else if(data.size.length != 0 && data.color.length == 0){  // 사이즈만 추가
            const updateData = await Product.find({"proName":data.proName}, {proSize: 1}); 
            for(var i = 0; i < data.size.length; i++){
                const obj2 = {};
                const colorArr = [];
                obj2.size = data.size[i];
                for(var j = 0; j < updateData[0].proSize[0].proColor[0].colorAmout.length; j++){
                    const obj = {};
                    obj.color = updateData[0].proSize[0].proColor[0].colorAmout[j].color;
                    colorArr.push(obj);
                }
                obj2.colorAmout = colorArr;
                updateData[0].proSize[0].proColor.push(obj2);
            }
            try{await Product.updateOne({"proName": data.proName}, {"$set": {"proSize": Product.salesStatus(updateData[0].proSize)}});}
            catch(error){
                console.log(error); 
                return res.send("fail");
            }
            return res.send("sucess");
        }else if(data.size.length != 0 && data.color.length != 0){//  둘 다 추가
            const updateData = await Product.find({"proName":data.proName}, {proSize: 1});
            for(var i = 0; i < data.color.length; i++){
                const obj = {};
                obj.color = data.color[i];
                obj.amout = 0;
                for(var j = 0; j < updateData[0].proSize[0].proColor.length; j++){
                    updateData[0].proSize[0].proColor[j].colorAmout.push(obj);
                }
            }
            for(var i = 0; i < data.size.length; i++){
                const obj2 = {};
                const colorArr = [];
                obj2.size = data.size[i];
                for(var j = 0; j < updateData[0].proSize[0].proColor[0].colorAmout.length; j++){
                    const obj = {};
                    obj.color = updateData[0].proSize[0].proColor[0].colorAmout[j].color;
                    colorArr.push(obj);
                }
                obj2.colorAmout = colorArr;
                updateData[0].proSize[0].proColor.push(obj2);
            }
            try{await Product.updateOne({"proName": data.proName}, {"$set": {"proSize": Product.salesStatus(updateData[0].proSize)}});}
            catch(error){
                console.log(error); 
                return res.send("fail");
            }
            return res.send("sucess");
        }
    }else if(req.body.id != null){  // url로 넘어온 _id로 상품 찾기
        const search = req.body.id;
        const find = await Product.findOne({"_id": search});
        if(find == null){
            return res.send("fail");
        }
        res.send(find);
    }
}
