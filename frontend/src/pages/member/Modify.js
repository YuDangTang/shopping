import React, {  useEffect,useState } from 'react';
import axios from 'axios';
import Post from "../../components/Post";
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { useNavigate } from 'react-router-dom';


function Modify(){
    //유저 정보
    const [userId, setUserId] = useState("");
    const [userPw, setUserpw] = useState("");
    const [userName, setuserName] = useState("");
    const [userTel, setuserTel] = useState("");
    const [userDetailAddress, setuserDetailAddress] = useState("");
    const [userBirth, setBirth] = useState("");
    const [enroll_company, setEnroll_company] = useState({
        address: '',
    });

    //주소 api 변수 및 핸들러들
    const [popup, setPopup] = useState(false);
    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        });
    }
    const handleComplete = (data) => {
        setPopup(!popup);
    }


    useEffect(() => {

        const userkey = sessionStorage.getItem('id');

        axios.post('http://localhost:4000/member/GetInfo', { userkey })
            .then((res) => {

                console.log("내정보수정에 유저정보 받기 : ", res.data.userId);


                setUserId(res.data.userId);
                setUserpw(res.data.userPw);
                setuserName(res.data.userName);
                setuserTel("0" + res.data.userTel);
                setEnroll_company({
                    address: res.data.userAddress
                });
                setuserDetailAddress(res.data.userDetailAddress);
                setBirth(res.data.userBirth);

            })
    }, []);




    //기본적으로 값이 입력되어있기 때문에 해당하는것들만 true 해놓음 
    const [regId, setRegId] = useState(false);
    const [regPw, setRegPw] = useState(false);
    const [regCpw, setPegCpw] = useState(false);
    const [regName, setRegName] = useState(true);
    const [regTel, setRegTel] = useState(true);
    const [regAddress, setRegAddress] = useState(false);
    const [regBirth, setRegBirth] = useState(true);



    const onFinish = (e) => {
        e.preventDefault(); // 기본동작 막기
        if (regPw === false) {
            alert("비밀번호를 확인하세요.")
            return;
        }
        if (regCpw !== regPw) {
            alert("동일한 비밀번호를 입력해주세요.")
            return;
        }
        if (regName === false) {
            alert("이름을 확인하세요.")
            return;
        }
        if (regTel === false) {
            alert("전화번호를 확인하세요.");
            return;
        }
        if (regAddress === false) {
            alert("주소를 확인하세요.");
            return;
        }
        if (regBirth === false) {
            alert("생년월일을 확인하세요.");
            return;
        }

        console.log('유효성검사에서 나온 e:', e);

        onSubmitHandler(e)
    };

    //유효성 검사
    const handleInputPw = (e) => {
        var regExp2 = /^[A-Za-z0-9]{8,16}$/
        setRegPw(regExp2.test(e.target.value));
    };
    const handleInputCPw = (e) => {
        var regExp3 = /^[A-Za-z0-9]{8,16}$/
        setPegCpw(regExp3.test(e.target.value));
    };
    const handleInputName = (e) => {
        var regExp4 = /^(?=.*[a-z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/
        setRegName(regExp4.test(e.target.value));
    };
    const handleInputTel = (e) => {
        var regExp5 = (/^01(?:0|1|[6-9])(?:\d{ 3}|\d{4})\d{4}$/);
        setRegTel(regExp5.test(e.target.value));
    };
    const handleInputAddress = (e) => {
        var regExp6 = /^(?=.*[a-z0-9가-힣])[a-zA-Z0-9가-힣]{11,30}$/
        setRegAddress(regExp6.test(e.target.value));
    };
    const handleInputDetailAddress = (e) => {
        var regExp6 = /^(?=.*[a-z0-9가-힣])[a-zA-Z0-9가-힣\s]{3,20}$/
        setRegAddress(regExp6.test(e.target.value));
    };
    const handleInputBirth = (e) => {
        var regExp7 = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/
        setRegBirth(regExp7.test(e.target.value));
    };


    // id 중복 검사
    const idDuplicateCheck = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const join = document.getElementsByName("joinId");
        const dup = join[0].value;
        await axios.post('http://localhost:4000/member/Join/idDupTest/', dup)
            .then(res => {
                if (res.data === "F") {
                    alert("이미 존재하는 아이디 입니다");
                    join.foucs();
                }
                else {
                    alert("사용 가능한 아이디 입니다");
                    const joinP = document.getElementsByName("joinPw");
                    joinP.focus();
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };

    //DB에 수정
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const joinId = e.target.joinId.value;
        const joinPw = e.target.joinPw.value;
        const joinName = e.target.joinName.value;
        const joinTel = e.target.joinTel.value;
        const joinAddress = e.target.joinAddress.value;
        console.log("나와라 : ", joinAddress);
        const joinDetailAddress = e.target.joinDetailAddress.value;
        const joinBirth = e.target.joinBirth.value;
        console.log("리퀘스트데이타", joinId, joinPw, joinName, joinTel, joinAddress, joinDetailAddress, joinBirth);
        await axios.post('http://localhost:4000/member/Modify', {
            joinId, joinPw, joinName, joinTel, joinAddress, joinDetailAddress, joinBirth
        }).then((res) => {
            console.log("리스폰스데이타 넹 : ", res.data);
            if (res.data === "Success") {
                alert('회원정보 수정에 성공하였습니다');
                window.location.href = '/';
            } else {
                alert("다시한번 확인점");
            }
        })
    };

    return (
        <Container>
            <Contents>
                <Path>현재 위치 -- 현재위치</Path>
                <Title>
                    <Titletext>PROFILE MODIFY</Titletext>
                </Title>
                <Thankyou>
                    <ThankyouDiv>
                        <ThankyouContents>
                            <ThankyouContentsreal>
                                <ThankyouContentsStyle1>저희 쇼핑몰을 이용해 주셔서 감사합니다. <ThankyouBold>{sessionStorage.getItem('id')}</ThankyouBold>님.</ThankyouContentsStyle1>
                            </ThankyouContentsreal>
                        </ThankyouContents>
                    </ThankyouDiv>
                </Thankyou>

                <form onSubmit={onFinish}>
                    <H3>기본정보</H3>
                    <Bigtable>
                        <colgroup>
                            <col style={{ width: "150px" }}></col>
                            <col style={{ width: "auto" }}></col>
                        </colgroup>
                        <tbody style={{ display: "table-row-group", verticalalign: "middle", bordercolor: "inherit" }}>

                            <tr style={{ display: "table-row", verticalalign: "inherit", bordercolor: "inherit" }}>
                                <Tableth>아이디</Tableth>
                                <Tabletd><Inputinput id="joinId" name="joinId" minlength="4" maxlength="12" value={userId}></Inputinput>
                                    (영문, 숫자 4~12 글자)
                                </Tabletd>
                            </tr>

                            <tr style={{ display: "table-row", verticalalign: "inherit", bordercolor: "inherit" }}>
                                <Tableth>비밀번호</Tableth>
                                <Tabletd><Inputinput type="password" id="joinPw" name="joinPw" maxlength={12} onChange={handleInputPw}></Inputinput>
                                    (영문 대소문자/숫자 2가지 이상 조합, 8자~16자)
                                </Tabletd>
                            </tr>

                            <tr style={{ display: "table-row", verticalalign: "inherit", bordercolor: "inherit" }}>
                                <Tableth>비밀번호 확인</Tableth>
                                <Tabletd><Inputinput type="password" id="joinPwChk" name="joinPwChk" maxlength="12" onChange={handleInputCPw}></Inputinput>
                                    (영문 대소문자/숫자 2가지 이상 조합, 8자~16자)
                                </Tabletd>
                            </tr>

                            <tr style={{ display: "table-row", verticalalign: "inherit", bordercolor: "inherit" }}>
                                <Tableth>이름</Tableth>
                                <Tabletd><Inputinput type="text" id="joinName" name="joinName" minlength='2' maxlength={12} defaultValue={userName} onChange={handleInputName}></Inputinput>
                                </Tabletd>
                            </tr>

                            <tr style={{ display: "table-row", verticalalign: "inherit", bordercolor: "inherit" }}>
                                <Tableth>전화번호</Tableth>
                                <Tabletd><Inputinput type="text" id="joinrTel" name="joinTel" minlength="11" maxlength="11" defaultValue={userTel} onChange={handleInputTel}></Inputinput>
                                </Tabletd>
                            </tr>

                            <tr style={{ className: "address_search", display: "table-row", verticalalign: "inherit", bordercolor: "inherit" }}>
                                <Tableth>주소</Tableth>
                                <Tabletd><Inputinput2 className="user_enroll_text" type="text" id="joinAddress" name="joinAddress" minlength="11" maxlength="30" onChange={handleInput} value={enroll_company.address}></Inputinput2>
                                    <InsertButton type="button" onClick={handleComplete}>주소검색</InsertButton><br></br>
                                    <Inputinput2 className="user_enroll_text" type="text" id="joinDetailAddress" name="joinDetailAddress" minlength="3" maxlength="20" defaultValue={userDetailAddress} onChange={handleInputDetailAddress}></Inputinput2> 상세주소
                                    {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post >}
                                </Tabletd>
                            </tr>

                            <tr style={{ display: "table-row", verticalalign: "inherit", bordercolor: "inherit" }}>
                                <Tableth>생일</Tableth>
                                <Tabletd><Inputinput type="text" id="joinBirth" name="joinBirth" defaultValue={userBirth} onChange={handleInputBirth}></Inputinput> ex)19750101
                                </Tabletd>
                            </tr>
                        </tbody>
                    </Bigtable>
                    <Forbutton><InsertButton2 type="submit">회원정보수정</InsertButton2><InsertButton3 href='/'>취소</InsertButton3></Forbutton>
                </form>





            </Contents>
        </Container>
    )
}
export default Modify;


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


let Thankyou = styled.div` //감사합니다 큰div
    margin: 0 0 20px;
    color: #353535;
    padding: 0;
`

let ThankyouDiv = styled.div` //감사합니다 작은div
    border-width: 1px;
    border-color: #ebebeb;
    clear: both;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #ebebeb;
    color: #404040;
`

let ThankyouContents = styled.div` //감사합니다 내용 div
    margin: 0;
    display: table;
    table-layout: fixed;
    padding: 15px 0 15px;
    width: 100%;
    box-sizing: border-box;
`
let ThankyouContentsStyle1 = styled.span` //감사합니다 내용 스타일
    font-size: 11px;
    color: #404040;
`

let ThankyouContentsreal = styled.div` //감사합니다 진짜 내용 div
    margin: 0;
    display: table-cell;
    padding: 0 15px;
    width: auto;
    vertical-align: middle;
    min-height: 70px
`


let ThankyouBold = styled.text`  // 감사합니다 내용 강조 스타일
    font-size: 11px;
    color: #404040;
    font-weight: bold;
`


let Tabletable = styled.table`  //윗테이블 스타일
    width : 100%;
    border-top: 1px solid #ebebeb;
    position: relative;
    margin: 10px 0 0;
    color: #fff;
    line-height: 1.5;
`

let Tableth = styled.th` //윗테이블 th스타일
    padding: 20px 0 20px 18px;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    text-align: left;
    font-size: 11px;
    font-weight: normal;
`

let Tabletd = styled.td` //윗테이블 td스타일
    padding: 15px 0px 14px;
    border-bottom: 1px solid #ebebeb;
    color: #757575;
    vertical-align: middle;
    font-size: 11px;
    word-break: break-all;
    word-wrap: break-word;
`

let H3 = styled.h3`
    padding: 50px 0 10px;
    font-size: 16px;
    color: #2e2e2e;
    font-weight: bold;
`

let Bigtable = styled.table` //밑테이블 기본 스타일
    border-top: 1px solid #ebebeb;
    position: relative;
    margin: 10px 0 0;
    color: #fff;
    line-height: 1.5;
    width: 100%;
    border: 0;
    border-spacing: 0;
    border-collapse: collapse;
`

let Inputinput = styled.input.attrs({ maxLength: "12" })` //인풋텍스트 스타일
    height: 26px;
    line-height: 26px;
    padding: 0px 4px;
    border: 1px solid #ebebeb;
    color: #666666;
    font-size: 11px;
    &:hover{  
    border: 1px solid #CCCCCC;
    cursor : text;
    }
    &:focus{  
    outline: 0 solid #CCCCCC;
    cursor : text;
    }
    
`

let Inputinput2 = styled.input.attrs({ maxLength: "16" })` //인풋텍스트 스타일
    height: 26px;
    line-height: 26px;
    padding: 0px 4px;
    border: 1px solid #ebebeb;
    color: #666666;
    font-size: 11px;
    width: 280px;
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
let InsertButton = styled.button` //버튼1
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

let InsertButton2 = styled.button` //버튼2
    background: #333 !important;
    color: #fff !important;
    border: 1px solid #ebebeb;
    font-size: 13px;
    line-height: 13px;
    display: inline-block;
    padding: 23px 30px 26px;
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
let InsertButton3 = styled.button` //버튼3
    background: white !important;
    border: 1px solid #ebebeb;
    font-size: 13px;
    line-height: 13px;
    display: inline-block;
    padding: 23px 30px 26px;
    border-radius: 0px;
    margin: 1px 3px 0;
    vertical-align: middle;
    -webkit-padding-before: 23px;
    -webkit-padding-after: 23px;
    &:hover{  
    text-decoration: none;
    color: #ccc;
    border-color: #ccc !important;
    cursor: pointer;
    }
`



let Forbutton = styled.div`
    padding: 20px 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;

`