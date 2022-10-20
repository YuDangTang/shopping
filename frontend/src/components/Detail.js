import { useEffect, useState } from "react";
import React, { Component } from "react";
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리


  let init = 0; 
  const Createtable = React.memo(function Createtable() { 
    const [num, setNum] = useState(1);
    const increase = () =>{
        setNum(num+1);
    };

    const decrease = () =>{
        if(num < 2){
            alert("갯수는 1개부터 가능합니다");
            setNum(1);
        }
        else{
        setNum(num-1);
        }
    };
    const numHandle = (e) => { 
        init = e.target.value;
    };

    return(     
    <div>
        <table style={{width: "100%",borderSpacing:"0",borderCollapse:"0"}}>
            <tr style={{display: "tablerow",verticalalign: "inherit",bordercolor: "inherit"}}>
                <td style={{textalign :"left",padding: "0 10px 0 0",verticalAlign:"middle" ,fontWeight: "bold", lineHeight: "21px",fontSize:"12px",width:"220px"}}>
                [La belle rose]리움 하트스퀘어넥 머메이드 훌롱원피스(하객룩/출근룩)<br></br>
                -색상 : , 사이즈 : S
                </td>
                <td style={{textalign :"left",padding: "6.5px 0",verticalAlign:"middle" ,fontWeight: "bold", lineHeight: "18px",fontSize:"12px"}}>
                <span style={{display: "inline-block",position:"relative",verticalAlign:"top", width:"65px"}}><input type = "text" style={{width:"22px", padding:"0 2px 0 3px",border: "1px solid #d4d8d9",borderradius: "3px 0 0 3px"}}value={num} readonly/><img src='/assets/btn_count_up.gif' style={{position:"absolute",left:"28px",top:"-1px",lineHeight:"18px",verticalAlign:"middle"}}onClick={increase}/><img src='/assets/btn_count_down.gif' style={{position:"absolute",left:"28px",bottom:"0",top:"auto"}}onClick={decrease}/></span>
                </td>
                <td style={{textalign :"right",padding: "6.5px 0",verticalAlign:"middle" ,fontWeight: "bold", lineHeight: "18px",fontSize:"12px"}}>
                50,000원
                </td>
                </tr>
        </table>
    </div>
    );
  });




  let init2 = 0; 
  const Createtable2 = React.memo(function Createtable() { 
    const [num, setNum] = useState(1);
    const increase = () =>{
        setNum(num+1);
    };

    const decrease = () =>{
        if(num < 2){
            alert("갯수는 1개부터 가능합니다");
            setNum(1);
        }
        else{
        setNum(num-1);
        }
    };
    const numHandle = (e) => { 
        init2 = e.target.value;
    };

    return(     
    <div>
        <table style={{width: "100%",borderSpacing:"0",borderCollapse:"0"}}>
            <tr style={{display: "tablerow",verticalalign: "inherit",bordercolor: "inherit"}}>
                <td style={{textalign :"left",padding: "0 10px 0 0",verticalAlign:"middle" ,fontWeight: "bold", lineHeight: "21px",fontSize:"12px",width:"220px"}}>
                [La belle rose]리움 하트스퀘어넥 머메이드 훌롱원피스(하객룩/출근룩)<br></br>
                -색상 : , 사이즈 : M
                </td>
                <td style={{textalign :"left",padding: "6.5px 0",verticalAlign:"middle" ,fontWeight: "bold", lineHeight: "18px",fontSize:"12px"}}>
                <span style={{display: "inline-block",position:"relative",verticalAlign:"top", width:"65px"}}><input type = "text" style={{width:"22px", padding:"0 2px 0 3px",border: "1px solid #d4d8d9",borderradius: "3px 0 0 3px"}}value={num} readonly/><img src='/assets/btn_count_up.gif' style={{position:"absolute",left:"28px",top:"-1px",lineHeight:"18px",verticalAlign:"middle"}}onClick={increase}/><img src='/assets/btn_count_down.gif' style={{position:"absolute",left:"28px",bottom:"0",top:"auto"}}onClick={decrease}/></span>
                </td>
                <td style={{textalign :"right",padding: "6.5px 0",verticalAlign:"middle" ,fontWeight: "bold", lineHeight: "18px",fontSize:"12px"}}>
                50,000원
                </td>
                </tr>
        </table>
    </div>
    );
  });


