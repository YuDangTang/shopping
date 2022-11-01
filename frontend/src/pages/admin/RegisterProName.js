
import Table from "../../components/Table.js";
import { useNavigate, useParams } from "react-router-dom";
import { ProductObj } from "../../obj/obj.js";
import { useEffect, useState } from "react";
import axios from "axios";
// import ReactDOM from 'react-dom/client';
function RegisterProName(props){ 
    const params = useParams();
    const [products, setProducts] = useState([]);
    const getData = async (params) => {
        if(params.id !== undefined){ 
            await axios.post(`http://localhost:4000/admin/${params.id}/update`, params)
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
                }
            }); 
        }
    };
    useEffect(() => {
        getData(params);
    }, [])
    const data = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const proName = e.target.proName.value;
        console.log(proName);
        const proDetail = e.target.proDetail.value;
        const proCost = e.target.proCost.value;
        const proPrice = e.target.proPrice.value;
        ProductObj.proDetail = proDetail;
        ProductObj.proPrice.cost = Number(proCost);
        ProductObj.proPrice.price = Number(proPrice);

        ProductObj.proPrice.profit = ProductObj.proPrice.price - ProductObj.proPrice.cost;
        if(params.id != undefined){
            products[0].originName = products[0].proName;
            products[0].proName = proName;
            products[0].proDetail = proDetail;
            products[0].proPrice.cost = Number(proCost);
            products[0].proPrice.price = Number(proPrice);
            products[0].proPrice.profit = ProductObj.proPrice.price - ProductObj.proPrice.cost;
        }
        ProductObj.proName = proName;

        if(Number.isNaN(ProductObj.proPrice.price) || Number.isNaN(ProductObj.proPrice.cost)){
            alert("가격은 숫자만 입력해주세요");
            return;
        }

        if(ProductObj.proPrice.price < 0 || ProductObj.proPrice.cost < 0){
            alert("0 이상의 숫자만 입력해주세요");
            return;
        }
        if(ProductObj.proPrice.price < ProductObj.proPrice.cost){
            if (!window.confirm("원가보다 낮은 가격에 판매하시겠습니까?")) {
                return;
            } 
        }
        const obj = {
            proName
        };
        if(params.id !== undefined){
            obj.originName = products[0].proName;
        }
        const DB = products[0];
        if(params.id === undefined){ 
            await axios.post('http://localhost:4000/admin/regProName', obj)
            .then(async (response) => {
                console.log(response.data);
                if(response.data == "fail"){
                    alert("이미 존재하는 상품명입니다.");
                    e.target.proName.value = "";
                    return;
                }else{
                    // 해당 주소로 데이터 넘기기
                    //await axios.post('http://localhost:4000/admin/regProName', ProductObj);
                    data('/admin/regProSzie', { state: {ProductObj} });
                }
            });
        }else{
            await axios.post(`http://localhost:4000/admin/${params.id}/update`, obj)
            .then(async (response) => {
                console.log(response.data);
                if(response.data == "fail"){
                    alert("이미 존재하는 상품명입니다.");
                    e.target.proName.value = "";
                    return;
                }else{
                    data(`/admin/${params.id}/update2`, { state: {DB} });
                }
            });
        }

    };


    return(
        <form onSubmit={onSubmitHandler}>
            <table align ="center" border={1} cellSpacing={1}>
                <tr>{
                        params.id == undefined
                        ? <td align ="center" colSpan = "2">상품 등록</td>
                        : <td align ="center" colSpan = "2">상품 수정</td>
                    }</tr>
                { 
                    products[0] != null
                    ? <Table td={"상품명"} name={"proName"} defaultValue={products[0].proName} style={{textAlign:"right"}}/>
                    : <Table td={"상품명"} name={"proName"} style={{textAlign:"right"}}/>
                }
                {
                    products[0] != null
                    ? <Table td={"상품 상세 설명"} name={"proDetail"} defaultValue={products[0].proDetail} style={{textAlign:"right"}}/>
                    : <Table td={"상품 상세 설명"} style={{textAlign:"right"}} name={"proDetail"}/>
                }
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>{"가격"}</td>
                    <td align ="center" style={{
                        padding: "0px 16px",

                    }}>원가: {
                        products[0] != null
                        ? <input type="number" style={{textAlign:"right"}}
                            name="proCost" defaultValue={products[0].proPrice.cost} required/>
                        : <input type="number" style={{textAlign:"right"}} name="proCost" required/>
                    }
                       판매가: {
                            products[0] != null
                            ? <input type="number" style={{textAlign:"right"}} 
                                name="proPrice" defaultValue={products[0].proPrice.price} required/>
                            : <input type="number" style={{textAlign:"right"}} name="proPrice" required/>
                       }

                    </td>
                </tr>
                <Table type={"button"}/>
            </table>
        </form>
    );
};
export default RegisterProName;

