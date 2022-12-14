import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateFilterData from "../../components/DateFilterData";
import axios from "axios";

function Order() {

    const [order, setorder] = useState([]); //리스폰스 데이타 객체 담기
    const [payDate, setpayDate] = useState(""); //날짜 정보 담기
    const [realStartDate, setrealStartDate] = useState(new Date());
    const [realEndDate, setrealEndDate] = useState(new Date());




    async function getData1() {
        const userkey = {};
        userkey.id = sessionStorage.getItem('id');
        console.log("겟데이터 보냄")
        await axios.post("http://localhost:4000/myshop/Order", userkey)
            .then((response) => {
                console.log("난 데이ㅓㅌ: ", response.data);
                setorder(response.data);
                setpayDate(response.data.payDate);
            });


        let threeMonthAgo2 = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 3,
            new Date().getDate()
        );
        setrealStartDate(threeMonthAgo2);

    };

    //조회버튼 클릭시 주문 정보 가져오기
    const getData2 = async () => {
        setrealStartDate(startDate);
        setrealEndDate(endDate);
    };


    //렌더링 되자마자 주문 정보 가져오기
    useEffect(() => {
        getData1();
    }, []);



    const [btnClicked, setBtnClicked] = useState("3개월");
    const [startDate, setStartDate] = useState(new Date());





    const [endDate, setEndDate] = useState(
        new Date(new Date().getTime() + 0 * 24 * 60 * 60 * 1000)
    );




    // 날짜 버튼 클릭, 기간 변경 기능
    const handleBtnClicked = (e) => {
        const { value } = e.target;
        setBtnClicked(value);
        const currentDate = new Date();
        // 기본값: placeholder 내용
        // 오늘 날짜
        if (value === "오늘") {
            setStartDate(new Date());
            setEndDate(new Date());
        }
        // 1주일 전부터 오늘까지의 기간
        if (value === "1주일") {
            let weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
            setStartDate(weekAgo);
            setEndDate(new Date());
        }
        // 1개월 전부터 오늘까지의 기간
        if (value === "1개월") {
            let oneMonthAgo = new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 1,
                new Date().getDate()
            );
            setStartDate(oneMonthAgo);
            setEndDate(new Date());
        }
        // 3개월 전부터 오늘까지의 기간
        if (value === "3개월") {
            let threeMonthAgo = new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 3,
                new Date().getDate()
            );
            setStartDate(threeMonthAgo);
            setEndDate(new Date());
        }
        // 6개월 전부터 오늘까지의 기간
        if (value === "6개월") {
            let threeMonthAgo = new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 6,
                new Date().getDate()
            );
            setStartDate(threeMonthAgo);
            setEndDate(new Date());
        }

        console.log(value);
    }


    console.log("렌더링 되자마자 3개월 기원", realStartDate.toISOString());
    console.log("바뀐 시작 날짜 : ", realStartDate.toISOString());
    console.log("바뀐 끝 날짜:", realEndDate.toISOString());

    if (realStartDate.toISOString() <= order.payDate) {
        console.log("값은 확인했다.")
        console.log(realStartDate.toISOString());
        console.log(order.payDate);
    }


    return (
        <Container>
            <Contents>
                <Path>현재위치 -- 현재위치</Path>
                <Title>
                    <Titletext>ORDER</Titletext>
                </Title>
                <InfoTitleDiv><ControlInfo><ControlInfocontents>주문내역조회</ControlInfocontents></ControlInfo></InfoTitleDiv>
                <OrderHistory>
                    <Historyboxfieldset style={{ display: "flex", flexDirection: "row" }}>
                        <SelectDiv>
                            <SelectOption>
                                <OptionStyle>전체 주문처리상태</OptionStyle>
                            </SelectOption>
                        </SelectDiv>

                        <PrieodSpan>
                            {DateFilterData.map((el, idx) => ( //map 돌려서 데이터필터 컴포넌트 아이디 갯수만큼 버튼을 보여주자
                                <PeriodInput
                                    onClick={handleBtnClicked}
                                    key={idx}
                                    backgroundColor={btnClicked === el.value}
                                    value={el.value}
                                    placeholder={el.value}
                                />))}

                        </PrieodSpan>
                        <div>
                            <CalendarInput
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                maxDate={new Date()}
                            />
                        </div>
                        <div>
                            <CalendarA
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                maxDate={new Date()}
                                value=""
                            />
                        </div>
                        ~
                        <div style={{ marginLeft: "5px" }}>
                            <CalendarInput
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                maxDate={new Date()}
                            />
                        </div>
                        <div>
                            <CalendarA
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                maxDate={new Date()}
                                value=""
                            />
                        </div>
                        <CheckBut onClick={getData2}>조회</CheckBut>
                    </Historyboxfieldset>
                    <Ul>
                        <li style={{ fontSize: "11px", padding: "0 0 0 9px" }}> - 기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난 주문내역을 조회하실 수 있습니다.</li>
                    </Ul>
                </OrderHistory>
                <OrderHistory>
                    <TitleH3Div><HH3>주문 상품 정보</HH3></TitleH3Div>
                    <InfoTable border="1">
                        <colgroup>
                            <col style={{ width: "140px" }}></col>
                            <col style={{ width: "93px" }}></col>
                            <col style={{ width: "auto" }}></col>
                            <col style={{ width: "61px" }}></col>
                            <col style={{ width: "111px" }}></col>
                            <col style={{ width: "111px" }}></col>
                            <col style={{ width: "111px" }}></col>
                        </colgroup>

                        <tr style={{ borderBottom: "1px solid #ebebeb" }}>
                            <InfoTh>주문일자<br></br>[주문번호]</InfoTh>
                            <InfoTh>이미지</InfoTh>
                            <InfoTh>상품정보</InfoTh>
                            <InfoTh>수량</InfoTh>
                            <InfoTh>상품구매금액</InfoTh>
                            <InfoTh>주문처리상태</InfoTh>
                            <InfoTh>취소/교환/반품</InfoTh>
                        </tr>
                    </InfoTable>



                    {/*반복시킬 정보 테이블*/}



                    {
                        realStartDate.toISOString() <= order.payDate && order.payDate <= realEndDate.toISOString()
                            ?
                            order.length != 0
                                ? order.pro_ID.map(ord => {
                                    // if(realStartDate.toISOString()<=order.payDate && order.payDate <= realEndDate.toISOString()){
                                    return (<>
                                        {
                                            ord.cartQuan.map(cartQuan => {
                                                return (
                                                    cartQuan.colorAmount.map(orderorder => {
                                                        // if(realStartDate<=order.payDate&& order.paydate<=realEndDate){
                                                        return (
                                                            <>


                                                                <InfoTable2>
                                                                    <colgroup>
                                                                        <col style={{ width: "140px" }}></col>
                                                                        <col style={{ width: "93px" }}></col>
                                                                        <col style={{ width: "auto" }}></col>
                                                                        <col style={{ width: "61px" }}></col>
                                                                        <col style={{ width: "111px" }}></col>
                                                                        <col style={{ width: "111px" }}></col>
                                                                        <col style={{ width: "111px" }}></col>
                                                                    </colgroup>
                                                                    <tr style={{ display: "table-row", verticalalign: "inherit", bordercolor: "inherit", border: "1" }}>
                                                                        <InfoTd22 style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                                            <Tdcontentstext2>{order.payDate}</Tdcontentstext2>
                                                                        </InfoTd22>
                                                                        <InfoTd22><Forimg2 src="//www.fromdayone.co.kr/web/product/tiny/202112/4b1c9e539d03ec2c7c5d537b1126b100.webp"></Forimg2></InfoTd22>
                                                                        <InfoTd22 style={{ paddingLeft: "10px", bordercolor: "#ebebeb", borderRight: "1px solid #ebebeb" }}>
                                                                            <TdcontentsInput2 name={"proName"}
                                                                                value={"[" + ord.proName + "]"}
                                                                                style={{ fontWeight: "bold" }} >
                                                                            </TdcontentsInput2><br></br>
                                                                            <TdcontentsInput2 name={"proName"} style={{ margin: "9px 0 0", color: "#707070", lineheight: "16px" }}
                                                                                value={"[" + cartQuan.size + "]" + "[" + orderorder.color + "]"}
                                                                            >
                                                                            </TdcontentsInput2>
                                                                        </InfoTd22>
                                                                        <InfoTd22 style={{ paddingright: "10px", borderRight: "1px solid #ebebeb", textAlign: "right" }}>
                                                                            <TdcontentsInput2 style={{ margin: "6px 4px 0", fontWeight: "bold", width: "20px", }}
                                                                                name={"proquan"} value={orderorder.quan}>
                                                                            </TdcontentsInput2>
                                                                        </InfoTd22>


                                                                        {/* <InfoTd22 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext2>기본배송</Tdcontentstext2></InfoTd22>
                                    <InfoTd22 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext2>0원</Tdcontentstext2></InfoTd22> */}
                                                                        <InfoTd22 style={{ paddingright: "10px", paddingLeft: 0, paddingRight: "10ox", marginRight: "10px", borderRight: "1px solid #ebebeb", textAlign: "right" }}>
                                                                            {/* <TdcontentsInput2 style={{fontWeight:"bold" ,  width: "35px",textAlign:"left"}}
                                        name={"proPrice"} value={orderorder.price}>
                                    </TdcontentsInput2> */}
                                                                            <Tdcontentstext2 style={{ fontWeight: "bold" }}>{orderorder.price} 원</Tdcontentstext2>
                                                                        </InfoTd22>
                                                                        <InfoTd22 style={{ paddingright: "10px", borderRight: "1px solid #ebebeb", paddingLeft: 0, paddingRight: 0, textAlign: "center" }}><Tdcontentstext2>-</Tdcontentstext2></InfoTd22>
                                                                        <InfoTd22 style={{ paddingright: "10px", borderLeft: "1px solid #ebebeb", textAlign: "center", paddingRight: 0, width: "98px" }}>
                                                                            X
                                                                        </InfoTd22>
                                                                    </tr>
                                                                </InfoTable2>
                                                            </>
                                                        )
                                                        // }else{
                                                        //     return(
                                                        //         <InfoContentsP>주문 내역이 없습니다.</InfoContentsP>
                                                        //     )
                                                        // }
                                                    })
                                                )
                                            })
                                        }
                                    </>)
                                    // }else{
                                    //     return <InfoContentsP>주문 내역이 없습니다.</InfoContentsP>
                                    // }
                                })
                                // <InfoTable2>
                                //     <colgroup>
                                //         <col style={{width:"140px"}}></col>
                                //         <col style={{width:"93px"}}></col>
                                //         <col style={{width:"auto"}}></col>
                                //         <col style={{width:"61px"}}></col>
                                //         <col style={{width:"111px"}}></col>
                                //         <col style={{width:"111px"}}></col>
                                //         <col style={{width:"111px"}}></col>
                                //     </colgroup>
                                //             <tr style={{display: "table-row", verticalalign: "inherit", bordercolor: "inherit", border:"1",borderTop:"1px solid #ebebeb"}}>
                                //             <InfoTd22 style={{paddingLeft:0,paddingRight:0}}>
                                //             <Tdcontentstext2>{payDate}</Tdcontentstext2>
                                //             </InfoTd22>
                                //                 <InfoTd22><Forimg2 src="//www.fromdayone.co.kr/web/product/tiny/202112/4b1c9e539d03ec2c7c5d537b1126b100.webp"></Forimg2></InfoTd22>
                                //                 <InfoTd22 style={{paddingLeft: "10px",bordercolor: "#ebebeb",borderRight:"1px solid #ebebeb"}}>
                                //                 <TdcontentsInput2 name={"proName"}
                                //                     style={{fontWeight:"bold"}} >

                                //                 </TdcontentsInput2><br></br>
                                //                 <TdcontentsInput2 style={{margin: "9px 0 0", color: "#707070", lineheight: "16px"}}>

                                //                 </TdcontentsInput2>
                                //                 </InfoTd22>
                                //                 <InfoTd22 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",textAlign:"right"}}>
                                //                 <TdcontentsInput2 style={{fontWeight:"bold",  width: "30px"}}
                                //                     name={"proPrice"}>
                                //                 </TdcontentsInput2>
                                //                 <Tdcontentstext2 style={{fontWeight:"bold"}}></Tdcontentstext2>
                                //                 </InfoTd22>


                                //                 {/* <InfoTd22 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext2>기본배송</Tdcontentstext2></InfoTd22>
                                //                 <InfoTd22 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext2>0원</Tdcontentstext2></InfoTd22> */}
                                //                 <InfoTd22 style={{paddingright: "10px",paddingLeft: 0, paddingRight: "10ox",marginRight:"10px",borderRight:"1px solid #ebebeb",textAlign:"right"}}>
                                //                 <TdcontentsInput2 style={{fontWeight:"bold" ,  width: "30px"}}
                                //                     name={"proTotalPrice"}>
                                //                 </TdcontentsInput2>
                                //                 <Tdcontentstext2 style={{fontWeight:"bold"}}>원</Tdcontentstext2>
                                //                 </InfoTd22>
                                //                 <InfoTd22 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext2>-</Tdcontentstext2></InfoTd22>
                                //                 <InfoTd22 style={{paddingright: "10px",borderLeft:"1px solid #ebebeb", textAlign:"center",paddingRight: 0,width:"98px"}}>
                                //                 X
                                //                 </InfoTd22>
                                //             </tr>
                                //     </InfoTable2>


                                : <InfoContentsP>주문 내역이 없습니다.</InfoContentsP>
                            : <InfoContentsP>주문 내역이 없습니다.</InfoContentsP>
                    }
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

let OrderHistory = styled.div` //주문내역조회기능 div
    margin: 0;
    padding: 0;
`

let Historyboxfieldset = styled.fieldset` //내용 fieldset
    margin: 0;
    vertical-align: top;
    align-items: center;
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

let PeriodInput = styled.input` //기간선택 button
    margin: 0 0 0 -1px;
    padding: 0; 
    width: 39px;
    height: 24px;
    font-size: 11px;
    border: 1.5px solid #d5d5d5;
    border-radius: 2px;
    color: #757575;
    background-color: #fafafa;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    &:focus {
      outline: none;
  }
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

