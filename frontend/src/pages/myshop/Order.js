import React, { useEffect, useState }  from 'react';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




function Order(){

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());






    return(
        <Container>
            <Contents>
                <Path>현재위치 -- 현재위치</Path>
                <Title>
                <Titletext>ORDER</Titletext>
                </Title>
                <InfoTitleDiv><ControlInfo><ControlInfocontents>주문내역조회</ControlInfocontents></ControlInfo></InfoTitleDiv>
                <OrderHistory>
                <Historyboxfieldset style={{display:"flex", flexDirection:"row"}}>
                <SelectDiv> 
                    <SelectOption>
                        <OptionStyle>전체 주문처리상태</OptionStyle>
                    </SelectOption>
                </SelectDiv>

                <PrieodSpan>
                    <PeriodA>
                        <img src='//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date1.gif' 
                        offimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date1.gif"
                        onimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date1_on.gif"
                        alt="오늘"></img>
                    </PeriodA>
                    <PeriodA>
                        <img src="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date2.gif"
                        offimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date2.gif"
                        onimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date2_on.gif"
                        alt="1주일"></img>
                    </PeriodA>
                    <PeriodA>
                        <img src="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date3.gif"
                        offimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date3.gif"
                        onimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date3_on.gif"
                        alt="1개월"></img>
                    </PeriodA>
                    <PeriodA>
                        <img src="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date4.gif"
                        offimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date4.gif"
                        onimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date4_on.gif"
                        alt="3개월"></img>
                    </PeriodA>
                    <PeriodA>
                        <img src="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date5.gif"
                        offimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date5.gif"
                        onimage="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/btn_date5_on.gif"
                        alt="6개월"></img>
                    </PeriodA>
                </PrieodSpan>
                <div >
                <CalendarInput
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    />
                </div>
                <CalendarButt>
                    <img src="//img.echosting.cafe24.com/skin/admin_ko_KR/myshop/ico_cal.gif" style={{verticalAlign:"middle"}}></img>
                </CalendarButt>
                 ~ 
                <div>
                <CalendarInput
                    selected={endDate}
                    onChange={date => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    />
                </div>
                
                <CalendarButt>
                    <img src="//img.echosting.cafe24.com/skin/admin_ko_KR/myshop/ico_cal.gif" style={{verticalAlign:"middle"}}></img>
                </CalendarButt>
                <CheckBut>조회</CheckBut>
                </Historyboxfieldset>
                <Ul>
                    <li style={{fontSize:"11px",padding: "0 0 0 9px"}}> - 기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난 주문내역을 조회하실 수 있습니다.</li>
                    <li style={{fontSize:"11px",padding: "0 0 0 9px"}}> - 주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수 있습니다.</li>
                </Ul>             
                </OrderHistory>
                <OrderHistory>
                    <TitleH3Div><HH3>주문 상품 정보</HH3></TitleH3Div>
                    <InfoTable border="1">
                        <colgroup>
                            <col style={{width:"115px"}}></col>
                            <col style={{width:"93px"}}></col>
                            <col style={{width:"auto"}}></col>
                            <col style={{width:"61px"}}></col>
                            <col style={{width:"111px"}}></col>
                            <col style={{width:"111px"}}></col>
                            <col style={{width:"111px"}}></col>
                        </colgroup>

                        <tr style={{borderBottom:"1px solid #ebebeb"}}>
                            <InfoTh>주문일자<br></br>[주문번호]</InfoTh>
                            <InfoTh>이미지</InfoTh>
                            <InfoTh>상품정보</InfoTh>
                            <InfoTh>수량</InfoTh>
                            <InfoTh>상품구매금액</InfoTh>
                            <InfoTh>주문처리상태</InfoTh>
                            <InfoTh>취소/교환/반품</InfoTh>
                        </tr>
                    </InfoTable>
                    <InfoContentsP>주문 내역이 없습니다.</InfoContentsP>{/* 주문내역이 ㅇ벗을때만 이것 렌더링하기 */}
                </OrderHistory>





            </Contents>
        </Container>
    )
}
export default Order;






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


