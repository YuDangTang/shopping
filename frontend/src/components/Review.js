import {useEffect, useState} from 'react';
// import React,{Component} from "react";
import Radio from "./Radio";
import RadioGroup from './RadioGroup';
import Fileup from "./Fileup";
// import { render } from 'react-dom';
// import { EventEmitter } from 'form-data';
import axios from "axios";
import { useParams } from "react-router-dom";
function Review(){

    // const onSubmithandler = (event) =>{
    //     event.preventDefalut();

    //     let body = {
            
    //     }
    // }
    const [text, setText] = useState(""); //리뷰텍스트 받아올 useState
    const param = useParams().id;//url잘라옴(상품)
    const onChange = (e) =>{
        setText(e.target.value);
        console.log("나는야 텍스트: "+text);
    }

    const [rd, setRd] = useState(true);//라디오 버튼 vaelu값 담아줘. 해줘.
    

    // db연결해서 리뷰데이터 insert해주기
    const addData = async (e) => {
        e.preventDefault(); // 기본동작 막기
        // console.log("이건 되는 코드임?: "+param.document.getElementsByName("good").value)
        try{
            const obj = {};
            // const ra =document.getElementsByName('good')[i].value
            for(var i=0; i<document.getElementsByName('good').length; i++){ //라디오 버튼 set돌려줄 반복문
                setRd(document.getElementsByName('good')[i].value);

            }
            const rbox = text;
            const useridtset = sessionStorage.getItem('id');

            obj.pro_id = param;     // 상품 아이디 가져와유 -> 나옴
            obj.proGPA = rd;           // 좋아유 싫어유 -> 나옴 근데 좋아유만 나와
            console.log("왜그러는거임: "+rd);

            obj.proReview = rbox;      // 리뷰텍스트 -> 나옴
            obj.userId = useridtset;   // 유저아이디 -> 나옴
            
            await axios.post(`http://localhost:4000/product/${param}/review`, obj)
            console.log("hi~")
            .then((response)=>{
                console.log("hihi" + response.data);
                if(response.data === "fail"){
                    alert("리뷰 작성하지 않았어유.");
                    return;
                }else{
                    alert("리뷰 작성 성공했어유.");
                    window.location.href = '/product/:id';
                }
            })


        }catch(err){
            console.log('DB연결하고 데이터 가져오는데 에러발생...');
            console.log("에러좀 알려줘,,,: "+err)
        }
    };

    useEffect(()=>{ //서버로 데이터 넘겨주기
        
    }, []);//처음 한번만 실행 없으면 계속 실행

    
    return(
        <>
        {/* form에 onsubmit해줘 action빼 */}
        <form onSubmit={addData}>
        <div> 리뷰 작성란: <input type="text" name="reviewbox" onChange={onChange} value={text}/> </div>
        <br></br>
        <div>사진추가: <Fileup /></div>
        <br></br>
        <p>최대 4장 첨부가능하며 상품과 상관 없는 포토 리뷰는 통보 없이 삭제될 수 있다.</p>
        <br></br>
        <div>만족도: 
            <RadioGroup>
                <Radio name="good" value="true">좋아요</Radio>
                <Radio name="good" value="false">싫어요</Radio>
            </RadioGroup> 
        </div>
        <br></br>
        <div><button >제출하기</button></div>

        </form>
        </>

    )

    

}

export default Review;