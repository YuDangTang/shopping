import React from 'react';
import axios from 'axios';

function Login() {
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
                else {
                    alert("아이디 혹은 비밀번호를 확인해 주세요");
                    e.target.loginId.value = "";
                    e.target.loginPw.value = "";
                    e.target.loginId.focus();
                }
            });
    };

    return (
        <><form onSubmit={onSubmitHandler}>
            아이디 < input tyepe="text" id="inputId" name="loginId" maxLength="12" /><br />
            비밀번호 < input type="password" id="inputPw" name="loginPw" maxLength="12" /><br />
            <button type="submit">로그인</button>
        </form></>
    );
}

export default Login;
