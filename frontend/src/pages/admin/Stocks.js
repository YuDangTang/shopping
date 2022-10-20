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
    const s = document.querySelector(".search");
    const onSubmitHandler = async (e) => { 
        e.preventDefault(); // 기본동작 막기
        getData();
    };
    const arr = ["상품코드", "상품명", "사이즈", "색상", "창고재고", "주문대기", "가재고",
    "재고수정", "통보수량", "판매", "품절", "재입고알림", "관리"];
    return(
        <>
            <form onSubmit={onSubmitHandler}
                style={{marginBottom: "10px"}}>
                상품명 검색: <input type="text" className="search" name="search" placeholder="상품명"/>
                <input type="submit" value="검색" />
            </form>
            <table align ="center" border={1} cellSpacing={0}
                    style={{maxWidth: "1500px"}}>
                    <tr>
                        {arr.map(a => {
                            return(
                                <>
                                    <Td td={a} />
                                </>
                            );
                        })}
                    </tr>
                    <tr>
                        {
                            products.map(value => {
                                return(
                                    <>
                                        <td rowSpan={
                                            value.proSize[0].proColor[0].colorAmout.length * value.proSize[0].proColor.length +1
                                        }>{value._id}</td>
                                        <td rowSpan={
                                            value.proSize[0].proColor[0].colorAmout.length * value.proSize[0].proColor.length +1
                                        }>{value.proName}</td>
                                    </>
                                );
                            })
                        }
                    </tr>
                    {
                        products.map(value => {
                            // console.log(value.proSize[0].proColor);
                            // console.log(value.proSize[0].proColor[0]);
                            return(
                                <>
                                    {
                                        value.proSize[0].proColor.map(color => {
                                            console.log("COLOR: ", color);
                                            return(
                                                <>
                                                    <tr>
                                                        <td rowSpan={color.colorAmout.length}>
                                                            {color.size}
                                                        </td>
                                                        <td>{color.colorAmout[0].color}</td>
                                                        <td>{color.colorAmout[0].amout}</td>
                                                        <td>{color.colorAmout[0].orderQuan}</td>
                                                        <td>{color.colorAmout[0].amout - color.colorAmout[0].orderQuan}</td>
                                                        <td><input type={"text"} /></td>
                                                        <td>{color.colorAmout[0].notiQuan}</td>
                                                        <td><input type={"checkbox"} /></td>
                                                        <td><input type={"checkbox"} /></td>
                                                        <td><input type={"checkbox"} /></td>
                                                        <td>수정</td>
                                                    </tr>
                                                    {
                                                        color.colorAmout.map((c, index) => {
                                                            console.log("C: " ,c);
                                                            return(
                                                                <>
                                                                    {
                                                                        index != 0
                                                                        ? <tr>
                                                                            <td>{c.color}</td>
                                                                            <td>{c.amout}</td>
                                                                            <td>{c.orderQuan}</td>
                                                                            <td>{c.amout - c.orderQuan}</td>
                                                                            <td><input type={"text"} /></td>
                                                                            <td>{c.notiQuan}</td>
                                                                            <td><input type={"checkbox"} /></td>
                                                                            <td><input type={"checkbox"} /></td>
                                                                            <td><input type={"checkbox"} /></td>
                                                                            <td>수정</td>
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
        </> 
    );
}
export default Stocks;