let CalendarA = styled(DatePicker)` //달력 버튼
    width: 14px;
    height: 14px;
    margin: 0 5px 0 2px;
    background: none;
    overflow: visible;
    vertical-align:middle;
    align-items: center;
    padding: 0;
    border: 0;
    cursor: pointer;
    background: url(//img.echosting.cafe24.com/skin/admin_ko_KR/myshop/ico_cal.gif)
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


let InfoTable2 = styled.table`  //정보 테이블
    /* border-top: 1px solid #ebebeb; */
    line-height: 1.5;
    position: relative;
    width: 100%;
    border: 1;
    border-spacing: 0;
    border-collapse: collapse;
`


let InfoTd22 = styled.td` //정보테이블 tbody td
    padding: 15px 10px 14px;
    border-color: #ebebeb;
    /* border-top: 1px solid #ebebeb; */
    border-bottom: 0.7px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    word-break: break-all;
    word-wrap: break-word;
`

let Forimg2 = styled.img` //img
    max-width: 75px;
    vertical-align: middle;
    margin: 0 2px;
    border: none;
`

let TdcontentsInput2 = styled.input` //텍스트스타일
    font-size: 11px;
    margin: 6px 0 0;
    color: #757575;
    font-weight: bold;
    border: none;
    pointer-events: none;
