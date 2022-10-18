import Table from "../../components/Table.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ProductObj } from "../../obj/obj.js";
// import ReactDOM from 'react-dom/client';
function RegisterProName(){
    const Materials = ["면", "폴리에스테르", "레이온", "기모", "텐셀", "아크릴",
                        "울", "캐시미어", "앙고라", "린넨", "쭈리", "쉬폰", "나일론", 
                        "코듀로이", "옥스포드", "트위드", "스웨이드"];
    const [checkedMats, setCheckedMats] = useState([]);
    const changeMatHandler = (checked, value) => {
        if (checked) {
            setCheckedMats([...checkedMats, value]);
        } else {
        // 체크 해제
            setCheckedMats(checkedMats.filter((el) => el !== value));
        }
    };
    const data = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const proName = e.target.proName.value;
        const proDetail = e.target.proDetail.value;
        const proCost = e.target.proCost.value;
        const proPrice = e.target.proPrice.value;
        const proMat = checkedMats;
        console.log("data: " , proName,
            proDetail,
            proCost,
            proPrice,
            proMat);
        ProductObj.proName = proName;
        ProductObj.proDetail = proDetail;
        ProductObj.proPrice.cost = proCost;
        ProductObj.proPrice.price = proPrice;
        ProductObj.proPrice.profit = proCost - proPrice;
        ProductObj.proMat = proMat; 
        console.log("obj: " , ProductObj);
        console.log("상품 이름: " , ProductObj.proName);
        
        // 해당 주소로 데이터 넘기기
        data('/admin/regProSzie', { state: {ProductObj} });
    };
    return(
        <form onSubmit={onSubmitHandler}>
            <table align ="center" border={1} cellSpacing={1}>
                <tr><td align ="center" colSpan = "2">상품 등록</td></tr>
                <Table td={"상품명"} name={"proName"}/>
                <Table td={"상품 상세 설명"} name={"proDetail"} />
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>{"가격"}</td>
                    <td align ="center" style={{
                        padding: "0px 16px",
                    }}>원가: <input type="text" name="proCost" />
                       판매가: <input type="text" name="proPrice" />
                    </td>
                </tr>
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
                                    name={"proMat"}
                                    onChange={(e)=>{
                                        changeMatHandler(e.currentTarget.checked, value)
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
export default RegisterProName;