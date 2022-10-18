import Table from "../../components/Table.js";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductObj } from "../../obj/obj.js";
// import ReactDOM from 'react-dom/client';
function RegisterProMat(){
    const location = useLocation();
    console.log("도착한 데이터: " ,location.state.ProductObj);
    const Materials = ["면", "폴리에스테르", "레이온", "기모", "텐셀", "아크릴",
                        "울", "캐시미어", "앙고라", "린넨", "쭈리", "쉬폰", "나일론", 
                        "코듀로이", "옥스포드", "트위드", "스웨이드"];
    const [checkedInputs, setCheckedInputs] = useState([]);
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
        const proImage = e.target.proImage.value;
        const proMaterial = checkedInputs;
        console.log("data: " , proImage, proMaterial);
        ProductObj.proImg = proImage;
        ProductObj.proMaterial = proMaterial;

        console.log("obj: " , ProductObj);
        
        // 해당 주소로 데이터 넘기기
        //data('/admin/regProSzie', { state: {ProductObj} });
    };
    return(
        <form onSubmit={onSubmitHandler}>
            <table align ="center" border={1} cellSpacing={1}>
                <tr><td align ="center" colSpan = "2">상품 등록</td></tr>
                <Table td={"이미지"} name={"proImage"} />
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>{"소재"}</td>
                    <td align ="center" style={{
                        padding: "0px 16px",
                    }}><div>{Materials.map(value => {
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
                <Table type={"button"}/>
            </table>
        </form>
    );
};
export default RegisterProMat;