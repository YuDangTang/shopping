import { useEffect, useState } from "react";
import React, { Component } from "react";
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { useParams, useNavigate } from "react-router-dom" // 1. useParams 라는 기능을 임포트한다.
import axios from "axios";
import ItemCard from "../../components/ItemCard";

function Search(){
    
    const [searchObj , setSearchObj] = useState([]); //검색한것을 받아 저장 (건들지 말것 리셋 후 출력)
    // 사용자가 검색한 검색어를 get방식으로 받아온다.
    const[inSearchName,setInSearchName] = useState("");
    const[exSearchName,setExSearchName] =useState("");  //제외 검색어 값이 저장된다

    const[reSearchObj, setReSearchObj] = useState([]); //필터링 후 오브젝트가 저장된다.
    const tmp = useParams().searchName; // useEffect를 통해 state저장

    useEffect(()=>{
        getSearchData();
    }, [])


    const getSearchData = async() => {
        try{
            await axios.post(`http://localhost:4000/product/search/DataSite`,{tmp}) //(보낼곳 , 보낼것) 
            .then((res) => {//위에 코드가 실행시 이걸실행 ↓ 값이 있다면 뭘 할건지
                
                if(res.data == "fail"){
                    console.log("faillllll");
                } else {
                    console.log("받은거",res.data);
                    setSearchObj(res.data); // state 생명주기 공부해보자

                }
            })
            
        }catch(err){
            console.log( "검색어 보내는 중 에러발생"+ err);
        }
    }


    return(
        <>
        
        <SearchZone>
            <SearchTitle>
                Search
            </SearchTitle>
            <SearchBox>
                {/* <SearchInputDiv>
                <SearchText>검색 조건</SearchText>
                    <input name="detailSearch" onChange={e=>reSearch(e)} defaultValue={tmp }></input>
                </SearchInputDiv> */}
                <SearchInputDiv>
                    <div>
                    <SearchText>포함 검색어</SearchText>
                    <input name="detailSearch" onChange={e=>{
                        console.log("포함 검색어 : ", e.target.value)
                        setInSearchName(e.target.value);
                    }} >
                    </input>
                    </div>
                    <div>
                    <SearchText>제외 검색어</SearchText>
                    <input name="detailSearch" onChange={e=>{
                        console.log("제외 검색어 : ", e.target.value)
                        setExSearchName(e.target.value);
                    }} >
                    </input>
                    </div>
                </SearchInputDiv>

                    <button onClick={(e)=>{
                        e.preventDefault();
                        var tmpObj = searchObj;
                        var result =[] //result값은 계속 바뀌므로 var이다 
                        // console.log(Boolean(exSearchName)); 값이 들어가있나 체크

                        // if(inSearchName){
                        //     result = tmpObj.filter(obj =>obj.proName.toLowerCase().includes(inSearchName));
                        //     console.log("include 필터링 하고 객체 결과 : ",result);
                        // }
                        // if(exSearchName){
                        //     result = tmpObj.filter(obj =>!obj.proName.toLowerCase().includes(exSearchName));
                        //     console.log("exclude 필터링 하고 객체 결과 : ",result);
                        // }
                        result = tmpObj.filter(obj =>obj.proName.toLowerCase().includes(inSearchName));
                        console.log("include 필터링 하고 객체 결과 : ",result);
                        
                        //값이 있다면 실행해라.
                        if(exSearchName){
                                result = result.filter(obj =>!obj.proName.toLowerCase().includes(exSearchName));
                                console.log("exclude 필터링 하고 객체 결과 : ",result);
                            }
                        


                        setReSearchObj(result); //필터 된 자료

                    }}>필터링</button>


                    <button type="reset" onClick={e=>{
                        console.log("필터링을 취소하였습니다")
                        setReSearchObj([]);
                        setExSearchName("");
                        setInSearchName("");
                    }}>초기화</button>


            </SearchBox>
        </SearchZone>
        <Product_container>
        {   //필터링된 데이터 출력
            reSearchObj.length ?(
                reSearchObj.map(function(_key,i){
                    return <Product><ItemCard product={reSearchObj[i]}></ItemCard></Product>
                })
            ):( // 최초 검색 내용 출력
                searchObj.map(function(_key,i){
                    return <Product><ItemCard product={searchObj[i]}></ItemCard></Product>
                })
            )
        }
        </Product_container>
</>
    )


}export default Search



const SearchZone = styled.form`
    display: flex;
    margin-top: 130px;
    flex-direction:column;
    align-items: center;
    gap : 40px;
    
    `
    const SearchTitle =styled.div`
        display: inline-block;
        padding: 0;
        color: #757575;
        font-size: 18px;
        font-weight: normal;
    
    `
const SearchBox = styled.div`
    display: flex;
    width: 90%;
    padding: 40px;
    box-sizing:border-box;
    border: 2px solid #ebebeb;
    align-items: center;
    flex-direction: column;
    gap:6px;
`

const SearchText = styled.div`
    float: left;
    width: 100px;
    padding: 2px 10px 0 0;
    font-weight:bold;
    color: #353535;

`

const SearchInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    
`
// const SearchZone = styled.div`
//     display: flex;
    
    
// `


//%로 크기 주고 flex wrap :주면 4개 채워지면 100%로 다음으로 내려간다.
let Product_container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin-top: 100px;

`


let Product = styled.div`
    display: flex;
    width: 25%;
    height: 100%;
    margin-bottom:4%;
    /* border: 1px solid black; */
    justify-content: center;
`