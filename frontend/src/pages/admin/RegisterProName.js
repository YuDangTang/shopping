import {Table} from "../../components/Table.js";
import { useNavigate } from "react-router-dom";
import { ProductObj } from "../../obj/obj.js";
// import ReactDOM from 'react-dom/client';
function RegisterProName(){
    const data = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const proName = e.target.proName.value;
        const proDetail = e.target.proDetail.value;
        const proCost = e.target.proCost.value;
        const proPrice = e.target.proPrice.value;
        ProductObj.proName = proName;
        ProductObj.proDetail = proDetail;
        ProductObj.proPrice.cost = Number(proCost);
        ProductObj.proPrice.price = Number(proPrice);
        if(Number.isNaN(ProductObj.proPrice.price) || Number.isNaN(ProductObj.proPrice.cost)){
            alert("가격은 숫자만 입력해주세요");
            return;
        }
        ProductObj.proPrice.profit =  proPrice - proCost;
        // 해당 주소로 데이터 넘기기
        data('/admin/regProSzie', { state: {ProductObj} });
    };
    return(
        <form onSubmit={onSubmitHandler}>
            <table align ="center" border={1} cellSpacing={1}>
                <tr><td align ="center" colSpan = "2">상품 등록</td></tr>
                <Table td={"상품명"} name={"proName"}/>
                <Table td={"상품 상세 설명"} name={"proDetail"}/>
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>{"가격"}</td>
                    <td align ="center" style={{
                        padding: "0px 16px",
                    }}>원가: <input type="number" name="proCost" required/>
                       판매가: <input type="number" name="proPrice" required/>
                    </td>
                </tr>
                <Table type={"button"}/>
            </table>
        </form>
    );
};
export default RegisterProName;