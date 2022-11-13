import { useEffect, useState } from "react";
import React, { Component } from "react";
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { useParams, useNavigate } from "react-router-dom" // 1. useParams 라는 기능을 임포트한다.
import axios from "axios";
import PostComponent from '../../components/PostComponent';

//메인 상품 디테일==========================
function Product() {

    const [datas, setDatas] = useState({}); // 해당 상품 객체를 집어넣는다.

    //선택한 사이즈
    const [selectSize, setSelectSize] = useState("사이즈를 선택해주세요"); //사이즈 버튼 클릭시 최신화된다.
    const [selectColor, setSelectColor] = useState(""); //사이즈와 색상이 선택되면 넘겨줄 객체가 들어간다.
    //list로 객체들을 전부 상세로 보여줘도 좋지만 한 페이지에서 한 상품만 구매할 수 있게 만드는것도 방법이다.
    const [proTitle, setProTitle] = useState("");   // 상품명
    const [proPrice, setProPrice] = useState("");  //가격
    const [buyPrice, setBuyPrice] = useState(""); //구매가격이랑 proPrice랑 곱해서 buyprice에 넣는다 맨 밑에서 사용
    const [buyTotal, setBuyTotal] = useState("");
    const [objList, setObjList] = useState([]); //리스트 집어넣는곳

    //사이즈 버튼 클릭시 size값을 클릭한것으로 바꿔주기
    const handleSelect = (e) => {
        console.log("select size : " + e);
        return setSelectSize(e)
    }
    const data = useNavigate();
    //원하는 객체를 받아와서 사용  
    const onClickBuy = async () => {
        //obj.proOptionObjTmp.detailAmount = num;
        //console.log(obj);
        if (sessionStorage.getItem('id') === null) {
            window.location.href = "/member/login";
        }
        // 일단 한가지 상품만
        console.log(objList);
        if (objList.length == 0) {
            alert("상품을 선택해주세요.");
            return;
        }
        const cart = {
            product: [],
        };
        cart.userID = sessionStorage.getItem('id');
        cart.proName = objList[0].proName;
        for (var i = 0; i < objList.length; i++) {
            const obj = {};
            obj.proSize = objList[i].proSize;
            obj.proColor = objList[i].proColor;
            obj.proAmount = objList[i].buyCount;
            cart.product.push(obj);
        }
        // cart.product = {};
        // cart.product.proName = obj.detailTitle;
        // cart.product.detailSize = obj.proOptionObjTmp.detailSize;
        // cart.product.color = obj.proOptionObjTmp.detailColor;
        // cart.product.quan = num;
        console.log("cartObj:  ", cart)
        await axios.post(`http://localhost:4000/product/${objList[0].proId}`, cart)
            .then((response) => {
                if (response.data == "fail") {
                    alert("DB Error.");
                } else if (response.data == "success") {
                    var basket = window.confirm("장바구니로 이동하시겠습니까?");
                    if (basket) {
                        window.location.href = "/order/basket";
                    }
                }
            });
        // data('/order/basket', { state: {obj} });
    }

    // 묶어서 객체화 하기 → 리스트에 순차적으러 집어 넣어 (상품명, 상품id, 사이즈, 색상, 상품 갯수, 상품 가격)
    const handleDetail = (proName, proId, proColor, proSize, proAmount, buyCount) => {

        setBuyTotal(Number(buyTotal) + 1);
        setBuyPrice(buyPrice + Number(proPrice))
        //선택 사이즈 선택 색상
        console.log("select color : " + proName);
        console.log("select proId : " + proId);
        console.log("select proColor : " + proColor);
        console.log("select proSize : " + proSize);
        console.log("select proAmount : " + proAmount);
        console.log("select buyCount : " + buyCount);

        var objecting = { proName, proId, proColor, proSize, proAmount, buyCount };

        let temp = objList;

        if (objList.length === 0) {
            temp.push(objecting);
            setObjList(temp);
            console.log(objList);
            return setSelectSize("");

        } else {
            for (var i = 0; i < objList.length; i++) {
                if (objList[i].proColor === objecting.proColor && objList[i].proSize === objecting.proSize) {
                    alert("중복된 값이 있습니다.");
                    return setSelectSize("");
                }
            }
            temp.push(objecting);
            setObjList(temp);
            console.log(objList);
            return setSelectSize("");
        }
    }


    //수량 변화시 함수 실행
    const changeNumber = (e, size, color) => {

        if (e.value > 100) {
            return alert("100보다 작은 수를 고르세요...");
        }
        if (e.value < 0) {
            return alert("0보다 큰 수를 고르세요...");
        }
        //사이즈와 컬러가 맞는 객체에 최신화해준다.
        for (var i = 0; i < objList.length; i++) {
            if (objList[i].proSize == size && objList[i].proColor == color) {
                objList[i].buyCount = e.value;
            }
        }

        //숫자가 변할때마다 전체 불러와서 총합 state 최신화
        var temp = 0;
        for (var i = 0; i < objList.length; i++) {
            temp = Number(temp) + Number(objList[i].buyCount);

        }
        setBuyTotal(temp)
        var tmp = proPrice * buyTotal
        setBuyPrice(tmp);


    }



    //db연결하고 상품 테이블 가지고와 products에 저장하고 지역 state에 setDatas 해준다.
    const getData = async (param) => {
        try {
            const obj = {};
            obj.id = param;
            // console.log("url: ", param)
            await axios.post(`http://localhost:4000/product/${param}`, obj)
                .then((response) => {
                    if (response.data == "fail") {
                        alert("해당 상품은 존재하지 않습니다.");
                        return;
                    } else {
                        const data = response.data;
                        setDatas(data);
                        setProTitle(data.proName);
                        setProPrice(data.proPrice.price)
                        console.log("db로부터 받아온 데이터: ", data, "   이름: ", data.proName);
                    }
                });


        } catch (err) {
            console.log('DB연결하고 데이터 가져오는데 에러발생...');
        }
    };


    useEffect(() => {
        getData(param);
    }, []);//처음 한번만 실행 없으면 계속실행함

    // console.log( "product페이지에서 받은 url 데이터는 "+useParams().id); //id값을 받아왔다.
    const param = useParams().id;

    return (
        <Contents>
            <Lilpath>
                페이지 - 페이지
            </Lilpath>
            <ProductDetail>
                <ImgArea>
                    <Imgcontent>
                        {
                            datas.proName != null
                                ? <img style={{ maxWidth: "100" }} src={"/" + datas.proImg[0]} />
                                : null
                        }
                    </Imgcontent>
                </ImgArea>
                <Info>
                    {/* 파라미터로 상품이름 가지고오기 */}
                    {
                        datas.proName != null
                            ? <InfoTitle>{datas.proName}</InfoTitle>
                            : null
                    }

                    <table>
                        <tr>
                            <InfoDetailth>
                                <th style={{ fontWeight: "normal" }}>
                                    판매가
                                </th>
                            </InfoDetailth>


                            {
                                datas.proName != null
                                    ? <td style={{ padding: "8px 0", verticalAlign: "middle", textalign: "left", fontSize: "12px" }}>
                                        {datas.proPrice.price}
                                    </td>
                                    : null
                            }

                        </tr>
                        <tr>
                            <InfoDetailth>
                                <th style={{ color: "#B80000" }}>
                                    할인 판매가
                                </th>
                            </InfoDetailth>
                            {
                                datas.proName != null
                                    ? <td style={{ padding: "8px 0", verticalAlign: "middle", textalign: "left", fontSize: "12px", color: "#B80000" }}>
                                        {datas.proPrice.profit}
                                    </td>
                                    : null
                            }


                        </tr>
                        <tr>
                            <InfoDetailth>
                                <th style={{ fontWeight: "normal" }}>
                                    코멘트
                                </th>
                            </InfoDetailth>

                            <td style={{ padding: "8px 0", verticalAlign: "middle", textalign: "left", fontSize: "12px" }}>
                                허리골반셔링으로 '골반메이드'핏을 완성하였어요:) 휘뚜루마뚜루 편안함에+여성스러운 라인으로 실루엣을 보정해드리며 군살커버까지 완벽한 핏으로 보여드릴게요♥
                            </td>
                        </tr>

                        {/* 컬러출력 부분 */}

                        <tr>
                            <InfoDetailth>
                                <th style={{ fontWeight: "normal" }}>
                                    size
                                </th>
                            </InfoDetailth>
                            <td style={{ padding: "8px 0", verticalAlign: "middle", textalign: "left", fontSize: "12px", color: "#767479" }}>


                                {/*  상품에 등록된 사이즈 갯수만큼 출력  //버튼 클릭시 value값 가지고 전달하기*/}
                                {
                                    datas.proName != null
                                        ? (
                                            datas.proSize[0].proColor.map(data => {  //색별로 버튼을 만들어야한기때문에 map을 돌린다.
                                                // var tmpSize = data.size //사이즈객체부터 임시 저장 tmpSize

                                                return (<Buttonbutton onClick={(e) => handleSelect(e.target.value)} value={data.size}>{data.size}</Buttonbutton>); //클릭이벤트로 함수 싦행해서 클릭한 sizevalue 넘기기
                                            })
                                        )
                                        : null
                                }

                            </td>
                        </tr>
                        <tr>

                            {/* 사이즈에 따른 컬러( 갯수 1개 이상인것만 표시 */}
                            {selectSize && <>
                                <th></th>
                                {
                                    datas != null
                                        ? (
                                            //옵션 오브젝트에 쉽게 다가가기윈한 변수

                                            datas.proSize != null
                                                ? datas.proSize[0].proColor.map(function (_id, i) {
                                                    console.log()
                                                    if (selectSize === datas.proSize[0].proColor[i].size) { //만약 선택한사이즈와 colorAmountObj[i]값이 같다면
                                                        return (
                                                            <>
                                                                {
                                                                    datas.proSize[0].proColor[i].colorAmout.map(function (_id, j) {
                                                                        var buyCount = 1; //각각의 수량 조정을 위해서
                                                                        return (
                                                                            datas.proSize[0].proColor[i].colorAmout[j].amout == 0
                                                                                ? <Buttonbutton
                                                                                    value={datas.proSize[0].proColor[i].colorAmout[j].color} >
                                                                                    {datas.proSize[0].proColor[i].colorAmout[j].color} ({"품절"})
                                                                                </Buttonbutton>
                                                                                : <Buttonbutton
                                                                                    value={datas.proSize[0].proColor[i].colorAmout[j].color}
                                                                                    onClick={(e) => handleDetail(proTitle, param, e.target.value, datas.proSize[0].proColor[i].size, datas.proSize[0].proColor[i].colorAmout[j].amout, buyCount)} >
                                                                                    {datas.proSize[0].proColor[i].colorAmout[j].color} ({datas.proSize[0].proColor[i].colorAmout[j].amout})
                                                                                </Buttonbutton>
                                                                        )
                                                                    }
                                                                    )
                                                                }
                                                            </>
                                                        );
                                                    }
                                                })
                                                : null

                                        )
                                        : null
                                }
                            </>
                            }
                        </tr>
                    </table>

                    {/* 컬러 선택시 선택 옵션 창 뜨기 리스트에있는 맵 돌려*/}

                    {objList &&
                        objList.slice(0).reverse().map((_id, i) => {
                            return (<>
                                <hr />
                                <SelectTable>
                                    <SelectTr >
                                        <OptionTd >
                                            [{proTitle}]<br></br>
                                            <div> - 사이즈 :<strong>{objList[i].proSize}</strong></div>
                                            <div> - 색상 : <strong>{objList[i].proColor}</strong></div>
                                        </OptionTd>
                                        <CountTd>
                                            <CountSpan >
                                                <CountInput type="number" defaultValue={1} name={"buyCount"} min={1} max={100} onChange={(e) => changeNumber(e.currentTarget, objList[i].proSize, objList[i].proColor)}
                                                ></CountInput>
                                                {/* <img src='/assets/btn_count_up.gif' onClick={increase} style={{position:"absolute",left:"28px",top:"-1px",lineHeight:"18px",verticalAlign:"middle"}}/>
                                                <img src='/assets/btn_count_down.gif' onClick={decrease} style={{position:"absolute",left:"28px",bottom:"0",top:"auto"}}/> */}
                                                개</CountSpan>
                                        </CountTd>
                                        <SelectPrice>
                                        </SelectPrice>
                                    </SelectTr>

                                </SelectTable>
                            </>
                            )
                        })
                    }





                    {/* //총 갯수 표시 */}
                    <Totalprice>
                        TOTAL : {buyTotal}개<br />
                        가격 : {buyTotal * proPrice}원
                    </Totalprice>
                    <Actionarea>
                        <Actionarea2>

                            {/* db에 상품명, 판매가, 사이즈, 컬러, 수량 (누가샀는지 session에 존재) 보내줘  결제창으로*/}
                            <Buynow>
                                BUY IT NOW
                            </Buynow>
                            <div style={{ display: "flex", flexdirection: "column" }}>
                                <Buynow2 onClick={(e) => onClickBuy()}>
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
            <PostComponent proId={param}></PostComponent>
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
    width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
    text-align: center;
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
const Buynow = styled.button`//buy it now 버튼
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
const Buynow2 = styled.button`//buy it now 밑에 버튼1
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
const Buynow3 = styled.button`//buy it now 밑에 버튼2
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

    div {
        color: gray;
        font-size: 12px;


        strong{
            font-size: 14px;
            /* color: black; */
        }
    }

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
    width: 50px;
    padding: 0 2px 0 3px;
    border: 1px solid #d4d8d9;
    border-radius: 3px 0 0 3px;

`
const SelectPrice = styled.td`
    text-align: right; padding: 6.5px 0; vertical-align: middle; font-weight: bold; line-height: 18px; font-size: 12px;
`