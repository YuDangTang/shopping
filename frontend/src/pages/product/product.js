import { useEffect, useState } from "react";
import React, { Component } from "react";
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { useParams } from "react-router-dom" // 1. useParams 라는 기능을 임포트한다.
import axios from "axios";



  function CreateOption(props){
    //원하는 객체를 받아와서 사용  
    console.log(props.selectObj);
    console.log(props.selectObj.detailSize);
    console.log(props.selectObj.detailColor);
    console.log(props.selectObj.detailPrice);
    
    
    const [num, setNum] = useState(1);
    const [price, setPrice] = useState(props.selectObj.detailPrice);
  
    const increase = () =>{
        if(num < props.selectObj.detailAmount){
            setNum(num+1);
        }else{
            alert("재고가 부족합니다");
            setNum(props.selectObj.detailAmount);
        }
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
    


    return(   <>

    
        <SelectTable>
            <SelectTr >
                <OptionTd>
                {props.selectObj.param}<br></br>
                - 사이즈 : {props.selectObj.detailSize} 색상 : {props.selectObj.detailColor}
                </OptionTd>
                <CountTd>
                    <CountSpan >
                        <CountInput type = "text" value={num} readonly/>
                        <img src='/assets/btn_count_up.gif' onClick={increase} style={{position:"absolute",left:"28px",top:"-1px",lineHeight:"18px",verticalAlign:"middle"}}/>
                        <img src='/assets/btn_count_down.gif' onClick={decrease} style={{position:"absolute",left:"28px",bottom:"0",top:"auto"}}/>
                    </CountSpan>
                </CountTd>
                <SelectPrice>
                {price * num}원
                </SelectPrice>
                </SelectTr>
        </SelectTable>
    
    </>  
    )
  }





  //메인 상품 디테일==========================
function Product(){

    const[datas, setDatas] = useState([]); // 모든 상품갹체를 집어넣는다.

    //선택한 사이즈
    const[selectSize, setSelectSize] = useState(""); //사이즈 버튼 클릭시 최신화된다.
    const [detailOptionBox, setDetailOptionBox] = useState(""); //사이즈와 색상이 선택되면 넘겨줄 객체가 들어간다.
    //list로 객체들을 전부 상세로 보여줘도 좋지만 한 페이지에서 한 상품만 구매할 수 있게 만드는것도 방법이다.

    

    //사이즈 버튼 클릭시 그에 맞는 색상 띄워주기
    const handleSelect = (e) => {
        // console.log(e)
        return setSelectSize(e)
    }

    //사용자가 모두 선택했을때
    const handleDetail = (detailSize, detailColor,detailAmount, detailPrice) => {
        //선택 사이즈 선택 색상
        console.log(detailSize); 
        console.log(detailColor);
        console.log(detailAmount);
        console.log(detailPrice);

         //{상품이름 :{사이즈, 색상, 갯수} }
        var proOptionObj = {param,detailSize, detailColor,detailAmount, detailPrice};

        return setDetailOptionBox(proOptionObj);
    }
    


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

    // console.log( "product페이지에서 받은 url 데이터는 "+useParams().id); //id값을 받아왔다.
    const param = useParams().id;


    
    var size = []; //상품의 크기값이 들어간다
    var colorAmountObj = []; // 사이즈에대한 색상과 컬러값이 들어간다.
    var detailOption =[]; //디테일에 값들이 들어간다.
        


        return(
            <Contents>
                <Lilpath>
                    페이지 - 페이지
                </Lilpath>
                <ProductDetail>
                <ImgArea>
                <Imgcontent>
                {datas.map(function(_id,i) {
                    if(datas[i].proName===param){
                        const proImg = `/${datas[i].proImg[0]}`;
                        return(
                        <img style={{maxWidth:"100"}} src={proImg}/>
                        )   
                    }
                    })}
                </Imgcontent>
                </ImgArea>
                <Info>  


                    {/* 파라미터로 상품이름 가지고오기 */}
                <InfoTitle>{param}</InfoTitle>
                       
                
                <table>
                    <tr>
                        <InfoDetailth>
                        <th style={{fontWeight: "normal"}}>
                            판매가
                        </th>
                        </InfoDetailth>
                        


                        {   //item price값 가져오기
                            datas.map(function(_id,i) {
                                if(datas[i].proName===param){
                                    return  (<td  style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px"}}>
                                        {datas[i].proPrice.price}
                                        </td>)
                                }
                                })
                        }
                        {/* <td  style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px"}}>
                            25000원
                        </td> */}
                        
                    </tr>
                    <tr>
                        <InfoDetailth>
                        <th  style={{color: "#B80000"}}>
                        할인 판매가
                        </th>
                        </InfoDetailth>
                        {/* <td style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px",color: "#B80000"}}>
                        <strong>0 원</strong>
                        </td> */}
                        {   //item sale price값 가져오기
                            datas.map(function(_id,i) {
                                if(datas[i].proName===param){
                                    return  (<td style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px",color: "#B80000"}}>
                                        {datas[i].proPrice.profit}
                                        </td>)
                                }
                                })
                        }

                        
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

                    {/* 컬러출력 부분 */}

                    <tr>
                        <InfoDetailth>
                        <th style={{fontWeight: "normal"}}>
                            size
                        </th>
                        </InfoDetailth>
                        <td style={{padding: "8px 0", verticalAlign: "middle", textalign: "left",fontSize:"12px",color:"#767479"}}>
                        

                        {/*  상품에 등록된 사이즈 갯수만큼 출력  //버튼 클릭시 value값 가지고 전달하기*/}
                        
                        {datas && 
                            datas.map(function(_id, i) {
                                if(datas[i].proName===param)  {    //datas id값을 id에 넣기
                                    for(var j = 0;j<datas[i].proSize[0].proColor.length;j++){ // 

                                        var tmpSize =  datas[i].proSize[0].proColor[j].size

                                        for(var t=0; t<datas[i].proSize[0].proColor[j].colorAmout.length; t++){

                                            var tmpColor =  datas[i].proSize[0].proColor[j].colorAmout[t].color;
                                            var tmpAmount = datas[i].proSize[0].proColor[j].colorAmout[t].amout;
                                            var tmpPrice = datas[i].proPrice.price;
                                            var objectBox = {tmpColor,tmpAmount, tmpPrice};
                                            var objectLastBox = {tmpSize,objectBox}
                                            colorAmountObj.push(objectLastBox);//우리가 사용할 Object를 얻었다.
                                            // console.log(colorAmountObj)
                                            // colorAmountObj.asign(objectLastBox); 
                                        }
                                        size.push(<Buttonbutton onClick={(e) => handleSelect(e.target.value)} value={datas[i].proSize[0].proColor[j].size}>{datas[i].proSize[0].proColor[j].size}</Buttonbutton>); //리턴할것을 list에 집어 넣는다.
                                        // console.log(colorAmountObj[0].objectBox.tmpColor); 블랙
                                    }
                                    for(var k = 0 ; k<size.length;k++){
                                        // console.log(size.length)
                                        return size
                                    }
                                }
                            })
                        }
                            


                        </td>
                    </tr>
                    <tr>
                        
                        {/* 사이즈에 따른 컬러( 갯수 1개 이상인것만 표시 */}
                        {selectSize && <>
                            <th></th>
                            {
                                colorAmountObj.map(function(_id,i) {
                                    if(selectSize === 'Free'){
                                        if(colorAmountObj[i].tmpSize==='Free'){
                                            return <Buttonbutton value={colorAmountObj[i].objectBox.tmpColor} 
                                            onClick={(e) => handleDetail(colorAmountObj[i].tmpSize, e.target.value, colorAmountObj[i].objectBox.tmpAmount, colorAmountObj[i].objectBox.tmpPrice )} >
                                                {colorAmountObj[i].objectBox.tmpColor} ({colorAmountObj[i].objectBox.tmpAmount}) </Buttonbutton>

                                        }
                                    }else if(selectSize === 'S'){
                                        if(colorAmountObj[i].tmpSize==='S'){
                                            return <Buttonbutton value={colorAmountObj[i].objectBox.tmpColor} 
                                            onClick={(e) => handleDetail(colorAmountObj[i].tmpSize, e.target.value, colorAmountObj[i].objectBox.tmpAmount, colorAmountObj[i].objectBox.tmpPrice )}>{colorAmountObj[i].objectBox.tmpColor} ({colorAmountObj[i].objectBox.tmpAmount}) </Buttonbutton>

                                        }
                                    }else if(selectSize === 'M'){
                                        if(colorAmountObj[i].tmpSize==='M'){
                                            return <Buttonbutton value={colorAmountObj[i].objectBox.tmpColor}
                                            onClick={(e) => handleDetail(colorAmountObj[i].tmpSize, e.target.value, colorAmountObj[i].objectBox.tmpAmount, colorAmountObj[i].objectBox.tmpPrice )} >{colorAmountObj[i].objectBox.tmpColor} ({colorAmountObj[i].objectBox.tmpAmount}) </Buttonbutton>

                                        }
                                    }else if(selectSize === 'L'){
                                        if(colorAmountObj[i].tmpSize==='L'){
                                            return <Buttonbutton value={colorAmountObj[i].objectBox.tmpColor} 
                                            onClick={(e) => handleDetail(colorAmountObj[i].tmpSize, e.target.value, colorAmountObj[i].objectBox.tmpAmount , colorAmountObj[i].objectBox.tmpPrice )}>{colorAmountObj[i].objectBox.tmpColor} ({colorAmountObj[i].objectBox.tmpAmount}) </Buttonbutton>

                                        }
                                    }
                                })
                            }
                            </>
                        }
                        </tr>
                        </table>
                    {/* 컬러 선택시 선택 옵션 창 뜨기 리스트에있는 맵 돌려*/}
                    {
                        detailOptionBox && 
                        <CreateOption selectObj={detailOptionBox}></CreateOption>

                        
                    }
                    

                {/* //총 갯수 표시 */}
                <Totalprice>
                    TOTAL : 0 (0개)
                </Totalprice>
                <Actionarea>
                <Actionarea2>
                
                {/* db에 상품명, 판매가, 사이즈, 컬러, 수량 (누가샀는지 session에 존재) 보내줘  결제창으로*/}
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
export default Product;


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





// 사용자가 선택한 것 css

const SelectTable = styled.table`
width: 100%;
border-spacing: 0;
border-collapse: 0;
`
const SelectTr = styled.tr`
    display: table-row;
    vertical-align:inherit;
    border-color: inherit;

`
const OptionTd = styled.td`
    text-align: left;
    padding: 0 10px 0 0;
    vertical-align: middle;
    font-weight: bold;
    line-height: 21px;
    font-size: 12px;
    width: 220px;

`
const CountTd = styled.td`
    text-align: left;
    padding: 6.5px 0;
    vertical-align: middle;
    font-weight: bold;
    line-height: 18px;
    font-size: 12px;
`
const CountSpan = styled.span`
    display: inline-block;
    position: relative;
    vertical-align: top;
    width: 65px;

`

const CountInput = styled.input`
    width: 22px;
    padding: 0 2px 0 3px;
    border: 1px solid #d4d8d9;
    border-radius: 3px 0 0 3px;

`
const SelectPrice = styled.td`
    text-align: right; padding: 6.5px 0; vertical-align: middle; font-weight: bold; line-height: 18px;, font-size: 12px;
`