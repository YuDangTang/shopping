import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Post from "../../components/Post";
import { useEffect } from 'react';
import axios from "axios";

// //무통장입금 선택시
const Createtable = React.memo(function Createtable() {
  
  return(     
    <div style={{padding: "10px 20px"}}>
        <table style={{borderTop: "1px solid #ebebeb", position: "relative", margin: "10px 0 0", color: "#fff", lineHeight: "1.5",width: "100%", border: "0"}}>
          
          
          
            <colgroup>
                <col style={{width : "139px"}}></col>
                <col style={{width : "auto"}}></col>
            </colgroup>
            <tbody>
                <tr style={{display: "tablerow",verticalAlign: "inherit", bordercolor: "inherit"}}>
                    <th style={{padding: "5px 0 5px 9px", verticalAlign: "middle", borderLeft:0, border: 0, borderTop: "1px solid #ebebeb", borderBottom: "1px solid #ebebeb", color: "#757575", textAlign:"left", fontWeight: "normal",fontSize:"11px"}}>입금자명</th>
                    <td style={{padding: "5px 0 5px 9px", verticalAlign: "baseline", borderLeft:0, border: 0, borderTop: "1px solid #ebebeb", borderBottom: "1px solid #ebebeb", color: "#757575", textAlign:"left", fontWeight: "normal"}}><OrderInput style={{verticalAlign:"middle",marginTop:0}}></OrderInput></td>
                </tr>
                <tr style={{display: "tablerow",verticalAlign: "inherit", bordercolor: "inherit",height:"60px",verticalAlign:"middle"}}>
                    <th style={{padding: "5px 0 5px 9px", verticalAlign: "middle", borderLeft:0, border: 0, borderTop: "1px solid #ebebeb", borderBottom: "1px solid #ebebeb", color: "#757575", textAlign:"left", fontWeight: "normal",fontSize:"11px"}}>입금은행</th>
                    <td style={{padding: "5px 0 5px 9px", verticalAlign: "middle", borderLeft:0, border: 0, borderTop: "1px solid #ebebeb", borderBottom: "1px solid #ebebeb", color: "#757575", textAlign:"left", fontWeight: "normal"}}>
                        <select style={{width:"233px", height: "26px", lineHeight: "26px",border: "1px solid #ebebeb", fontSize: "11px", color: "#666666", verticalAlign: "middle"}}>
                            <option value={-1} style={{fontSize:"11px"}}>선택해 주세요.</option>
                            <option value={1} style={{fontSize:"11px"}}>국민은행 245802-00-175871 박상환</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  );
});


// //카카오 결제 선택시
const Createtable2 = React.memo(function Createtable() { 

   return(     
    <div style={{margin: "50px 0 0 130px",height:"100%"}}>
        <li style={{color: "#707070",listStyleType: "none",fontSize:"11px",marginBottom:"1.4px"}}> - 휴대폰에 설치된 카카오톡 앱에서 비밀번호 입력만으로 빠르고 안전하게 결제가 가능한 서비스 입니다.</li>
        <li style={{color: "#707070",listStyleType: "none",fontSize:"11px",marginBottom:"1.4px"}}> - 안드로이드의 경우 구글 플레이, 아이폰의 경우 앱 스토어에서 카카오톡 앱을 설치 한 후,</li>
        <li style={{color: "#707070",listStyleType: "none",fontSize:"11px",marginBottom:"1.4px"}}> - 최초 1회 카드 및 계좌 정보를 등록하셔야 사용 가능합니다.</li>
        <li style={{color: "#707070",listStyleType: "none",fontSize:"11px",marginBottom:"1.4px"}}> - 인터넷 익스플로러의 경우 8 이상에서만 결제 가능합니다.</li>
        <li style={{color: "#707070",listStyleType: "none",fontSize:"11px",marginBottom:"1.4px"}}> - BC카드 중 신한, 하나, 국민카드는 결제가 불가능합니다.</li>
    </div>
);
});