function Detail(){


    const [showing, setShowing] = useState(false);
    const toggleShowing = () => setShowing(prevShowing => !prevShowing);
   
    const [showing2, setShowing2] = useState(false);
    const toggleShowing2 = () => setShowing2(prevShowing2 => !prevShowing2);

        return(
            <Contents>
                <Lilpath>
                    페이지 - 페이지
                </Lilpath>
                <ProductDetail>
                <ImgArea>
                <Imgcontent>
                    <img style={{maxWidth:"100%"}}src='/assets/detail1.webp' />
                </Imgcontent>
                </ImgArea>
                <Info>  
                <InfoTitle>
                제품이름제품이름제품이름제품이름
                </InfoTitle>
                
                <table>
                    <tr>
                        <InfoDetailth>
                        <th style={{fontWeight: "normal"}}>
                            판매가
                        </th>
                        </InfoDetailth>
                        
                        <td  style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px"}}>
                            25000원
                        </td>
                        
                    </tr>
                    <tr>
                        <InfoDetailth>
                        <th  style={{color: "#B80000"}}>
                           할인 판매가
                        </th>
                        </InfoDetailth>
                       
                        <td style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px",color: "#B80000"}}>
                        <strong>0 원</strong>
                        </td>
                        
                    </tr>
                    <tr>
                        <InfoDetailth>
                        <th style={{fontWeight: "normal"}}>
                            코멘트
                        </th>
                        </InfoDetailth>
                        
                        <td style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px"}}>
                            허리골반셔링으로 '골반메이드'핏을 완성하였어요:) 휘뚜루마뚜루 편안함에+여성스러운 라인으로 실루엣을 보정해드리며 군살커버까지 완벽한 핏으로 보여드릴게요♥
                        </td>
                        
                    </tr>
                    <tr>
                        <InfoDetailth>
                        <th style={{fontWeight: "normal"}}>
                            color
                        </th>
                        </InfoDetailth>
                        
                        <td style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px",color:"#767479"}}>
                        <Buttonbutton>아이보리</Buttonbutton><Buttonbutton>블랙</Buttonbutton><br></br>
                        [필수]색상을 반드시 선택해 주세요
                        </td>
                    </tr>
                    <tr>
                        <InfoDetailth>
                        <th style={{fontWeight: "normal"}}>
                            size
                        </th>
                        </InfoDetailth>
                        
                        <td style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px",color:"#767479"}}>
                        <ButtonbuttonSize onClick={toggleShowing}>S</ButtonbuttonSize>                       
                        <ButtonbuttonSize onClick={toggleShowing2}>M</ButtonbuttonSize><br></br>
                        [필수]사이즈를 반드시 선택해 주세요
                        </td>
                    </tr>
                </table>
                {showing === true ? <Createtable>Createtable</Createtable> : null}
                {showing2 === true ? <Createtable2>Createtable2</Createtable2> : null}
                <Totalprice>
                    TOTAL : 0 (0개)
                </Totalprice>
                <Actionarea>
                <Actionarea2>
                
                <Buynow>
                    BUY IY NOW
                </Buynow>
                <div style={{display: "flex", flexdirection: "column"}}>
                <Buynow2>
                    ADD TO CART
                </Buynow2>
                <Buynow3>
                    WISH LIST
                </Buynow3>
                </div>
                </Actionarea2>
                </Actionarea>
                </Info>
                </ProductDetail>
            </Contents>         
        );
};
export default Detail;


let Contents = styled.div`  //가장 큰거 담는 부분
    display : flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 0 0 0;
`

let ProductDetail = styled.div` //이미지랑 정보 둘다담는부분
    display : flex;
    flex-direction: row;
    width: 100%;
    max-width: 1200px;
    position: relative;
    margin: 0 auto;
    padding: 30px 0 0 0;
`

let Lilpath = styled.div`  //경로 보여주는 부분
    margin-top: 15px;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    font-size: 10px;
    border: 1px;
    text-align: right;
`

let Info = styled.div` //정보담는 공간
    width: 35%;
    float: left;
`
let InfoTitle = styled.div` //제품이름
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 30px;
    margin-bottom: 25px;
    font-size: 16px;
    letter-spacing: 0.5px;
    font-weight: normal;
`
let InfoDetailth = styled.div` //제품설명th
    font-weight: normal;
    width: 115px;
    padding: 10px 0;
    font-size: 12px;
    text-align: left;
    vertical-align: middle;
`
let ImgArea = styled.div` //이미지 영역1
    /* width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
    text-align: center; */
    float: left;
    width: 62%;
    margin: 0 3% 0 0;
    float: left;
`

let Imgcontent = styled.div` //이미지 영역2
    width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
    text-align: center;
`

const Buttonbutton = styled.button` //색깔고르기 버튼
    border-radius: 0;
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin: 0 5px 3px 0;
    vertical-align: top;
    color: #666666;
    border: 1px solid #d7d7d7;
    background: #fff;
    padding: 6px 5px;
    font-size: 12px;
    &:hover{  
    color : #CCCCCC;
    cursor : pointer;
  }
`

const ButtonbuttonSize = styled.button` //사이즈고르기 버튼
    border-radius: 0;
    min-width: 28px;
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin: 0 5px 3px 0;
    vertical-align: top;
    color: #666666;
    border: 1px solid #d7d7d7;
    background: #fff;
    padding: 6px 5px;
    font-size: 12px;
    &:hover{  
    color : #CCCCCC;
    cursor : pointer;
  }
`




const Totalprice = styled.div` //가격
    border-top: 1px solid #ebebeb;
    margin-top: 30px;
    font-size: 18px;
    padding: 30px 0 10px;
    color: #757575;
    vertical-align: middle;
    background: #fff;
    letter-spacing: 0.5px;
`
const Actionarea = styled.div` //결제버튼지역
    padding: 10px 0;
`
const Actionarea2 = styled.div` //결제버튼지역2
    padding: 20px 0 10px;
    text-align: center;
`
const Buynow = styled.button `//buy it now 버튼
    width: 100%;
    margin-bottom: 1%;
    font-size: 11px;
    color: #fff;
    padding: 25px 20px;
    background: #4a4a4a;
    border: 0;
    font-weight: bold;
    letter-spacing: 1px;
    text-align: left;

    &:hover{  
    background-color : #CCCCCC;
    cursor : pointer;
  }
`
const Buynow2 = styled.button `//buy it now 밑에 버튼1
    margin-right: 1%;
    width: 49.5%;
    float: left;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 15px;
    text-align: left;
    font-size: 11px;
    line-height: 11px;
    color: #989898;
    background: #fff;
    letter-spacing: 0.5px;
    &:hover{  
    color : #CCCCCC;
    cursor : pointer;
  }
`
const Buynow3 = styled.button `//buy it now 밑에 버튼2
    width: 49.5%;
    float: left;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 15px;
    text-align: left;
    font-size: 11px;
    line-height: 11px;
    color: #989898;
    background: #fff;
    letter-spacing: 0.5px;
    &:hover{  
    color : #CCCCCC;
    cursor : pointer;
  }
`