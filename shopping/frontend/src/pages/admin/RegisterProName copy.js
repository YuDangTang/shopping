import Table from "../../components/Table.js";
import Option from "../../components/Option.js";
import { useState } from "react";
import axios from "axios";
// import ReactDOM from 'react-dom/client';
function RegisterProName(){
    const Clothes = ["Free", "XS", "S", "M", "L", "XL"];
    const Shoes = ["220", "225", "230", "235", "240", "245", "250", "255", "260"];
    const [values, setValue] = useState(Clothes);
    const [checkedInputs, setCheckedInputs] = useState([]);
    const handleChange = (e) => {
        if(e.target.value === "SHOES"){
            setValue(Shoes);
            setCheckedInputs([]);
        }else{
            setValue(Clothes);
            setCheckedInputs([]);
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
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const proName = e.target.proName.value;
        const proKindName = e.target.proKindName.value;
        const proSize = checkedInputs;
        const proMaterial = e.target.proMaterial.value;
        const proColor = e.target.proColor.value;
        const proImage = e.target.proImage.value;
        const proDetail = e.target.proDetail.value;
        const proPrice = e.target.proPrice.value;
        const proStatus = e.target.proStatus.value;
        await axios.post('http://localhost:4000/admin/regProduct', {
            proName: proName, proKindName, 
            proSize, 
            proMaterial, proColor,
            proImage, proDetail, proPrice, proStatus
        });
    };
    return(
        <form onSubmit={onSubmitHandler}>
            <table align ="center" border={1} cellSpacing={1}>
                <tr><td align ="center" colSpan = "2">상품 등록</td></tr>
                <Table td={"상품명"} name={"proName"}/>
                {/* <Table td={"종류"} name={"proKindName"} type={"select"}/> */}
                <tr>
                    <td style={{
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
                        padding: "0px 60px",
                    }}>{"사이즈"}</td>
                    <td align ="center" style={{
                        padding: "0px 30px",
                    }}>{values.map(value => {
                        return(
                            <div>
                                <input type={"checkbox"} name={"proSize"} 
                                    value={value}
                                    onChange={(e)=>{
                                        changeHandler(e.currentTarget.checked, value)
                                      }}/>
                                {value}
                            </div>
                        );
                    })}</td>
                </tr>
                {/* <Table td={"사이즈"} name={"proSize"} type={"checkbox"} onClick={handleCheckChange} value={values}/> */}
                <Table td={"소재"} name={"proMaterial"} class={"mat"}/>
                <Table td={"색상"} name={"proColor"} />
                <Table td={"이미지"} name={"proImage"} />
                <Table td={"상품 상세 설명"} name={"proDetail"} />
                <Table td={"가격"} name={"proPrice"} />
                <Table td={"상품 상태"} name={"proStatus"} />
                <Table type={"button"}/>
            </table>
        </form>
    );
};
export default RegisterProName;