import axios from "axios";
import { useEffect, useState } from "react"; 
function Admin(){
    const [products, setProducts] = useState([]);
    const getData = async () => {
        const respnose = await axios.get('http://localhost:4000/admin');
        const datas = respnose.data;
        setProducts(datas);
    };
    useEffect(() => {
        getData();
    }, []);
    const onClickHandler = async (e) =>{
        if(e.target.innerHTML === "상품수정"){
            window.location.href = "/admin/" + e.target.id + "/update";
        }else if(e.target.innerHTML === "재고관리"){
            window.location.href = "/admin/" + e.target.id + "/stocks";
        }else if(e.target.innerHTML === "상품삭제"){
            var com = window.confirm("해당 상품을 정말로 삭제하시겠습니까?");
            if(!com){return;}
            const obj = {};
            obj.id = e.target.id;
            await axios.post('http://localhost:4000/admin', obj)
            .then((response) => {
                if(response.data != "fail"){
                    alert("상품이 삭제되었습니다.");
                    setProducts(response.data);
                }
            });
        }
    }
    return(
        <>
            {
                <table align ="center" border={1} cellSpacing={0.5}>
                    <tr>
                        <td>상품이미지</td>
                        <td>상품명</td>
                        <td>상품수정</td>
                        <td>재고관리</td>
                        <td>상품삭제</td>
                    </tr>
                    {
                        products.map(value => {
                            return(
                                <>
                                    <tr>
                                        <td><img src={value.proImg[0]} 
                                        style={{width:"100px", height:"100px"}}/></td>
                                        <td>{value.proName}</td>
                                        <td><button id={value._id} onClick={onClickHandler}>상품수정</button></td>
                                        <td><button id={value._id} onClick={onClickHandler}>재고관리</button></td>
                                        <td><button id={value._id} onClick={onClickHandler}>상품삭제</button></td>
                                    </tr>
                                </>
                            );
                        })
                    }
                </table>
            }
        </>
    );
}
export default Admin;