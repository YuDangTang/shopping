import styled from 'styled-components'; // react에 css 바로 사용 라이브러리

function Basket(){
    return(
        <Container>
            <Contents>
                <Path>현재위치 -- 현재위치</Path>
                <Title>
                    <Titletext>SHOPPING CART</Titletext>
                </Title>
                <InfoTitleDiv><ControlInfo><ControlInfocontents>국내배송상품</ControlInfocontents></ControlInfo></InfoTitleDiv>
                <OrderArea>
                <OrderAreaTitle><OrderAreaTitleContents>일반상품</OrderAreaTitleContents><BeforeButton>이전페이지</BeforeButton></OrderAreaTitle>
                <InfoTable>
                    <colgroup>
                        <col style={{width:"92px"}}></col>
                        <col style={{width:"auto"}}></col>
                        <col style={{width:"98px"}}></col>
                        <col style={{width:"75px"}}></col>
                        <col style={{width:"98px"}}></col>
                        <col style={{width:"98px"}}></col>
                        <col style={{width:"85px"}}></col>
                        <col style={{width:"98px"}}></col>
                    </colgroup>
                    <thead style={{    display: "table-header-group", verticalalign: "middle", bordercolor: "inherit"}}>
                        <tr style={{    display: "table-row", verticalalign: "inherit", bordercolor: "inherit"}}>
                            <InfoTh scope='col'>이미지</InfoTh>
                            <InfoTh scope='col'>상품정보</InfoTh>
                            <InfoTh scope='col'>판매가</InfoTh>
                            <InfoTh scope='col'>수량</InfoTh>
                            <InfoTh scope='col'>적립금</InfoTh>
                            <InfoTh scope='col'>배송구분</InfoTh>
                            <InfoTh scope='col'>배송비</InfoTh>
                            <InfoTh scope='col'>합계</InfoTh>
                            <InfoTh scope='col'>선택</InfoTh>
                        </tr>
                    </thead>
                    <tfoot style={{textalign: "right"}}>
                        <tr style={{    display: "table-row", verticalalign: "inherit", bordercolor: "inherit", verticalalign:"middle"}}>
                            <InfoTd colSpan={9}>
                                <span style={{    float: "left", margin: "6px 0 0"}}>[기본배송]</span>
                                <Tdcontentstext>상품구매금액</Tdcontentstext>
                                <Tdcontentstext style={{fontWeight:"bold"}}> 20,000</Tdcontentstext>
                                <Tdcontentstext>+ 배송비</Tdcontentstext>
                                <Tdcontentstext  style={{marginLeft:"6px 0 0"}}> 2,500</Tdcontentstext>
                                <Tdcontentstext> = 합계:</Tdcontentstext>
                                <Tdcontentstext style={{fontWeight:"bold", fontSize: "18px",letterSpacing: "-1px", marginLeft: "10px" }}>22,500</Tdcontentstext>
                                <Tdcontentstext style={{fontWeight:"bold", fontSize: "18px",letterSpacing: "-1px"}}>원</Tdcontentstext>
                             </InfoTd>
                        </tr>
                    </tfoot>
                  
                    <tbody style={{textalign: "center"}}> 
                    <tr style={{    display: "table-row", verticalalign: "inherit", bordercolor: "inherit", border:"1"}}>
                        <InfoTd2><Forimg src="//www.fromdayone.co.kr/web/product/tiny/202112/4b1c9e539d03ec2c7c5d537b1126b100.webp"></Forimg></InfoTd2>
                        <InfoTd2 style={{paddingLeft: "10px",bordercolor: "#ebebeb",borderRight:"1px solid #ebebeb"}}>
                        <Tdcontentstext style={{fontWeight:"bold"}}>상품이름상품이름상품이름상품이름상품이름</Tdcontentstext><br></br>
                        <Tdcontentstext style={{margin: "9px 0 0", color: "#707070", lineheight: "16px"}}>[옵션 : 아이아이]</Tdcontentstext>
                        </InfoTd2>
                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",textAlign:"right"}}><Tdcontentstext style={{fontWeight:"bold"}}>22,500</Tdcontentstext><Tdcontentstext style={{fontWeight:"bold"}}>원</Tdcontentstext></InfoTd2>
                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext style={{fontWeight:"bold"}}>1</Tdcontentstext></InfoTd2>
                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext>-</Tdcontentstext></InfoTd2>
                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext>기본배송</Tdcontentstext></InfoTd2>
                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext>조건</Tdcontentstext></InfoTd2>
                        <InfoTd2 style={{paddingright: "10px",paddingLeft: 0, paddingRight: "10ox",textAlign:"right"}}><Tdcontentstext style={{fontWeight:"bold"}}>22,500</Tdcontentstext><Tdcontentstext style={{fontWeight:"bold"}}>원</Tdcontentstext></InfoTd2>
                        <InfoTd2 style={{paddingright: "10px",borderLeft:"1px solid #ebebeb", paddingRight: 0,width:"98px"}}><BlackButton>주문하기</BlackButton><WhiteButton>상품삭제</WhiteButton></InfoTd2>
                    </tr>
                    </tbody>
                </InfoTable>
                <BasketControlInfo><BasketControlInfocontents>할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다.</BasketControlInfocontents></BasketControlInfo>
                <Clearbasket><ClearButton>장바구니비우기</ClearButton></Clearbasket>
                <FinalTable>
                <colgroup>
                    <col style={{width:"17%"}}></col>
                    <col style={{width:"19%"}}></col>
                    <col style={{width:"auto"}}></col>
                </colgroup>
                <thead  style={{    display: "table-header-group", verticalalign: "middle", bordercolor: "inherit",height: "80px"}}>
                    <tr style={{    display: "table-row", verticalalign: "inherit", bordercolor: "inherit"}}>
                            <FinalTh scope='col' style={{fontWeight:"bold"}}>총 상품 금액</FinalTh>
                            <FinalTh scope='col' style={{fontWeight:"bold"}}>총 배송비</FinalTh>
                            <FinalTh scope='col' style={{fontWeight:"bold"}}>결제 예정금액</FinalTh>
                    </tr>
                </thead>
                <tbody style={{textalign: "center", display: "table-row-group", verticalAlign: "middle", borderColor: "inherit" ,height:"88px"}}> 
                    <tr style={{    display: "table-row", verticalalign: "inherit", bordercolor: "inherit"}}>
                    <FinalTd><FinalDiv>15,000<FinalDiv2 style={{color: "#757575"}}>원</FinalDiv2></FinalDiv></FinalTd>
                    <FinalTd style={{borderLeft: "1px solid #ebebeb"}}><FinalDiv><FinalDiv2>+</FinalDiv2>2,000<FinalDiv2 style={{color: "#757575"}}>원</FinalDiv2></FinalDiv></FinalTd>
                    <FinalTd style={{borderLeft: "1px solid #ebebeb", color:"#5a5a5a"}}><FinalDiv><FinalDiv2>=</FinalDiv2>17,000<FinalDiv2 style={{color: "#757575"}}>원</FinalDiv2></FinalDiv></FinalTd>
                    </tr>
                </tbody>
                </FinalTable>
                <PaymentDiv>
                <PaymentButton>전체상품주문</PaymentButton>
                <PaymentButton2 style={{marginLeft:"1px"}}>선택상품주문</PaymentButton2>
                </PaymentDiv>
                <InfoDiv>
                <InfoDivTitle>이용안내</InfoDivTitle>
                <InfoDivContents>
                <InfoDivh4>장바구니 이용안내</InfoDivh4>
                <InfoDivol>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을 누르시면 됩니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - [쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드 한 파일로 교체됩니다.</li>
                </InfoDivol>
                <InfoDivh4>무이자할부 이용안내</InfoDivh4>
                <InfoDivol>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여 [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - [전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든 상품에 대한 주문/결제가 이루어집니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을 받으실 수 없습니다.</li>
                </InfoDivol>
                </InfoDivContents>
                </InfoDiv>
                </OrderArea>
            </Contents>
        </Container>


    )
}
export default Basket;



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

let OrderArea = styled.div` //주문내역
    display: block;
    margin: 0;
    padding: 0;
`

let OrderAreaTitle = styled.div ` //주문내역이름박스
    display: flex;
    position: relative;
    height: 38px;
    margin: 0;
    padding: 0 0 0 9px;
    border: 1px solid #ebebeb;
    align-items: center;
    border-bottom: 0;
    line-height: 38px;
    background: #f6f6f6;
`

let OrderAreaTitleContents = styled.h3 ` //이름
    display: inline-block;
    vertical-align: middle;
    color: #353535;
    font-size: 12px;
    font-weight: bold;
`

let BeforeButton = styled.button ` //뒤로가기 버튼
    float: right;
    font-size: 11px;
    line-height: 11px;
    //display: inline-block;
    padding: 7px 8px;
    border: 1px solid #ebebeb;
    border-radius: 0px;
    background: #fff;
    margin: 1px 0 0;
    vertical-align: middle;
    color : #666666;
    -webkit-padding-before: 7px;
    -webkit-padding-after: 8px;
    margin-left: 85%;
    cursor: pointer;

    &:hover{  
    border: 1px solid #CCCCCC;
    color: #CCC;
    }
`


let InfoTable = styled.table `  //정보 테이블
    border-top: 1px solid #ebebeb;
    line-height: 1.5;
    position: relative;
    width: 100%;
    border: 1;
    border-spacing: 0;
    border-collapse: collapse;
`

let InfoTh = styled.th ` //정보테이블 th
    padding: 20px 0;
    font-size: 11px;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    font-weight: normal;
    letter-spacing: 0.5px;
    border: 0;
    word-break: break-all;
    word-wrap: break-word;
`

let InfoTd = styled.td` //정보테이블 foot td
    
    padding: 15px 10px 17px;
    font-size: 11px;
    background: #fbfafa;
    border-left: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    vertical-align: middle;
    text-align: right;
    color: #757575;
    word-break: break-all;
    word-wrap: break-word;
`

let Tdcontentstext = styled.text ` //텍스트스타일
    font-size: 11px;
    margin: 6px 0 0;
    color: #757575;
`

let InfoTd2 = styled.td` //정보테이블 tbody td
    padding: 15px 10px 14px;
    border-color: #ebebeb;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    word-break: break-all;
    word-wrap: break-word;
` 

let Forimg = styled.img` //img
    max-width: 75px;
    vertical-align: middle;
    margin: 0 2px;
    border: none;
`



let BlackButton = styled.a` //주문하기버튼
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
let WhiteButton = styled.a` //상품삭제버튼
    
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

let BasketControlInfo = styled.ul` //안내 바
    margin: 0;
    padding : 0;
` 
let BasketControlInfocontents = styled.li` //내용
    padding: 8px 0 8px 33px;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    line-height: 1.5;
    font-size: 11px;
    background: url(//img.echosting.cafe24.com/skin/base/common/ico_info.gif) no-repeat 9px 8px;
`

let Clearbasket = styled.div` //장바구니 비우기 div

    margin: 0 0 40px;
    padding: 20px 0 10px;
    text-align: center;
    float: right;
    text-align: right;

`
let ClearButton = styled.button ` //장바구니비우기버튼

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
    &:hover{  
    text-decoration: none;
    color: #ccc;
    border-color: #ccc !important;
    cursor: pointer;
    }

`

let FinalTable = styled.table ` //결제부분 마지막 table
    border: 0;
    border-spacing: 0;
    border-collapse: collapse;
    border-color: #777;
    border-top: 1px solid black;
    position: relative;
    margin: 10px 0 0;
    color: #fff;
    line-height: 1.5;
    width: 100%; 
`

let FinalTh = styled.th ` //결제부분 마지막 th
    border-left: 0;
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    font-weight: normal;
    letter-spacing: 0.5px;
    display: table-cell;
    display: table-cell;
    font-size: 11px;
`

let FinalTd = styled.td ` //결제부분 마지막 td
    display: table-cell;
    margin: 0;
    border: 0;
    border-color: #ebebeb;
    height: 58px;
    padding: 15px 10px 14px;
    padding-left: 0;
    padding-right: 0;
    border-left: 0;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    word-break: break-all;
    word-wrap: break-word;
`

let FinalDiv = styled.div ` //결제부분 td안에 div

    word-break: normal;
    margin: 0;
    padding: 0;
    display: block;
    color: #757575;
    word-wrap: break-word;
    text-align: center;
    font-weight: bold;
    font-size: 23px;
    letter-spacing: -1px;
`

let FinalDiv2 = styled.text ` //결제부분 td안에 text 스타일
    font-weight: bold;
    font-size: 23px;
    letter-spacing: -1px;
    color: #5a5a5a;
    word-wrap: break-word;
`
let PaymentDiv = styled.div `  //결제버튼이 들어갈 div
    position: relative;
    margin: 10px 0 40px;
    padding: 20px 0 10px;
    text-align: center;
    vertical-align: middle;
`

let PaymentButton = styled.button ` //결제버튼
    background: #333 !important;
    color: #fff !important;
    border: 1px solid #333 !important;
    font-size: 13px;
    line-height: 13px;
    display: inline-block;
    padding: 23px 30px 26px;
    border-radius: 0px;
    background: #fff;
    margin: 1px 0 0;
    vertical-align: middle;
    -webkit-padding-before: 23px;
    -webkit-padding-after: 23px;
    text-align: center;
    &:hover{  
    background: #fff !important;
    color: #8f8f8f !important;
    border-color: #8f8f8f !important;
    cursor: pointer;
    }
`

let PaymentButton2 = styled.button ` //결제버튼2
    background: #5a5a5a !important;
    color: #fff !important;
    border: 1px solid #333 !important;
    font-size: 13px;
    line-height: 13px;
    display: inline-block;
    padding: 23px 30px 26px;
    border-radius: 0px;
    background: #fff;
    margin: 1px 0 0;
    vertical-align: middle;
    -webkit-padding-before: 23px;
    -webkit-padding-after: 23px;
    text-align: center;
    &:hover{  
    background: #fff !important;
    color: #8f8f8f !important;
    border-color: #8f8f8f !important;
    cursor: pointer;
    }
`

let InfoDiv = styled.div` //이용안내 div
    margin: 20px 0;
    border: 1px solid #ebebeb;
    line-height: 18px;
    padding: 0;
`

let InfoDivTitle = styled.h3` //이용안내 h3
    padding: 9px 0 6px 10px;
    border-bottom: 1px solid #ebebeb;
    color: #101010;
    font-size: 12px;
    background: #fbfbfb;
    margin: 0;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
`

let InfoDivContents = styled.div ` //이용안내 contents div
    padding: 0 9px 12px;
    margin: 0;
    display: block;
    line-height: 18px;
`

let InfoDivh4 = styled.h4 `  //이용안내 h4
    margin-top: 13px;
    margin: 22px 0 -4px;
    color: #404040;
    font-size: 11px;
    font-weight: normal;
    padding: 0;
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
`
let InfoDivol = styled.ol ` //이용안내 ol
    margin: 15px 0 0 11px;
    padding: 0;
    display: block;
    /* list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px; */
`