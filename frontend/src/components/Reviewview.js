import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

function Reviewview(props){

    const [data1, setData1] = useState("")//모든 리뷰
    const [reviewcheck, setReviewcheck] = useState(0);//리뷰데이터 몇개있는지 알려줘 for문 돌리고 +1-1될 때마다 바뀌게 해주
    
    console.log("상품 아이디 맞나요?: " + props.url) //product.js에서 Reviewview url{param}으로 주소 가져옴

    const getReData = async (param)=>{
        console.log("시작 부분인데 들어오나유?");
        try{
            console.log("try까지 들어오나유?");
            const response = await axios.post(`http://localhost:4000/product/${param}/reviewview`,{
                pro_ID: props.url
            });//주소는 맞춰서 바꾸자구

            console.log("상품 아이디에 맞는 데이터가 들어오나요?: " + JSON.stringify(response.data))

    
            const reviews = response.data;
            setData1(reviews)//전체 데이터 넣어줌


            for(var i=0; i<reviews.length; i++){
                console.log("제발 나와유");
                setReviewcheck(reviews.length)//데이터 총 몇개?
            }
            console.log("총 몇개의 리뷰가 있는가?: " + reviews.length);

        }catch(err){
            console.log("리뷰 데이터 못 가져왔지요" + err);
        }
    }

    useEffect(()=>{
        getReData();
    }, []); // 처음 한 번만 실행



    return(
        <>
         <div>REVIEW {/*리뷰 상품 아이디랑 비교해서 맞는 것들 전체 개수 출력해*/ }{reviewcheck}개</div>
        {
            // 연지가 준 참고 코드 map돌려서 db에 있는거 하나씩 뽑아와 제발좀;;;
            
                data1 && data1.map((d) =>
                  <td>
                    <hr></hr>
                    <tr>텍스트 출력:{d.proReview}</tr>
                    <tr>등록한 유저 ID:{d.userId}</tr>
                    {/* true false는 if문 사용해서 꺼내야 돼 이거 때문에 시간 많이 날렸따. */}
                    <tr>좋아요? 싫어요?:{((d.proGPA === true)?'종아요':'싫어요')}</tr>
                    <hr></hr>
                    <br></br>
                  </td>
                )       
        }
        </>
    )

}

export default Reviewview;