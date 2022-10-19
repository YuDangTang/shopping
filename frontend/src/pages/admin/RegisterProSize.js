import Table from "../../components/Table.js";
import Option from "../../components/Option.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProductObj } from "../../obj/obj.js";
// import ReactDOM from 'react-dom/client';
function RegisterProSize(){
    const location = useLocation();
    useEffect(() => {
        console.log("도착한 데이터: " ,location.state.ProductObj);
    }, []);

    const Clothes = ["Free", "XS", "S", "M", "L", "XL"];
    const Shoes = ["220", "225", "230", "235", "240", "245", "250", "255", "260"];

    const Colors = ["블랙", "아이보리", "베이지", "네이비",
                    "라이트베이지", "진청", "중청",
                    "연청", "레드", "오렌지", "퍼플", "옐로우", "그레이", "핑크",
                    "소라", "브라운", "블루", "그린"];

    const [values, setValue] = useState(Clothes);
    const [checkedInputs, setCheckedInputs] = useState([]);
    const [colors, setColor] = useState([]);
    // const [checkedSizes, setCheckedSizes] = useState([]);
    const handleChange = (e) => {
        if(e.target.value === "SHOES"){
            setValue(Shoes);
        }else{
            setValue(Clothes);
        }
    }

    const changeHandler = (checked, value) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, value]);
        } else {
            // 체크 해제
            setCheckedInputs(checkedInputs.filter((el) => el !== value));
        }
    };
    const changeColor = (checked, value) => {
        if (checked) {
            setColor([...colors, value]);
        } else {
            // 체크 해제
            setColor(colors.filter((el) => el !== value));
        }
    };
    const data = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const proKindName = e.target.proKindName.value;
        const size = document.querySelectorAll("#proSize");
        const arr = document.getElementsByName("proColor");
        const proSize = checkedInputs;
        if(colors.length == 0){
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
        console.log(ProductObj);
        //console.log("data: " , proKindName,  proSize, proColor, proColorAmount);
        // 해당 주소로 데이터 넘기기
        data('/admin/regProDetail', { state: {ProductObj} });
    };
    function handleClick(e){
        window.location.href = "/admin/regProName";
    }
    return(
        <form onSubmit={onSubmitHandler}>
            <table align ="center" border={1} 
                cellSpacing={1} style={{width: "800px",}}>
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
                    <td><div>
                            {Colors.map(color => {
                                return(
                                    <>
                                        <input type={"checkbox"}
                                            value={color}
                                            onChange={(e)=>{
                                                changeColor(e.currentTarget.checked, color)
                                            }} style={{
                                                margin: "0px 0px 0px 10px",
                                            }}/>
                                        {color}
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
                                <input type={"checkbox"}
                                    value={value}
                                    onChange={(e)=>{
                                        changeHandler(e.currentTarget.checked, value)
                                    }}/>
                                {value}
                            </>
                        );
                    })}</div></td>
                </tr>
                {checkedInputs.map(check => {
                        return(
                            <tr>
                                <td style={{
                                    textAlign: "center",
                                    padding: "0px 60px",
                                }}>{check}</td>
                                <td style={{
                                        textAlign: "center",
                                }}>{colors.map(color => {
                                        return(
                                            <div>
                                                <span id="proSize" className={color}>{color}: </span>
                                                <input type={"text"} name={"proColor"} style={{
                                                    width: "30px",
                                                }} maxLength="3" required/>
                                                개
                                            </div>
                                        );
                                })}</td>
                            </tr>
                        );
                    })}
                <td align ="center" colSpan = "2">
                    <button type="button" onClick={handleClick}>이전</button><button type="submit">다음</button>
                </td>
            </table>
        </form>
    );
};
export default RegisterProSize;