import Option from "../../components/Option.js";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ProductObj } from "../../obj/obj.js";
import axios from "axios";
// import ReactDOM from 'react-dom/client';
function RegisterProSize(){
    const params = useParams(); // url 가져오기(Update인지 Register인지)
    const [colorArr, setColorArr] = useState([]);   // select option
    const [products, setProducts] = useState([]);   // updateData
    const Clothes = ["Free", "XS", "S", "M", "L", "XL"];
    const Shoes = ["220", "225", "230", "235", "240", "245", "250", "255", "260"];

    const [values, setValue] = useState(Clothes);   // select option
    const [checkSize, setCheckSize] = useState([]);     // 선택된 사이즈 값
    const [checkColor, setCheckColor] = useState([]);   // 선택된 색상 값
    const [colorAmount, setColorAmount] = useState([]);
    const getData = async (id) => {
        let respnose; 
        if(id == ""){
            respnose  = await axios.get('http://localhost:4000/admin/regProSzie');
        }else{
            respnose  = await axios.get(`http://localhost:4000/admin/${params.id}/update2`);
        }
        const datas = respnose.data;
        const code = []
        for(var i = 0; i < datas.length; i++){
            const arr = [];
            arr.push(datas[i].color);
            arr.push(datas[i].colorCode);
            code.push(arr);
        }
        setColorArr(code);
    }; 
    const getUpdateData = async (params) => {
        await axios.post(`http://localhost:4000/admin/${params.id}/update2`, params)
        .then((response) => {
            if(response.data == "fail"){
                alert("해당 상품은 존재하지 않습니다.");
                setProducts([]);
                return; 
            }else{
                const datas = response.data;
                const arr = [];
                arr.push(datas);
                setProducts(arr);
                // 상품 색상 및 사이즈
                const productColorDB = arr[0].proSize[0].proColor;
                const checkSize = [];
                for(var i = 0; i < productColorDB.length; i++){
                    checkSize.push(productColorDB[i].size);
                }
                setCheckSize(checkSize); 
                const checkColor = [];
                for(var i = 0; i < productColorDB[0].colorAmout.length; i++){
                    checkColor.push(productColorDB[0].colorAmout[i].color)
                }
                setCheckColor(checkColor);
                const sizeColorAmount = [];
                for(var i = 0; i < productColorDB.length; i++){
                    const obj = {
                        size: "",
                        colorAmount: [],
                    };
                    obj.size = productColorDB[i].size;
                    for(var j = 0; j < productColorDB[i].colorAmout.length; j++){
                        const obj2 = {
                            color: "",
                            amount: 0,
                        };
                        obj2.color = productColorDB[i].colorAmout[j].color;
                        obj2.amount = productColorDB[i].colorAmout[j].amout;
                        obj.colorAmount.push(obj2);
                    }
                    sizeColorAmount.push(obj);
                }
                setColorAmount(sizeColorAmount);
            }
        }); 
    }; 
    const location = useLocation();
    useEffect(() => {
        if(params.id == undefined){
            getData("");
        }else{
            getData(params.id);
            getUpdateData(params);
        }
    }, []);

    const handleChange = (e) => {
        if(e.target.value === "SHOES"){
            setValue(Shoes);
        }else{
            setValue(Clothes);
        }
        // 종류 바꾸면 사이즈 체크박스 전부 해제
        const sizeCheckbox = document.getElementsByName("sizeCheck");
        for(var i = 0; i < sizeCheckbox.length; i++){
            sizeCheckbox[i].checked =false
        }
        const ColorCheckbox = document.getElementsByName("colorCheckbox");
        for(var i = 0; i < ColorCheckbox.length; i++){
            ColorCheckbox[i].checked = false;
        }
        setCheckSize([]);
        setCheckColor([]);
        setColorAmount([]);
    }
    const changeHandler = (target, value) => {
        function addObj(){
            const obj = {
                size: target.value,
                colorAmount: [],
            };
            for(var i = 0; i < checkColor.length; i++){
                obj.colorAmount.push({color: checkColor[i], amount: 0});
            }
            return obj;
        }
        if (target.checked) {
            if(value == "Free"){    // Free 사이즈
                var FreeSize = window.confirm("Free 사이즈는 다른 정사이즈를 선택할 수 없습니다. Free 사이즈를 선택하시겠습니까?");
                if(!FreeSize){
                    target.checked = false;
                    return;
                }
                const size = document.getElementsByName("sizeCheck");
                for(var i = 0; i < size.length; i++){
                    if(size[i].value != "Free"){ size[i].checked = false; }
                }
                setCheckSize([target.value]);
                const obj = addObj();
                setColorAmount([obj]);
            }
            else{   // 정사이즈
                if(checkSize.includes("Free")){
                    var FreeSize = window.confirm("Free 사이즈는 다른 정사이즈를 선택할 수 없습니다. 정사이즈를 선택하시겠습니까?");
                    if(!FreeSize){
                        target.checked = false;
                        return;
                    }
                    const size = document.getElementsByName("sizeCheck");
                    for(var i = 0; i < size.length; i++){
                        if(size[i].value == "Free"){ size[i].checked = false; }
                    }
                    const index = checkSize.indexOf("Free");
                    colorAmount.splice(index, 1);
                    checkSize.splice(index, 1);
                    setCheckSize(checkSize.filter((el) => el !== "Free"));
                    checkSize.push(target.value);
                    const obj = addObj();
                    colorAmount.push(obj);
                    setColorAmount(colorAmount);
                }else{
                    const obj = addObj(); 
                    setCheckSize([...checkSize, target.value]);
                    setColorAmount([...colorAmount, obj]);
                }
            }
        } else {// 체크 해제
            setCheckSize(checkSize.filter((el) => el !== target.value));
            for(var i = 0; i < colorAmount.length; i++){
                if(colorAmount[i].size == target.value){
                    colorAmount.splice(i, 1);
                }
            }
            setColorAmount(colorAmount);
        }
    };
    const changeColor = (target, value) => {
        if (target.checked) {
            if(target.id == "checked"){
                target.checked = false;
                target.removeAttribute('id');
                setCheckColor(checkColor.filter((el) => el !== target.value));
                for(var i = 0; i < colorAmount.length; i++){
                    for(var j = 0; j < colorAmount[i].colorAmount.length; j++){
                        if(colorAmount[i].colorAmount[j].color == target.value){
                            colorAmount[i].colorAmount.splice(j, 1);
                        }
                    }
                }
                setColorAmount(colorAmount);
            }
            else{
                setCheckColor([...checkColor, target.value]);
                for(var i = 0; i < colorAmount.length; i++){
                    colorAmount[i].colorAmount.push({color: target.value, amount: 0});
                }
                setColorAmount(colorAmount);
            }
        } else {
            // 체크 해제
            setCheckColor(checkColor.filter((el) => el !== target.value));
            for(var i = 0; i < colorAmount.length; i++){
                for(var j = 0; j < colorAmount[i].colorAmount.length; j++){
                    if(colorAmount[i].colorAmount[j].color == target.value){
                        colorAmount[i].colorAmount.splice(j, 1);
                    }
                }
            }
            setColorAmount(colorAmount);
        }
    };
    const data = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const proKindName = e.target.proKindName.value;
        const size = document.querySelectorAll("#proSize");
        const arr = document.getElementsByName("proColor");
        const proSize = checkSize;
        if(checkColor.length == 0){
            alert('색상을 선택해주세요');
            return;
        }
        if(proSize.length ==0){
            alert('사이즈를 선택해주세요');
            return;
        }
        if(arr.length == 0){
            alert('수량을 입력해주세요');
            return;
        }
        const color = [];
        var k = 0;
        for(var i = 0; i < proSize.length; i++){
            var obj = {
                size: "",
                proColor: [{
                    color: "",
                    amout: 0,
                }],
            };
            obj.size = proSize[i];
            const colorAmount = [];
            for(var j = 0; j < arr.length/proSize.length; j++){
                if(Number.isNaN(Number(arr[k].value)) || arr[k].value < 0){
                    alert("수량은 0 이상의 숫자만 입력해주세요");
                    return;
                }
                const objColor = {
                    color: "",
                    amout: 0,
                };
                objColor.color = size[k].className
                objColor.amout = arr[k].value;
                colorAmount.push(objColor);
                k++;
            }
            obj.colorAmout = colorAmount;
            color.push(obj);
        }
        
        ProductObj.proSizeArr = proSize;
        ProductObj.proKindName = proKindName;  
        ProductObj.proSize = color;
        data('/admin/regProDetail', { state: {ProductObj} });
    };
    let count = 0;
    return(
        <form onSubmit={onSubmitHandler}>
            <table align ="center" border={1} 
                cellSpacing={1} style={{maxWidth: "1000px"}}>
                <tr><td align ="center" colSpan = "2">상품 등록</td></tr>
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>{"종류"}</td>
                    <td align ="center" style={{
                            padding: "0px 30px",
                        }}>{
                            products != null
                            ? (
                                products[0] != null
                                ? <div>{products[0].proKindName}</div>
                                : <select name={"proKindName"} onChange={handleChange}>
                                <Option value={"OUTER"} text={"아우터"}/>
                                <Option value={"DRESS"} text={"드레스"}/>
                                <Option value={"TOP"} text={"상의"}/>
                                <Option value={"BLOUSE&SHIRT"} text={"블라우스&셔츠"}/>
                                <Option value={"SKIRT"} text={"치마"}/>
                                <Option value={"Pants"} text={"바지"}/>
                                <Option value={"SHOES"} text={"신발"}/>
                            </select>
                            )
                            : null
                        }
                    </td>
                </tr>
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>색상</td>
                    <td><div style={{}}>
                            {colorArr.map(color => {
                                return(
                                    <>
                                        {
                                            checkColor.length != 0
                                            ? (
                                                checkColor.includes(color[0])
                                                ? <div style={{display: "flex", flexDirection:"row", 
                                                width:"120px"}}>
                                                    <input type={"checkbox"}
                                                        id="checked"
                                                        name="colorCheckbox"
                                                        value={color[0]}
                                                        onChange={(e)=>{
                                                            changeColor(e.currentTarget, color)
                                                        }} style={{
                                                            margin: "0px 0px 0px 10px",
                                                        }} checked/>
                                                    {color[0]}
                                                    {
                                                        color[1] != ""
                                                        ? <div style={{backgroundColor: `${color[1]}`, 
                                                        width: "30px", height: "30px"}}></div>
                                                        : null
                                                    }
                                                </div> 
                                                : <div style={{display: "flex", flexDirection:"row", 
                                                width:"120px"}}>
                                                <input type={"checkbox"}
                                                    name="colorCheckbox"
                                                    value={color[0]}
                                                    onChange={(e)=>{
                                                        changeColor(e.currentTarget, color)
                                                    }} style={{
                                                        margin: "0px 0px 0px 10px",
                                                    }}/>
                                                {color[0]}
                                                {
                                                    color[1] != ""
                                                    ? <div style={{backgroundColor: `${color[1]}`, 
                                                    width: "30px", height: "30px"}}></div>
                                                    : null
                                                }
                                            </div>
                                            )
                                            : <div style={{display: "flex", flexDirection:"row", 
                                            width:"120px"}}>
                                            <input type={"checkbox"}
                                                name="colorCheckbox"
                                                value={color[0]}
                                                onChange={(e)=>{
                                                    changeColor(e.currentTarget, color)
                                                }} style={{
                                                    margin: "0px 0px 0px 10px",
                                                }}/>
                                            {color[0]}
                                            {
                                                color[1] != ""
                                                ? <div style={{backgroundColor: `${color[1]}`, 
                                                width: "30px", height: "30px"}}></div>
                                                : null
                                            }
                                        </div>
                                        }
                                    </>
                                );
                            })}
                        </div></td>
                </tr>
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>{"사이즈"}</td>
                    <td align ="center" style={{
                        padding: "0px 30px",
                    }}><div>{values.map(value => {
                        return(
                            <>
                                {
                                    checkSize.length != 0
                                    ? (
                                        checkSize.includes(value)
                                        ? <><input type={"checkbox"}
                                        name={"sizeCheck"}
                                        value={value}
                                        onChange={(e)=>{
                                            changeHandler(e.currentTarget, value)
                                        }} checked/>{value}</>
                                        : <><input type={"checkbox"}
                                        name={"sizeCheck"}
                                        value={value}
                                        onChange={(e)=>{
                                            changeHandler(e.currentTarget, value)
                                        }} />{value}</>
                                    ) : <><input type={"checkbox"}
                                    name={"sizeCheck"}
                                    value={value}
                                    onChange={(e)=>{
                                        changeHandler(e.currentTarget, value)
                                    }} />{value}</>
                                }
                            </>
                        );
                    })}</div></td>
                </tr>
                {/* {checkSize.map(check => {
                        return(
                            <tr>
                                <td style={{
                                    textAlign: "center",
                                    padding: "0px 60px",
                                }}>{check}</td>
                                <td style={{
                                        textAlign: "center",
                                }}>{checkColor.map(color => {
                                        return(
                                            <div>
                                                <span id="proSize" className={color}>{color}: </span>
                                                <input type={"text"} name={"proColor"} style={{
                                                    width: "30px", textAlign: "right"
                                                }} maxLength="3" required/>
                                                개
                                            </div>
                                        );
                                })}</td>
                            </tr>
                        );
                    })} */}
                {colorAmount.map(colorA => {
                    console.log(colorA)
                    return(
                        <tr>
                            <td style={{
                                    textAlign: "center",
                                    padding: "0px 60px",
                                }}>{colorA.size}</td>
                            <td style={{
                                    textAlign: "center",
                            }}>{colorA.colorAmount.map(color => {
                                    return(
                                        <div>
                                            <span id="proSize" className={color.color}>{color.color}: </span>
                                            <input type={"number"} name={"proColor"} style={{
                                                width: "30px", textAlign: "right"
                                            }} maxLength="3" defaultValue={color.amount} required/>
                                            개
                                        </div>
                                    );
                            })}</td>
                        </tr>
                    );
                })}
                <td align ="center" colSpan = "2">
                    <button type="submit">다음</button>
                </td>
            </table>
        </form>
    );
};
export default RegisterProSize;