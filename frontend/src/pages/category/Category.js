import axios from "axios";
import { useEffect, useState  } from "react";
import styled from "styled-components";
import ItemCard from "../../components/ItemCard";



function Category(){

    const[datas, setDatas] = useState([]); // 모든 상품을 집어넣어


    //db연결하고 상품 테이블 가지고와 products에 저장하고 지역 state에 setDatas 해준다.
    const getData = async () => {
        try{
            const response = await axios.get('http://localhost:4000');
            const products = response.data;
            // console.log(products);
            setDatas(products);

        }catch(err){
            console.log('DB연결하고 데이터 가져오는데 에러발생...');
        }
    };
    useEffect(()=>{
        getData();      
    }, []);//처음 한번만 실행 없으면 계속실행함

//======================//======================//======================//======================//======================


    //모든 아이템의 id값을 가지고 오고싶다.//모든 아이템의 데이터값을 가져와 map...// 파라미터값으로 ItemCard에 보내서 props로 받아서 출력    
     //id값 들어가는 배열 선언 // 배열에 id값만 뽑아 넣기 // 상품 id값들이 잘 들어갔나 확인
    console.log(datas.length);
    console.log(datas); 

    //상품갯수 구하기
    var dataLength = datas.length;





//리스트 갯수만큼 반복해서 출력하게 설계
    return(
    <>
        

        <Category_Title>모든 상품</Category_Title>
        <div style={{textalign:"right", color:"gray"}}><p >상품 갯수 : {dataLength} 개</p></div>

        <Product_container>
            {
                datas.map(function(_id,i) {
                    return  <Product><ItemCard key ={i} product ={datas[i]} /> </Product>
                    })
            }
        </Product_container>
    </>
    )
}export default Category;

let Category_Title = styled.h2`
    text-align: center;
    font-size: 30px;
    padding: 100px;
    font-family: 'Old Standard TT',serif;

`


//%로 크기 주고 flex wrap :주면 4개 채워지면 100%로 다음으로 내려간다.
let Product_container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;



`

let Product = styled.div`
    display: flex;
    width: 25%;
    height: 100%;
    margin-bottom:4%;
    /* border: 1px solid black; */
    justify-content: center;
`