function OrderForm(){
    
    const navigate = useNavigate();
    const location = useLocation();
    const [datas, setDatas] = useState([]);
    const [totalPrice, setTotalPrice] = useState("");
    useEffect(() => {
        const DB = location.state.obj;
        console.log("불로온거: ", DB);
        setDatas(DB);
        let total = 0;
        for(var i = 0; i < DB.length; i++){
            total += DB[i].proTotalPrice;
        }
        console.log(total);
        setTotalPrice(total);
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery); document.head.removeChild(iamport);
        }
    }, []);
    
    const onClickPayment = () => {
        const buyer = document.getElementsByName("buyer")[0].value;
        const joinAddress = document.getElementsByName("joinAddress")[0].value;
        const joinDetailAddress = document.getElementsByName("joinDetailAddress")[0].value;
        const buyerTel = document.getElementsByName("userTel")[0].value;
        if(buyer == "" || joinAddress == "" || 
            joinDetailAddress == "" || buyerTel == ""){
                alert("주문 정보를 입력해주세요.");
                return;
        }

        const recipient = document.getElementsByName("recipient")[0].value;
        const recipAddress = document.getElementsByName("recipAddress")[0].value;
        const recipDetailAddress = document.getElementsByName("recipDetailAddress")[0].value;
        const recipientTel = document.getElementsByName("recipientTel")[0].value;
        if(recipient == "" || recipAddress == "" || 
            recipDetailAddress == "" || recipientTel == ""){
                alert("배송 정보를 입력해주세요.");
                return;
        }
        const totalCost = totalPrice;
        const totalPrice2 = document.getElementById("totalPrice").innerHTML;

        const proName = document.getElementById("totalPrice");
        const proColorSize = document.getElementById("proColorSize");
        const proQuan = document.getElementById("proQuan");
        const pro_ID = [];
        for(var i = 0; i < datas.length; i++){
            const obj1 = {};
            obj1.proName = datas[i].proName;
            const colorSizeAmount = [];
            for(var j = 0; j < datas[i].product.length; j++){
                const obj = {};
                obj.colorSize = datas[i].product[j].colorSize
                obj.amount = datas[i].product[j].proQuan
                colorSizeAmount.push(obj);
            }
            obj1.colorSizeAmount = colorSizeAmount;
            pro_ID.push(obj1);
        }

        const { IMP } = window; 
        IMP.init('imp27761044'); // 가맹점 식별코드 // 결제 데이터 정의
        const data = {
            pg: 'html5_inicis', // PG사 (필수항목)
            pay_method: 'card', // 결제수단 (필수항목)
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            name: 'mieummieum', // 주문명 (필수항목)
            amount: '1', //totalPrice2, // 금액 (필수항목)
            custom_data: { name: '부가정보', desc: '세부 부가정보' },
            buyer_name: buyer, // 구매자 이름
            buyer_tel: buyerTel, // 구매자 전화번호 (필수항목)
            buyer_addr: joinAddress + " " + joinDetailAddress,
            DB : {
                pro_ID,
                buyer_name: buyer, // 구매자 이름
                buyer_tel: buyerTel, // 구매자 전화번호 (필수항목)
                buyer_addr: joinAddress + " " + joinDetailAddress,
                recipient, // 받는 사람 이름
                recipAddress: recipAddress + " " + recipDetailAddress, // 받는사람 주소
                recipientTel: recipientTel,
                payPrice: {
                    cost: totalPrice,
                    payAmount: totalPrice,
                }
            },
            buyer_email: 'l4279625@gmail.com', // 구매자 이메일
            buyer_postalcode: '05258'
        };
        IMP.request_pay(data, callback);
    }
    
    const callback = async (response) => {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status,
            amount, cost, DB,
            buyer_name, buyer_tel, buyer_addr, recipient, recipAddress, recipientTel} = response;
        if (success) {
            const db = {
                userID: sessionStorage.getItem('id'),
                DB,
                buyer_name,
                buyer_tel,
                buyer_addr,
                recipient,
                recipAddress,
                recipientTel,
                amount: totalPrice,
                cost
            }
            console.log(db);
            // await axios.post(`http://localhost:4000/order/OrderForm`, db )
            // .then((response) => {
            //     if(response.data == "fail"){
            //         alert("DB Error.");
            //     }else if(response.data == "success"){
            //         var basket = window.confirm("장바구니로 이동하시겠습니까?");
            //         if(basket){
            //             window.location.href = "/order/basket";
            //         }
            //     }
            // }); 
            alert('주문이 완료되었습니다');
        } else {
            alert(`결제 실패 : ${error_msg}`);
        }
    }
    
    //주소 api 변수 및 핸들러들
    const [enroll_company, setEnroll_company] = useState({
        address: '',
    });
    const [popup, setPopup] = useState(false);
    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }
    const handleComplete = (data) => {
        setPopup(!popup);
    }


    //버튼 클릭시 보여주고 가리는 기능
    const [showing, setShowing] = useState(false);
    const [showing2, setShowing2] = useState(false);

    //무통장입금,카카오페이 텍스트변환
    const [switchtext, setswitchtext] = useState();


    const toggleShowing = () => {
        if(showing2 === true){
            setShowing2(prevShowing2 => !prevShowing2);
        }
        if(showing === false){
            setShowing(prevShowing => !prevShowing); //setshowing을 true로
            setswitchtext("무통장입금 ");
        }
    }

    const toggleShowing2 = () => {
        if(showing === true){
            setShowing(prevShowing => !prevShowing);
        }
        if(showing2 === false){
            setShowing2(prevShowing2 => !prevShowing2);
            setswitchtext("카카오페이 ");
        }
    }

    return(
        <Container>
            <Contents>
                <Path>현재위치 -- 현재위치</Path>
                <Title>
                    <Titletext>ORDER</Titletext>
                </Title>
                <ControlInfo><ControlInfocontents>상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.</ControlInfocontents></ControlInfo>
                <OrderArea>
                <OrderAreaTitle><OrderAreaTitleContents>국내배송상품 주문내역</OrderAreaTitleContents><BeforeButton onClick={() => navigate(-1)}>이전페이지</BeforeButton></OrderAreaTitle>
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
                        </tr>
                    </thead>
                    <tfoot style={{textalign: "right"}}>
                        <tr style={{    display: "table-row", verticalalign: "inherit", bordercolor: "inherit", verticalalign:"middle"}}>
                            <InfoTd colSpan={8}>
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
                    {
                        datas.map(data => {
                            return(
                                <tbody style={{textalign: "center"}}>
                                    <tr style={{    display: "table-row", verticalalign: "inherit", bordercolor: "inherit", border:"1"}}>
                                        <InfoTd2><Forimg src="//www.fromdayone.co.kr/web/product/tiny/202112/4b1c9e539d03ec2c7c5d537b1126b100.webp"></Forimg></InfoTd2>
                                        <InfoTd2 style={{paddingLeft: "10px",bordercolor: "#ebebeb",borderRight:"1px solid #ebebeb"}}>
                                        <Tdcontentstext id={"proName"} style={{fontWeight:"bold"}}>{data.proName}</Tdcontentstext><br></br>
                                        <Tdcontentstext id={"proColorSize"} style={{margin: "9px 0 0", color: "#707070", lineheight: "16px"}}>{data.colorSize}</Tdcontentstext>
                                        </InfoTd2>
                                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",textAlign:"right"}}>
                                            <Tdcontentstext style={{fontWeight:"bold"}}>{data.proTotalPrice/data.proQuan}</Tdcontentstext>
                                            <Tdcontentstext style={{fontWeight:"bold"}}>원</Tdcontentstext>
                                        </InfoTd2>
                                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",
                                            paddingLeft: 0, paddingRight: 0,textAlign:"center"}}>
                                            <Tdcontentstext id={"proQuan"} style={{fontWeight:"bold"}}>{data.proQuan}</Tdcontentstext>
                                        </InfoTd2>
                                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext>-</Tdcontentstext></InfoTd2>
                                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext>기본배송</Tdcontentstext></InfoTd2>
                                        <InfoTd2 style={{paddingright: "10px",borderRight:"1px solid #ebebeb",paddingLeft: 0, paddingRight: 0,textAlign:"center"}}><Tdcontentstext>조건</Tdcontentstext></InfoTd2>
                                        <InfoTd2 style={{paddingright: "10px",paddingLeft: 0, paddingRight: "10ox",textAlign:"right"}}><Tdcontentstext style={{fontWeight:"bold"}}>{data.proTotalPrice}</Tdcontentstext><Tdcontentstext style={{fontWeight:"bold"}}>원</Tdcontentstext></InfoTd2>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                    
                </InfoTable>
                <DuplicateDiv>
                <BeforeButton onClick={() => navigate(-1)}>이전페이지</BeforeButton>
                </DuplicateDiv>
                <OrderFormArea>
                <OrderFormAreaTitle><OrderAreaTitleContents>주문정보</OrderAreaTitleContents></OrderFormAreaTitle>
                <OrderFormArea>
                <OrderTable>
                    <colgroup>
                        <col style={{width : "139px"}}></col>
                        <col style={{width : "auto"}}></col>
                    </colgroup>
                    <tbody>
                    <tr>
                        <Tableth>주문하시는 분</Tableth>
                        <Tabletd>
                            <OrderInput style={{width : "180px"}}
                                name="buyer"></OrderInput>
                        </Tabletd>
                    </tr>
                    <tr>
                        <Tableth>주소</Tableth>
                        <Tabletd>
                            <OrderInput className="user_enroll_text" type="text" 
                                id="joinrTel" name="joinAddress" minlength="11" maxlength="11" onChange={handleInput} value={enroll_company.address} style={{ width: "280px"}}></OrderInput>
                            <AdressButton type="button" onClick={handleComplete}>주소검색</AdressButton><br></br>
                            <OrderInput className="user_enroll_text" type="text" 
                                id="joinrTel" name="joinDetailAddress" minlength="11" maxlength="30"  style={{ width: "280px"}} ></OrderInput> 상세주소
                            {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post >}
                        </Tabletd>
                    </tr>
                    <tr>
                        <Tableth>전화번호</Tableth>
                        <Tabletd>
                            <OrderInput style={{width : "180px"}}
                                name="userTel"></OrderInput>
                        </Tabletd>
                    </tr>
                    </tbody>
                </OrderTable>
                </OrderFormArea>
                <OrderFormAreaTitle><OrderAreaTitleContents>배송 정보</OrderAreaTitleContents></OrderFormAreaTitle>
                <OrderFormArea>
                <OrderTable>
                    <colgroup>
                        <col style={{width : "139px"}}></col>
                        <col style={{width : "auto"}}></col>
                    </colgroup>
                    <tbody>
                    <tr>
                        <Tableth >받으시는 분</Tableth>
                        <Tabletd>
                            <OrderInput style={{width : "180px"}}
                                name="recipient"></OrderInput>
                        </Tabletd>
                    </tr>
                    <tr>
                        <Tableth>주소</Tableth>
                        <Tabletd>
                            <OrderInput className="user_enroll_text" type="text" 
                                id="joinrTel2" name="recipAddress" minlength="11" maxlength="11" onChange={handleInput} value={enroll_company.address} style={{ width: "280px"}}></OrderInput>
                            <AdressButton type="button" onClick={handleComplete}>주소검색</AdressButton><br></br>
                            <OrderInput className="user_enroll_text" type="text" id="joinrTel2" name="recipDetailAddress" minlength="11" maxlength="30"  style={{ width: "280px"}} ></OrderInput> 상세주소
                            {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post >}
                        </Tabletd>
                    </tr>
                    <tr>
                        <Tableth>전화번호</Tableth>
                        <Tabletd><OrderInput style={{width : "180px"}}
                            name="recipientTel"></OrderInput></Tabletd>
                    </tr>
                    </tbody>
                </OrderTable>
                </OrderFormArea>
                </OrderFormArea>
                <OrderFormAreaTitle style={{ margin: "70px 0 10px 10px"}}><OrderAreaTitleContents>결제 예정 금액</OrderAreaTitleContents></OrderFormAreaTitle>
                <Howmuchtable>
                    <colgroup>
                        <col style={{width: " 33.33%"}}/>
                        <col style={{width: " 33.33%"}}/>
                        <col style={{width: " 33.33%"}}/>
                    </colgroup>
                    <thead style={{ display: "table-header-group", verticalAlign: "middle", borderColor: "inherit",height:"80px"}}>
                        <tr>
                            <Howmuchth1>총 주문 금액</Howmuchth1>
                            <Howmuchth1>총 할인</Howmuchth1>
                            <Howmuchth1>총 결제예정 금액</Howmuchth1>
                        </tr>
                    </thead>
                    <tbody style={{textAlign: "center",height:"80px", display: "tablerowgroup", verticalAlign: "middle", borderColor: "inherit"}}>
                        <tr>
                            <Howmuchtd>{totalPrice}<HowmuchtdText>원</HowmuchtdText></Howmuchtd>
                            <Howmuchtd>0<HowmuchtdText>원</HowmuchtdText></Howmuchtd>
                            <Howmuchtd>{totalPrice}<HowmuchtdText>원</HowmuchtdText></Howmuchtd>
                        </tr>
                    </tbody>
                </Howmuchtable>
                </OrderArea>
                <OrderFormAreaTitle style={{ margin: "70px 0 10px 10px"}}><OrderAreaTitleContents>결제 수단</OrderAreaTitleContents></OrderFormAreaTitle>
                <PayArea><FlexArea>
                <SelectPay>
                    <input type={'radio'} name = "selectpay" style={{ width: "13px", height: "13px", border: "0", verticalAlign:"middle",value:"cash"}}  onChange={toggleShowing}></input><label style={{verticalAlign:"middle", margin : "0 15px 5px 0"}}>무통장 입금</label>
                    <input type={'radio'} name = "selectpay" style={{ width: "13px", height: "13px", border: "0", verticalAlign:"middle",value:"kakao"}}  onChange={toggleShowing2}></input><label style={{verticalAlign:"middle", margin : "0 15px 5px 0"}}>카카오 페이</label>
                </SelectPay>
                {/* {showing === true ? <Createtable>Createtable</Createtable> : null }
                {showing2 === true ? <Createtable2>Createtable2</Createtable2> : null } */}
                </FlexArea>
                <FinalCheck>
                <FinalCheckh4>{switchtext}<HowmuchtdText style={{fontWeight:"normal",fontSize:"12px"}}>최종결제 금액</HowmuchtdText></FinalCheckh4>
                <FinalCheckp>
                    <HowmuchtdText style={{fontWeight:"bold",fontSize:"28px"}}
                    id="totalPrice">{totalPrice}</HowmuchtdText>원</FinalCheckp>
                <FinalCheckp style={{fontWeight:"normal",fontSize:"12px"}}> <input name='check' type={'checkbox'} style={{verticalAlign:"middle"}}></input>결제정보를 확인하였으며, 구매진행에 동의합니다.</FinalCheckp>
                <ForpayButton><PayButton onClick={() => onClickPayment()}>결제하기</PayButton></ForpayButton>
                </FinalCheck>
                </PayArea>
                
                <p style={{color:"white"}}>"절 찾으셨군요!"</p>

                <InfoDiv>
                <InfoDivTitle>이용안내</InfoDivTitle>
                <InfoDivContents>
                <InfoDivh4>현금영수증 이용안내</InfoDivh4>
                <InfoDivol>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 현금영수증은 1원 이상의 현금성거래(무통장입금, 실시간계좌이체, 에스크로, 예치금)에 대해 발행이 됩니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 현금영수증 발행 금액에는 배송비는 포함되고, 적립금사용액은 포함되지 않습니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 발행신청 기간제한 현금영수증은 입금확인일로 부터 48시간안에 발행을 해야 합니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 현금영수증 발행 취소의 경우는 시간 제한이 없습니다. (국세청의 정책에 따라 변경 될 수 있습니다.</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 현금영수증이나 세금계산서 중 하나만 발행 가능 합니다.</li>
                </InfoDivol>
                <InfoDivh4>부가가치세법 변경에 따른 신용카드매출전표 및 세금계산서 변경안내</InfoDivh4>
                <InfoDivol>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 변경된 부가가치세법에 의거, 2004.7.1 이후 신용카드로 결제하신 주문에 대해서는 세금계산서 발행이 불가하며</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 신용카드매출전표로 부가가치세 신고를 하셔야 합니다.(부가가치세법 시행령 57조)</li>
                <li style={{color: "#707070",listStyleType: "none",fontSize:"11px"}}> - 상기 부가가치세법 변경내용에 따라 신용카드 이외의 결제건에 대해서만 세금계산서 발행이 가능함을 양지하여 주시기 바랍니다.</li>
                </InfoDivol>
                </InfoDivContents>
                </InfoDiv>
            

            
            </Contents>
            
        </Container>
    );
}
export default OrderForm;




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

let ControlInfo = styled.ul` //안내 바
    padding: 10px 0 8px 10px;
    border-top: 1px solid #ebebeb;
    color: #f76560;
    font-size: 11px;
    line-height: 1.5;
    background: #fff8f5;
` 
let ControlInfocontents = styled.li` //내용
    color: #9d9d9d;
    margin: 2px 9px;
    padding: 0 0 0 23px;
    background: url(//img.echosting.cafe24.com/skin/base/common/ico_info.gif) no-repeat 0 1px;
    line-height: 1.4;
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

let DuplicateDiv = styled.div ` // 공간 나누기 div
    padding: 10px 0 85px;
    border-bottom: 1px solid #ebebeb;
    text-align: center;
    margin: 0;
    display: block;
`

let OrderFormArea = styled.div `  //주문자 정보 div
    margin: 0;
    padding: 0;
`

let OrderFormAreaTitle = styled.div`
    margin: 30px 0 10px 10px;
    padding: 0;
    display: block;
`

let OrderTable = styled.table`
    display: table;
    box-sizing: border-box;
    text-indent: initial;
    border: 0;
    border-top: 1px solid #ebebeb;
    position: relative;
    margin: 10px 0 0;
    color: #fff;
    line-height: 1.5;
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
`

let Tableth = styled.th` //입력테이블 th스타일
    padding: 20px 0 20px 18px;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    text-align: left;
    font-size: 11px;
    font-weight: normal;
`

let Tabletd = styled.td` //입력테이블 td스타일
    margin: 0;
    color: #707070;
    font-size: 11px;
    border: 0;
    padding: 15px 0px 14px;
    border-bottom: 1px solid #ebebeb;
    vertical-align: middle;
    word-break: break-all;
    word-wrap: break-word;
`

let OrderInput = styled.input`  //입력테이블 인풋스타일
    height: 26px;
    line-height: 26px;
    padding: 0px 4px;
    border: 1px solid #ebebeb;
    color: #666666;
    font-size: 11px;
    margin: 5px 0 0;
    &:hover{  
    border: 1px solid #CCCCCC;
    cursor : text;
    }
    &:focus{  
    outline: 0 solid #CCCCCC;
    cursor : text;
    }
`

let AdressButton = styled.button` //주소검색버튼
    font-size: 11px;
    line-height: 11px;
    height: 26px;
    display: inline-block;
    padding: 7px 8px;
    border: 1px solid #ebebeb;
    border-radius: 0px;
    background: #fff;
    margin-left: 2px;
    &:hover{  
    text-decoration: none;
    color: #ccc;
    border-color: #ccc !important;
    cursor: pointer;
    }
`

let Howmuchtable = styled.table` //결제예정금액테이블
    width: 100%;
    border: 0;
    border-spacing: 0;
    border-collapse: collapse;
    z-index: 2;
    border-color: #ebebeb;
    border-top: 1px solid #ebebeb;
    position: relative;
    margin: 10px 0 0;
    color: #fff;
    line-height: 1.5;
`

let Howmuchth1 = styled.th` //결제예정테이블 th1
    height: 39px;
    border: 0;
    background: #fbfafa;
    border-left: 0;
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    font-weight: bold;
    font-size: 11px;
    letter-spacing: 0.5px;
`

let Howmuchtd = styled.td ` //결제예정테이블 td
    height: 58px;
    border: 0;
    border-color: #ebebeb;
    padding: 15px 10px 14px;
    padding-left: 0;
    padding-right: 0;
    border-left: 0;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    word-break: break-all;
    word-wrap: break-word;
    font-size: 23px;
    letter-spacing: -1px;
    font-weight: bold;
    word-break: normal;
`

let HowmuchtdText = styled.text ` //결제예정테이블 td 텍스트스타일
    font-size: 23px;
    letter-spacing: -1px;
    font-weight: bold;
    word-break: normal;
    color: #757575;
`

let PayArea = styled.div`   //결제방법 선택 div
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    border: 1px solid #ebebeb;
    color: #353535;
    line-height: 1.5;
    float: left;
    width: 100%;
`
let FlexArea = styled.div` //플렉스 적용해서 밑으로 나눠줄 div

    display: flex;
    flex-direction: column;
    width: 85%;
`



let SelectPay = styled.div ` //결제방법 진짜 선택 div
    padding: 17px 20px 15px;
    font-weight: bold;
    border-bottom: 3px double #ebebeb;
    color: #353535;
    line-height: 1.5;
    font-size: 11px;
    vertical-align: middle;
`







let FinalCheck = styled.div` //결제금액확인박스
    position: relative;
    float: right;
    width: 240px;
    margin-top: -2px;
    text-align: right;
    background: #fbfafa;
    border-top: 3px double #ebebeb;
`

let FinalCheckh4 = styled.h4` //확인박스 h4
    margin: 17px 10px 0 0;
    color: #353535;
    font-size: 12px;
    font-weight: bold;
`

let FinalCheckp = styled.p ` //확인박스  p
    margin: 20px 10px 0 0;
    color: #5a5a5a;
    font-size: 14px;
    text-align: right;
    line-height: 1.5;
`

let ForpayButton = styled.div` //결제하기버튼 넣을 div
    margin: 16px 0 10px;
    text-align: center;
    padding: 0;
`

let PayButton = styled.button` //결제하기버튼
    background: #333 !important;
    color: #fff !important;
    border: 1px solid #333 !important;
    font-size: 13px;
    line-height: 13px;
    display: inline-block;
    padding: 20px 80px;
    border-radius: 0px;
    margin: 1px 0 0;
    vertical-align: middle;
    -webkit-padding-before: 23px;
    -webkit-padding-after: 23px;
    &:hover{  
    background: #fff !important;
    color: #8f8f8f !important;
    border-color: #8f8f8f !important;
    cursor: pointer;
    }
`

let InfoDiv = styled.div` //이용안내 div
    margin: 0;
    margin-top: 50px;
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
    margin-top: 0px;
    display: block;
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