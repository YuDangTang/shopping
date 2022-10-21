import React, { useState } from 'react';
import axios from 'axios';
import Post from "../../components/Post";

function Join() {
    // todo : 세션, 쿠키 관리
    // todo : 유효성 검사
    // const [regId, setRegId] = useState(false);
    // const [regPw, setRegPw] = useState(false);
    // const [regCpw, setPegCpw] = useState(false);
    // const [regName, setRegName] = useState(false);
    // const [regTel, setRegTel] = useState(false);
    // const [regAddress, setRegAddress] = useState(false);
    // const [regBirth, setRegBirth] = useState(false);

    //유저 아이디
    const [userId, setUserId] = useState('');

    // //유효성 검사 및 서버에 요청
    // const onFinish = (values) => {
    //     //아이디
    //     if (regId == false) {
    //         alert('영문, 숫자 조합 4-12자 입력하세요');
    //         console.log('하이');
    //         return;
    //     }
    // }
    //비밀번호
    //     if (regPw == false) {
    //         alert('영문, 숫자 조합 4-12자 입력하세요');
    //         return;
    //     }
    //비밀번호 확인
    //     if (regCpw != regPw) {
    //         alert('비밀번호가 일치하지 않습니다');
    //         return;
    //     }
    //이름
    //     if (regName == false) {
    //         alert('한글 2-12자 입력하세요');
    //         return;
    //     }
    //전화번호
    //     if (regTel == false) {
    //         alert('-없이 숫자만 입력해 주세요');
    //         return;
    //     }
    //생일 일단 보류
    // };

    //유효성 검사
    // const handleInputId = (e) => {
    //     var regExp = (/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-z]{4,12}$/);
    //     setRegId([regExp.test(e.target.value)]);
    //     setUserId(e.target.value);
    //     console.log('아이디 유효성 검사 :: ', regExp.test(e.target.value));
    // };
    // const handleInputPw = (e) => {
    //     var regExp = (/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-z]{4,12}$/);
    //     setRegPw([regExp.test(e.target.value)]);
    // };
    // const handleInputName = (e) => {
    //     var regExp = (/^(?=.*\d)(?=.*[a-zA-Z])[가-힣]{2,12}$/);
    //     setRegName([regExp.test(e.target.value)]);
    // };
    // const handleInputTel = (e) => {
    //     var regExp = (/^01(?:0|1|[6-9])(?:\d{ 3}|\d{4})\d{4}$/);
    //     setRegTel([regExp.test(e.target.value)]);
    // };
    // const handleInputAddress = (e) => {
    //     var regExp = (/^(?=.*\d)(?=.*[a-zA-Z])[가-힣]{15,100}$/);
    //     setRegAddress([regExp.test(e.target.value)]);
    // };
    // const handleInputBirth = (e) => {
    //     var regExp = (/^(?=.*\d)(?=.*[a-zA-Z])[가-힣]{8,8}$/);
    //     setRegBirth([regExp.test(e.target.value)]);
    // };

    // const idDuplicateCheck = () => {
    //     if (!regId) {
    //         alert('유효하지 않은 아이디입니다');
    //         return;
    //     }
    //     axios.post('http://localhost.4000/idDuplicateCheck', {
    //         params: userId
    //     })
    //         .then(res => {
    //             if (res.data[0].count >= 1) {
    //                 setIdDuplicate(true);
    //                 alert('이미 존재하는 아이디입니다');
    //             } else {
    //                 alert('사용 가능한 아이디입니다');
    //                 setIdDuplicate(false);
    //             }
    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         })
    // };
    // console.log(idDuplicate);

    //todo : 아이디 중복 검사
    // User.findOne({ userId: loginId }, (err, user) => {
    //     if (!user) {
    //         return res.json({
    //             loginSuccess: false,
    //             message: "이미 존재하는 아이디 입니다"
    //         })
    //     }
    // });

    // todo : id 중복 검사 (db 확인해서)
    const [idDuplicate, setIdDuplicate] = useState(true);

    const idDuplicateCheck = () => {
        axios.post('http://localhost.4000/idDuplicateCheck', {
            params: userId
        })
            .then(res => {
                if (res.data[0].count >= 1) {
                    setIdDuplicate(true);
                    alert('이미 존재하는 아이디입니다');
                } else {
                    alert('사용 가능한 아이디입니다');
                    setIdDuplicate(false);
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    };


    //DB에 삽입
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const joinId = e.target.joinId.value;
        const joinPw = e.target.joinPw.value;
        const joinName = e.target.joinName.value;
        const joinTel = e.target.joinTel.value;
        const joinAddress = e.target.joinAddress.value;
        const joinDetailAddress = e.target.joinDetailAddress.value;
        const joinFullAddress = joinAddress + " " + joinDetailAddress;
        const joinBirth = e.target.joinBirth.value;
        try {
            
        } catch (e) {
            console.log(e.message);
        }
        console.log(joinId, joinPw, joinName, joinTel, joinFullAddress, joinBirth);
        await axios.post('http://localhost:4000/join', {
            joinId, joinPw, joinName, joinTel, joinFullAddress, joinBirth
        })
        //todo : 여기 정리
        // .then(alert('회원가입에 성공하였습니다'))
        // .then(window.location.href = '/login');
    };

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

    return (
        <>
            <form onSubmit={onSubmitHandler} method="post"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
                아이디 <input type="text" id="joinId" name="joinId" minlength="4" maxlength="12" required
                    // onChange={handleInputId} 
                    placeholder="영문, 숫자 4~12 글자" />
                <button type="button"
                onClick={idDuplicateCheck}
                >중복검사</button><br />
                비밀번호 <input type="password" id="joinPw" name="joinPw" minlength="4" maxlength="12" required
                    // onChange={handleInputPw} 
                    placeholder="영문, 숫자 4~12 글자" /><br />
                비밀번호 확인 <input type="password" id="joinPwChk" name="joinPwChk" maxlength="12" required /><br />
                이름 <input type="text" id="joinName" name="joinName" minlength="2" maxlength="12" required /><br />
                전화번호 <input type="text" id="joinrTel" name="joinTel" minlength="11" maxlength="11" required />
                <div className="address_search" >주소
                    {/* todo : 주소 자동 입력칸이 회색으로 보였으면 좋겟음..... */}
                    <input className="user_enroll_text" type="text" required readOnly name="joinAddress" onChange={handleInput} value={enroll_company.address} />
                    <button onClick={handleComplete}>우편번호 찾기</button>
                    <input className="user_enroll_text" type="text" placeholder="상세주소" required maxLength="30" name="joinDetailAddress"/>
                    {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post >}
                </div>
                생일 <input type="text" id="joinBirth" name="joinBirth" required /><br />
                <button type="submit">회원가입</button>
            </form>
        </>
    );
}
export default Join;