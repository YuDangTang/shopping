import axios from "axios";
import { useEffect, useState  } from "react";
import ItemCard from "../../components/ItemCard";

function Category(){

    const[datas, setDatas] = useState([]);
    const getData = async () => {
        try{
            const response = await axios.get('http://localhost:4000');
            const products = response.data;
            setDatas(products);

        }catch(err){
            console.log('DB연결하고 데이터 가져오는데 에러발생...');
        }

    };
    useEffect(()=>{
        getData();
    }, []);//처음 한번만 실행 없으면 계속실행함


    //모든 아이템의 데이터값을 가져와 map...
    // 파라미터값으로 ItemCard에 보내서 props로 받아서 출력
    console.log(datas);    

    return(
        //id값을 파라미터로 전달한다.
        <ItemCard/>
        

    )
}
export default Category;