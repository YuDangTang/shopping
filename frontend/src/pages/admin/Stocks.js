import axios from "axios";
import { useEffect, useState } from "react"; 
import ReactDOM from 'react-dom/client';
import { Td } from "../../components/Table";
function Stocks(){
    const [products, setProducts] = useState([]);
    const getData = async () => {
        const search = {
            search: document.querySelector(".search").value,
        };
        await axios.post('http://localhost:4000/admin/stocks', search)
        .then((response) => {
            if(response.data == "fail"){
                alert("해당 상품은 존재하지 않습니다.");
                document.querySelector(".search").value = "";
                setProducts([]);
                return;
            }else{
                const datas = response.data;
                const arr = [];
                arr.push(datas);
                setProducts(arr);
            }
        });
    };
    const onSubmitHandler = async (e) => { 
        e.preventDefault(); // 기본동작 막기
        getData();
    }; 
    const onStockHandler = async (e) => { 
        e.preventDefault(); // 기본동작 막기
        const size = document.getElementsByName("proSize");
        const color = document.getElementsByName("proColor");
        // console.log("사이즈 : ", document.getElementsByName("proSize"));
        // console.log("컬러: ", document.getElementsByName("proColor"));
        const order = document.getElementsByName("proOrder");
        const noti = document.getElementsByName("proNoti");
        const proAmount = document.getElementsByName("proAmout");
        // console.log(noti);
        // console.log(proAmount);
        const proSize = []; // proSize.push(obj)
        const obj = {       // proColor.push(proColorObj);
            proColor: [],
        };
        let k = 0;
        for(var i = 0; i < size.length; i++){
            // console.log(size[i].innerHTML);
            const proColorObj = {  // colorAmout.push(amount);
                size : size[i].innerHTML,
                colorAmout : [],
            };
            for(var j = 0; j < color.length/size.length; j++){
                const amount = {
                    color: color[k].innerHTML,
                    amout: proAmount[k].value,
                    orderQuan: order[k].innerHTML,
                    notiQuan: noti[k].value,
                    salesStatus: "판매",
                };
                if((amount.amout - amount.orderQuan) <= 0){
                    amount.salesStatus = "품절";
                }
                proColorObj.colorAmout.push(amount);
                k++;
            }
            obj.proColor.push(proColorObj);
        }
        proSize.push(obj);
        const datas = {
            proName: products[0].proName,
            data: proSize
        };
        await axios.post('http://localhost:4000/admin/stocks', datas)
        .then((response) => {
            const datas = response.data;
            if(datas == "fail"){
                alert("숫자만 입력해주세요");
                return;
            }else{
                alert("재고 수정이 완료되었습니다.");
                const arr = [];
                arr.push(datas);
                setProducts(arr);
                getData();
            }
        });
    };
    const arr = ["상품코드", "상품명", "사이즈", "색상", "창고재고", "주문대기", "가재고",
    "통보수량", "재고수정", "통보수량수정"];
    return(
        <>
            <form onSubmit={onSubmitHandler}
                style={{marginBottom: "20px", marginTop: "20px"}}>
                상품명 검색: <input type="text" className="search" name="search" placeholder="상품명"/>
                <input type="submit" value="검색" />
            </form>
            <form onSubmit={onStockHandler}>
                <table align ="center" border={1} cellSpacing={0}
                        style={{maxWidth: "1500px"}}>
                        <tr style={{backgroundColor: "#3182b7"}}>
                            {arr.map(a => {
                                return(
                                    <>
                                        <Td td={a} styled={                 
                                            {width: "8%", fontWeight:"bold",
                                            padding: "10px",
                                            textAlign: "center",
                                            color: "white"}      
                                        }/>
                                    </>
                                );
                            })}
                        </tr>
                        <tr style={{backgroundColor: "#bce1fb"}}>
                            {
                                products.map(value => {
                                    return(
                                        <>
                                            <Td styled={{textAlign: "center"}} 
                                                row={value.proSize[0].proColor[0].colorAmout.length * value.proSize[0].proColor.length +1} 
                                                td={value._id}/>
                                            <Td styled={{textAlign: "center"}} 
                                                row={value.proSize[0].proColor[0].colorAmout.length * value.proSize[0].proColor.length +1} 
                                                name="proName" value={value.proName} td={value.proName}/>
                                        </>
                                    );
                                })
                            }
                        </tr>
                        {
                            products.map(value => {
                                return(
                                    <>
                                        {
                                            value.proSize[0].proColor.map(color => {
                                                return(
                                                    <>
                                                        <tr>
                                                            <Td styled={{textAlign: "center"}} row={color.colorAmout.length} 
                                                            name={"proSize"} td={color.size}/>
                                                            <Td styled={{textAlign: "center"}} name={"proColor"}
                                                            td={color.colorAmout[0].color}/>
                                                            {
                                                                (color.colorAmout[0].amout-color.colorAmout[0].orderQuan) <= color.colorAmout[0].notiQuan  // 통보수량
                                                                ? <td style={{textAlign: "center", color:"red", fontWeight:"bold"}}>{color.colorAmout[0].amout}!</td>
                                                                : <td style={{textAlign: "center"}}>{color.colorAmout[0].amout}</td>
                                                            }
                                                            <td style={{textAlign: "center"}} name={"proOrder"}>{color.colorAmout[0].orderQuan}</td>
                                                            <Td styled={{textAlign: "center"}} 
                                                                td={color.colorAmout[0].amout - color.colorAmout[0].orderQuan}/>
                                                            <Td styled={{textAlign: "center"}} td={color.colorAmout[0].notiQuan}/>
                                                            <td><input type={"number"} style={{textAlign: "right", width:"80px"}}
                                                                name="proAmout"
                                                                defaultValue={color.colorAmout[0].amout} required/></td>
                                                            <td><input type={"number"} style={{textAlign: "right", width:"80px"}}
                                                                name="proNoti"
                                                                defaultValue={color.colorAmout[0].notiQuan} required/></td>
                                                        </tr>
                                                        {
                                                            color.colorAmout.map((c, index) => {
                                                                return(
                                                                    <>
                                                                        {
                                                                            index != 0
                                                                            ? <tr>
                                                                                <Td styled={{textAlign: "center"}} name={"proColor"} td={c.color}/>
                                                                                {
                                                                                    (c.amout-c.orderQuan) <= c.notiQuan   // 통보수량
                                                                                    ? <td style={{textAlign: "center", color:"red", fontWeight:"bold"}}>{c.amout}!</td>
                                                                                    : <td style={{textAlign: "center"}}>{c.amout}</td>
                                                                                }
                                                                                <td style={{textAlign: "center"}} name={"proOrder"}>{c.orderQuan}</td>
                                                                                <Td styled={{textAlign: "center"}} td={c.amout - c.orderQuan}/>
                                                                                <Td styled={{textAlign: "center"}} td={c.notiQuan}/>
                                                                                <td><input type={"number"} style={{textAlign: "right", width:"80px"}}
                                                                                    name="proAmout"
                                                                                    defaultValue={c.amout} required/></td>
                                                                                <td><input type={"number"} style={{textAlign: "right", width:"80px"}}
                                                                                    name="proNoti"
                                                                                    defaultValue={c.notiQuan} required/></td>
                                                                            </tr>
                                                                            : null
                                                                        }
                                                                    </>
                                                                );
                                                            })
                                                        }
                                                    </>
                                                );
                                            })
                                        }
                                    </>
                                );
                            })
                        }
                        <tr><td td align ="center" colSpan = "13"><input type={"submit"} value={"제출"}/></td></tr>
                </table>
            </form>
        </> 
    );
}
export default Stocks;