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
    const arr = ["상품코드", "상품명", "창고재고", "주문대기", "가재고",
    "재고수정", "통보수량", "판매", "품절", "재입고알림", "관리"];
    return(
        <>
            <form onSubmit={onSubmitHandler}
                style={{marginBottom: "10px"}}>
                <input type="text" class="search" name="search" placeholder="상품명"/>
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
                                        <td>{value._id}</td>
                                        <td>{value.proName}</td>
                                        <td></td>
                                        <td>{value.proStatus.orderQuan}</td>
                                        <td></td>
                                        <td><input type="text" name=""/></td>
                                        <td><input type="text" name="noti"/></td>
                                        <td><input type="checkbox"/></td>
                                        <td><input type="checkbox"/></td>
                                        <td><input type="checkbox"/></td>
                                        <td>{"수정"}</td>
                                    </>
                                );
                            })
                        }
                    </tr>
                    <tr><td td align ="center" colSpan = "11"><input type={"submit"} value={"제출"}/></td></tr>
                </table>
        </> 
    );
}
// const root = ReactDOM.createRoot(document.getElementById('root')); 
// function render(){
//     root.render(<Stocks />);
// }
export default Stocks;