let InfoTitleDiv = styled.div` //안내 바를 감쌀 디브
    margin: 40px 0 0;   
`

let ControlInfo = styled.ul` //안내 바
    margin: 0 0 20px;
    border-left: 0;
    background: #fff;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-bottom: 1px solid #c9c9c9;
    width: 100%;
    height: 44px;
    position: relative;
    font-size: 0;
` 

let ControlInfocontents = styled.li` //내용
    border-left: 1px solid #c9c9c9;
    border-right: 1px solid #c9c9c9;
    border-top: 3px solid #5a5a5a;
    border-bottom: 1px solid white;
    background: #fff;
    height: 41px;
    display: inline-block;
    position: relative;
    font-size: 11px;
    line-height: 37px;
    margin: 0;
    padding: 0 30px;
    color: #707070;
    text-decoration: none;
    outline: 0;
    text-align: center;
    margin-top: 2px;
   
`

let OrderHistory = styled.div ` //주문내역조회기능 div
    margin: 0;
    padding: 0;
`

let Historyboxfieldset = styled.fieldset` //내용 fieldset
    margin: 0;
    vertical-align: top;
    padding: 20px;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #ebebeb;
    color: #404040;
`

let SelectDiv = styled.div` //옵션선택 div
    display: inline-block;
    padding: 0 12px 0 0;
    margin: 0 5px 0 2px;
    background: url(//img.echosting.cafe24.com/skin/base/common/ico_bar.gif) no-repeat 100% 6px;
`

let SelectOption = styled.select`  //select 스타일
    height: 26px;
    line-height: 26px;
    border: 1px solid #ebebeb;
    font-size: 11px;
    color: #666666;
    vertical-align: middle;
`

let OptionStyle = styled.option` //option 스타일
    font-weight: normal;
    font-size : 11px;
    display: block;
    white-space: nowrap;
    min-height: 1.2em;
    padding: 0px 2px 1px;
`

let PrieodSpan = styled.span` //기간선택 span
    margin: 0 7px;
    vertical-align: middle;
`

let PeriodA = styled.a` //기간선택 a
    margin: 0 0 0 -1px;    
    text-decoration: none;
    color: #666666;
    cursor: pointer;
`

let CalendarInput = styled(DatePicker)` //달력 Input
    display: inline;
    width: 86px;
    height: 24px;
    margin: 0 0 0 2px;
    padding: 0 6px;
    border: 1px solid #d5d5d5;
    line-height: 22px;
    font-size: 12px;
    color: #666666;
    text-align: center;
`

let CalendarButt = styled.button` //달력 버튼
    width: 14px;
    height: 14px;
    margin: 0 5px 0 2px;
    background: none;
    overflow: visible;
    padding: 0;
    border: 0;
    cursor: pointer;
`

let CheckBut = styled.button` //조회 버튼
    margin: 0;
    padding: 0; 
    width: 39px;
    height: 24px;
    font-size: 11px;
    border: 1px solid #495164;
    border-radius: 2px;
    color: white;
    background-color: #495164;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
`
let Ul = styled.ul` //ul
    margin: 10px 0 0;
    color: #939393;
    line-height: 1.5;
    padding: 0;
`

let TitleH3Div = styled.div` //주문상품정보 div
    margin: 40px 0 10px 10px;
    padding: 0;
`

let HH3 = styled.h3` // h3 style
    color: #353535;
    font-size: 12px;
    margin: 0;
    padding: 0;
    font-weight: bold;
`

let InfoTable = styled.table` //정보 table
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    border-top: 1px solid #ebebeb;
    position: relative;
    margin: 10px 0 0;
    line-height: 1.5;
`

let InfoTh = styled.th` //정보 th
    margin: 0;
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    font-weight: normal;
    letter-spacing: 0.5px;
    border: 0;
    font-size: 11px;
`

let InfoContentsP = styled.p` //정보 내용 P
    border: 0;
    margin: -1px 0 0;    
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    padding: 50px 0;
    text-align: center;
    font-size: 11px;
`