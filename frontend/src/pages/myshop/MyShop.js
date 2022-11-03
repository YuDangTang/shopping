import React from 'react';
import axios from 'axios';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




function MyShop(){





    return(
        <Container>
            <Contents>
                <Path>현재위치 -- 현재위치</Path>
                <Title>
                    <Titletext>MY PAGE</Titletext>
                </Title>
                <UserInfo1>
                    <UserInfo2>
                        <UserInfo3>
                            <USerInfoContents>
                            <USerInfoContentsStyle1>저희 쇼핑몰을 이용해 주셔서 감사합니다. <USerInfoBold>{sessionStorage.getItem('id')}</USerInfoBold>님. </USerInfoContentsStyle1> <br></br>
                            <USerInfoContentsStyle2>
                                현재까지 구매금액은 <USerInfoBold>200,000원 입니다.</USerInfoBold> (최근 12개월 동안 구매금액 : 0원) <br></br>
                            </USerInfoContentsStyle2>
                            </USerInfoContents>
                        </UserInfo3>
                    </UserInfo2>
                </UserInfo1>
                <StampPoint>
                    <StampDulicate></StampDulicate>
                    <StampPointUl>
                       <StampPointLi><StampPointTitle>가용 적립금</StampPointTitle><StampPointContents>2000원</StampPointContents></StampPointLi>
                       <StampPointLi><StampPointTitle>총 적립금</StampPointTitle><StampPointContents>2000원</StampPointContents></StampPointLi>
                       <StampPointLi><StampPointTitle>총 주문</StampPointTitle><StampPointContents>2000원</StampPointContents></StampPointLi>
                    </StampPointUl>
                    <StampDulicate2></StampDulicate2>
                </StampPoint>

                <OrderList>
                    <OrderListTitle>
                    <OrderListH3>나의 주문처리 현황 <span style={{padding: "0 0 0 4px", fontWeight: "normal", fontSize: "11px", color: "#8f8f8f"}}>(최근 3개월 기준)</span></OrderListH3>
                    </OrderListTitle>
                    <OrderListContents>
                    <OrderListUl>
                        <OrderListLi>
                            입금전<br></br><br></br>
                            <span style={{fontSize:"24px" , fontWeight:"bold"}}>0</span>
                        </OrderListLi>
                        <OrderListLi>
                            배송준비중<br></br><br></br>
                            <span style={{fontSize:"24px" , fontWeight:"bold"}}>0</span>
                        </OrderListLi>
                        <OrderListLi>
                            배송중<br></br><br></br>
                            <span style={{fontSize:"24px" , fontWeight:"bold"}}>0</span>
                        </OrderListLi>
                        <OrderListLi>
                            배송완료<br></br><br></br>
                            <span style={{fontSize:"24px" , fontWeight:"bold"}}>0</span>
                        </OrderListLi>
                    </OrderListUl>
                    </OrderListContents>
                </OrderList>
                <SelectBigDiv>
                    <SelectDiv>
                        <SelectA href='/myshop/Order'>
                            <Selecth3>
                                ORDER
                            </Selecth3>
                        <p>주문하신 상품의 정보를 확인하실 수 있습니다.</p>
                        </SelectA>
                    </SelectDiv>
                    
                    <SelectDiv>
                        <SelectA href='/member/Modify'>
                            <Selecth3>
                                PROFILE
                            </Selecth3>
                        <p>회원이신 고객님의 개인정보를 관리하는 공간입니다.</p>
                        </SelectA>
                    </SelectDiv>
                </SelectBigDiv>
            </Contents>
        </Container>
    )
}
export default MyShop;



let Container = styled.div`  //가장 큰거 담는 부분
    position: relative;
    width: 100%;
    margin: 0 auto;
    max-width: 1460px;
    width: 100%;
    min-width: 1260px;
    padding: 0 40px;
    box-sizing: border-box;
`

let Contents = styled.div`  //가장 큰거 담는 부분2
    width: 100%;
    position: relative;
    margin: 20px 0 0;
    float: left;
    min-height: 500px;;
`
let Path = styled.div`  //경로담기
    margin-top: 15px;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    font-size: 10px;
    border: 1px;
    text-align: right;
`
let Title = styled.div` //제목부분
    min-height: 30px;
    margin: 15px 0 20px;
    text-align: center;
`

let Titletext = styled.div` //제목스타일
    display: inline-block;
    padding: 0;
    color: #757575;
    font-size: 18px;
    font-weight: normal;
`

