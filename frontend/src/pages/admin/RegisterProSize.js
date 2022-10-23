import Table from "../../components/Table.js";
import Option from "../../components/Option.js";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductObj } from "../../obj/obj.js";
import axios from "axios";
// import ReactDOM from 'react-dom/client';
function RegisterProSize(){
    const [colorArr, setColorArr] = useState([]);   // select option
    const getData = async () => {
        const respnose = await axios.get('http://localhost:4000/admin/regProSzie');
        const datas = respnose.data;
        const code = []
        for(var i = 0; i < datas.length; i++){
            const arr = [];
            arr.push(datas[i].color);
            arr.push(datas[i].colorCode);
            code.push(arr);
        }
        setColorArr(code);
        console.log(code);
    }; 
    const location = useLocation();
    useEffect(() => {
        getData();
        console.log("도착한 데이터: " ,location.state.ProductObj);
    }, []);

    const Clothes = ["Free", "XS", "S", "M", "L", "XL"];
    const Shoes = ["220", "225", "230", "235", "240", "245", "250", "255", "260"];

    const [values, setValue] = useState(Clothes);   // select option
    const [checkSize, setCheckSize] = useState([]);     // 선택된 사이즈 값
    const [checkColor, setCheckColor] = useState([]);                    // 선택된 색상 값
    const handleChange = (e) => {
        if(e.target.value === "SHOES"){
            setValue(Shoes);
        }else{
            setValue(Clothes);
        }
        // 종류 바꾸면 사이즈 체크박스 전부 해제
        const sizeCheckbox = document.getElementsByName("sizeCheck");
        for(var i = 0; i < sizeCheckbox.length; i++){
            sizeCheckbox[i].checked = false;
        }
        const ColorCheckbox = document.getElementsByName("colorCheckbox");
        for(var i = 0; i < ColorCheckbox.length; i++){
            ColorCheckbox[i].checked = false;
        }
        setCheckSize([]);
        setCheckColor([]);
    }

    const changeHandler = (checked, value) => {
        if (checked) {
            setCheckSize([...checkSize, value]);
        } else {
            // 체크 해제
            setCheckSize(checkSize.filter((el) => el !== value));
        }
    };
    const changeColor = (checked, value) => {
        if (checked) {
            setCheckColor([...checkColor, value]);
        } else {
            // 체크 해제
            setCheckColor(checkColor.filter((el) => el !== value));
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
                        }}><select name={"proKindName"} onChange={handleChange}>
                            <Option value={"OUTER"} text={"아우터"}/>
                            <Option value={"DRESS"} text={"드레스"}/>
                            <Option value={"TOP"} text={"상의"}/>
                            <Option value={"BLOUSE&SHIRT"} text={"블라우스&셔츠"}/>
                            <Option value={"BOTTOM"} text={"하의"}/>
                            <Option value={"SHOES"} text={"신발"}/>
                    </select></td>
                </tr>
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>색상</td>
                    <td><div style={{}}>
                            {colorArr.map(color => {
                                return(
                                    <div style={{display: "flex", flexDirection:"row", 
                                    width:"120px"}}>
                                        <input type={"checkbox"}
                                            name="colorCheckbox"
                                            value={color[0]}
                                            onChange={(e)=>{
                                                changeColor(e.currentTarget.checked, color)
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
                                <input type={"checkbox"}
                                    name={"sizeCheck"}
                                    value={value}
                                    onChange={(e)=>{
                                        changeHandler(e.currentTarget.checked, value)
                                    }}/>
                                {value}
                            </>
                        );
                    })}</div></td>
                </tr>
                {checkSize.map(check => {
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
                                                <span id="proSize" className={color[0]}>{color[0]}: </span>
                                                <input type={"text"} name={"proColor"} style={{
                                                    width: "30px", textAlign: "right"
                                                }} maxLength="3" required/>
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