`


let Tdcontentstext2 = styled.text` //텍스트스타일
    font-size: 11px;
    margin: 6px 0 0;
    color: #757575;
`

let TdcontentsInputNumber2 = styled.input` //텍스트스타일
    font-size: 11px;
    margin: 6px 0 0;
    color: #757575;
    height: 23px;
    font-weight: bold;
    border: 1px solid #d4d8d9;
    border-radius: 3px 0 0 3px;
    cursor: pointer;
        /* 마우스 클릭하고있을때 */
        &:active{
            border: 1px solid #d4d8d9;
            border-radius: 3px 0 0 3px;
        }
        /* 마우스 한번클릭후 */
        &:visited{
            border: 1px solid #d4d8d9;
            border-radius: 3px 0 0 3px;
        }
`

let WhiteButton2 = styled.button` //상품삭제버튼
    
    font-size: 11px;
    line-height: 11px;
    display: inline-block;
    padding: 12px 15px 15px;
    border: 1px solid #ebebeb;
    border-radius: 0px;
    background: #fff;
    margin: 1px 0 0;
    vertical-align: middle;
    -webkit-padding-before: 13px;
    -webkit-padding-after: 14px;
    text-decoration: none;
    color: #666666;
    &:hover{  
    text-decoration: none;
    color: #ccc;
    border-color: #ccc !important;
    cursor: pointer;
    }
`




let BlackButton2 = styled.button` //주문하기버튼
    background: #333 !important;
    color: #fff !important;
    border: 1px solid #333 !important;
    font-size: 11px;
    line-height: 11px;
    display: inline-block;
    padding: 12px 15px 15px;
    border-radius: 0px;
    background: #fff;
    margin: 1px 0 0;
    vertical-align: middle;
    -webkit-padding-before: 13px;
    -webkit-padding-after: 14px;
    &:hover{  
    background: #fff !important;
    color: #8f8f8f !important;
    border-color: #8f8f8f !important;
    cursor: pointer;
    }
    
`