let UserInfo1 = styled.div` //유저정보 div1
    margin: 0 0 20px;
    color: #353535;
    padding: 0;
`
let UserInfo2 = styled.div` //유저정보 div2
    margin: 0;
    border-width: 1px;
    border-color: #ebebeb;
    clear: both;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #ebebeb;
    color: #404040;
`
let UserInfo3 = styled.div` //유저정보 div3
    margin: 0;
    display: table;
    table-layout: fixed;
    padding: 15px 0 15px;
    width: 100%;
    box-sizing: border-box;
`
let USerInfoContents = styled.div` //유저정보 내용 div
    margin: 0;
    display: table-cell;
    padding: 0 15px;
    width: auto;
    line-height: 1.5em;
    vertical-align: middle;
    min-height: 70px;
`
let USerInfoContentsStyle1 = styled.span ` //유저정보 내용 스타일
    font-size: 11px;
    color: #404040;
`

let USerInfoContentsStyle2 = styled.div ` //유저정보 내용 스타일
    margin-top: 5px;
    font-size: 11px;
    color: #404040;
`

let USerInfoBold = styled.text`  // 유저정보 내용 강조 스타일
    font-size: 11px;
    color: #404040;
    font-weight: bold;
`

let StampPoint = styled.div` //적립금 div
    margin: 0;
    position: relative;
    padding: 20px 0;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #ebebeb;
    color: #404040;
`

let StampDulicate = styled.div` //적립금 div 반 자르기
    position: absolute;
    top: 0;
    left: 50%;
    display: block;
    content: "";
    width: 1px;
    height: 100%;
    background-color: #e6e6e6;

`

let StampDulicate2 = styled.div` //적립금 li 밀리는것 보정
    content: "";
    display: block;
    clear: both;
`



let StampPointUl = styled.ul ` //적립금 ul
    margin: 0;
    padding: 0;
    display: block;
    list-style-type: disc;

`

let StampPointLi = styled.li` //적립금 li
    list-style: none;
    margin: 5px 0;
    padding: 0 45px;
    float : left;
    width: 50%;
    height: 20px;
    font-size: 12px;
    line-height: 1.6;
    vertical-align: top;
    box-sizing: border-box;
`


let StampPointTitle = styled.strong` //적립금 li 타이틀 스타일
    float: left;
    width: 40%;
    padding: 0 0 0 10px;
    font-weight: normal;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.6;
    color: #404040;
`

let StampPointContents = styled.strong` //적립금 li 내용 스타일
    color: #555;
    float: left;
    width: 50%;
    padding: 0 10px 0 10px;
    text-align: right;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 12px;
    line-height: 1.6;
`

let OrderList = styled.div ` //주문내역 현황 div
    margin: 20px 0 0;
    border: 1px solid #777;
`

let OrderListTitle = styled.div` //주문내역 현황 TItle
    padding: 11px 21px;
    margin: 0;
    border-bottom: 1px solid #ebebeb;
    background: #fafafa;
`

let OrderListH3 = styled.h3 ` //주문내역 현황 h3
    padding: 0;
    font-weight: bold;
    font-size: 14px;
    color: #000;
    margin: 0;
`

let OrderListContents = styled.div ` //주문내역 현황 contents
    overflow: hidden;
    padding: 19px 0;
    margin: 0;
`

let OrderListUl = styled.ul ` //주문내역 현황 ul
    float: left;
    width: 100%;
    margin: 0;
    padding: 0;
`
let OrderListLi = styled.li` //주문내역 현황 li
    float: left;
    width: 25%;
    padding: 0 0 4px;
    margin: 0 -1px 0 0;
    border-right: 1px dotted #ccc;
    text-align: center;
    list-style: none;
    font-size: 14px;
    color: #353535;
    font-weight: bold;
`
let SelectBigDiv = styled.div` //고르기 div를 감싸는 div
    padding: 0;
    margin: 30px 0 0;
    width: 100%;
    box-sizing: border-box;
    float: left;
    border-left: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
    font-size: 0;
`

let SelectDiv = styled.div` //고르기 div
    padding: 0;
    width: 33.33%;
    display: inline-block;
    position: relative;
    margin: 0;
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    text-align: center;
    font-size: 11px;
    box-sizing: border-box;
`

let SelectA = styled.a ` //고르기 a
    padding: 40px 30px;
    width: 100%;
    box-sizing: border-box;
    float: left;
    vertical-align: top;
    background: #fff;
    text-decoration: none;
    color: #666666;
    cursor: pointer;

    &:hover{  
    border: 1px solid #CCCCCC;
    color: #CCC;
    }
`

let Selecth3 = styled.h3` //고르기 h3
    font-size: 12px;
    color: #818181;
    font-weight: normal;
    text-transform: uppercase;
    padding: 0 10px 8px 0;
    margin: 0 10px 0 0;
    display: block;
    font-weight: bold;
`