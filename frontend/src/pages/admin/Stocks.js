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
    const arr = ["상품코드", "상품명", "사이즈", "색상", "창고재고", "주문대기", "가재고",
    "재고수정", "통보수량", "판매", "품절", "재입고알림", "관리"];
    return(
        <>
            <form onSubmit={onSubmitHandler}
                style={{marginBottom: "20px", marginTop: "20px"}}>
                상품명 검색: <input type="text" className="search" name="search" placeholder="상품명"/>
                <input type="submit" value="검색" />
            </form>
            <table align ="center" border={1} cellSpacing={0}
                    style={{maxWidth: "1500px"}}>
                    <tr style={{backgroundColor: "#3182b7"}}>
                        {arr.map(a => {
                            return(
                                <>
                                    <Td td={a} styled={                 
                                        {width: "8%",
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
                                            td={value.proName}/>
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
                                                        td={color.size}/>
                                                        <Td styled={{textAlign: "center"}} td={color.colorAmout[0].color}/>
                                                        <Td styled={{textAlign: "center"}} td={color.colorAmout[0].amout}/>
                                                        <Td styled={{textAlign: "center"}} td={color.colorAmout[0].orderQuan} />
                                                        <Td styled={{textAlign: "center"}} 
                                                            td={color.colorAmout[0].amout - color.colorAmout[0].orderQuan}/>
                                                        <td><input type={"text"} /></td>
                                                        <Td styled={{textAlign: "center"}} td={color.colorAmout[0].notiQuan}/>
                                                        <Td type={"checkbox"} />
                                                        <Td type={"checkbox"} />
                                                        <Td type={"checkbox"} />
                                                        <td>수정</td>
                                                    </tr>
                                                    {
                                                        color.colorAmout.map((c, index) => {
                                                            return(
                                                                <>
                                                                    {
                                                                        index != 0
                                                                        ? <tr>
                                                                            <Td styled={{textAlign: "center"}} td={c.color}/>
                                                                            <Td styled={{textAlign: "center"}} td={c.amout}/>
                                                                            <Td styled={{textAlign: "center"}} td={c.orderQuan}/>
                                                                            <Td styled={{textAlign: "center"}} td={c.amout - c.orderQuan}/>
                                                                            <td><input type={"text"} /></td>
                                                                            <Td styled={{textAlign: "center"}} td={c.notiQuan}/>
                                                                            <Td type={"checkbox"} />
                                                                            <Td type={"checkbox"} />
                                                                            <Td type={"checkbox"} />
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