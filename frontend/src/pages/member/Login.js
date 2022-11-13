import React from 'react';
import axios from 'axios';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

   

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const loginId = e.target.loginId.value;
        const loginPw = e.target.loginPw.value;
        await axios.post('http://localhost:4000/member/login', { loginId, loginPw })
            .then((response) => {
                if (response.data === "sucess") {
                    alert("로그인 성공");
                    sessionStorage.setItem('id', loginId);
                    window.location.href = "/";
                }
                else if (response.data === "admin") {
                    alert("관리자 로그인 성공");
                    sessionStorage.setItem('id', loginId);
                    window.location.href = "/admin";
                }
                else {
                    alert("아이디 혹은 비밀번호를 확인해 주세요");
                    e.target.loginId.value = "";
                    e.target.loginPw.value = "";
                    e.target.loginId.focus();
                }
            });
    };





 //DB에 삽입
 const GoGoGo = () => {  
    window.location.href = '/member/join';
    };

    
    return (

        
        <Sideduplicate>
        <Backbutton onClick={() => navigate(-1)}>뒤로가기</Backbutton>
        <Titlediv>
            mieummieum
        </Titlediv>
        <hr></hr>
        <Loginbox>
        <><form onSubmit={onSubmitHandler}>
            <Inputbox>
            <Inputttt type="text" id="inputId" name="loginId" maxLength="12" placeholder='아이디'></Inputttt>
            <Inputttt2 type="password" id="inputPw" name="loginPw" maxLength="12" placeholder='비밀번호'></Inputttt2>
            </Inputbox>
            <Duplidupli></Duplidupli>
            <Loginbutton type="submit">로그인</Loginbutton>
            <Gojoindiv></Gojoindiv>
            <Gojoin onClick={GoGoGo}>가입하기</Gojoin>
        </form></>
        </Loginbox>
        </Sideduplicate>
       
    );
}

export default Login;




let Sideduplicate = styled.div`  //양옆에 비우기
    margin: 0 auto;
    width: 600px;
    padding: 0 70px;
`
let Titlediv = styled.div `
    padding-top: 35px;
    padding-bottom: 35px;
    text-align: center;
    font-size: 60px;
    width: 100%;
    height: auto;
`

let Loginbox = styled.div ` //로긴 박스
    position: relative;
    width: 100%;
    padding: 36px 0;
    border-top: 0px solid #f5f5f5;
`

let Inputbox = styled.div `  //로그인박스2
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    overflow: hidden;
`

let Inputttt = styled.input.attrs({ maxLength: "16" })` //아이디박스
    padding: 0 15px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: none;
    font-size: 14px;
    color: #000;
    box-sizing: border-box;
    border-bottom: 1px solid #e1e1e1;
`
let Inputttt2 = styled.input.attrs({ maxLength: "16" })`  //비번박스
    padding: 0 15px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: none;
    font-size: 14px;
    color: #000;
    box-sizing: border-box;
`
let Duplidupli = styled.div `
    margin: 15px 0;
`

let Loginbutton = styled.button ` //로그인 버튼
    background: #31363d;
    font-size: 15px;
    color: #fff;
    padding: 0;
    display: inline-block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    border: 1px;
    border-radius: 5px;
    box-sizing: border-box;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
`

let Backbutton = styled.button ` //뒤로가기 버튼
    display: inline-block;
    margin: 40px 0 12px;
    padding-left: 10px;
    width: 90px;
    height: 30px;
    line-height: 28px;
    background: url(//storage.keepgrow.com/admin/campaign/20200611023439767.png) no-repeat 10px;
    background-size: auto 12px;
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 30px;
    font-size: 13px;
    text-align: center;
    color: #222;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    &:hover{  
    text-decoration: none;
    color: #ccc;
    border-color: #ccc !important;
    cursor: pointer;
    }
`

let Gojoindiv = styled.div ` //회원가입 디브
    display: block;
    float: inherit;
    margin: 24px 0 0;
    width: 100%;
    font-size: 0;
    border: none;
`

let Gojoin = styled.a `
    margin-left: 12px;
    padding-left: 12px;
    border-left: none;
    font-size: 12px;
    font-weight: lighter;
    color: #222;
    float: right;
    cursor: pointer;
`