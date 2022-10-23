import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { Link } from 'react-router-dom';

//모든 페이지 최 상단 리모콘


function Header(props){
    //카테고리 리스트 출력
    const category = () =>{
        const catNames =["Home","best50","상의","하의"];
        const catNameList = catNames.map((name) => <Link to="category/{name}">{name}</Link>);

        return <>{catNameList}</>
    }

    const onLogout = () => {
        sessionStorage.clear();
        document.location.href = '/'
    }
    
    const isLogin = props.isLogin  //App.js로부터 프로퍼티를 받아서 true,false 확인
    const isLogin2 = sessionStorage.getItem("id");

    if (isLogin2) { //로그인 성공 시
        return (
            <>
                <TopBoxStyle >
                    <p>★상품 폐기처분 및 반품상품 포장 안내</p>
                    <Remote >
                        <Link to='/' onClick={onLogout}>LOGOUT</Link>
                        <Link to='/order/basket'>CART</Link>
                        <Link to='/myshop/Order'>ORDER</Link>
                        <Link to='/myshop/MyShop'>MY PAGE</Link>
                    </Remote>
                </TopBoxStyle>

                <Main>
                    <div></div>
                    <Banner href='/'>mieummieum</Banner>
                    <SearchContaner>
                        <p>마이</p>
                        <p>장바구니</p>
                        <input type={'input'}></input>
                    </SearchContaner>
                </Main>
                <hr></hr>
                <CategoryCss>
                    {category()}
                </CategoryCss>
            </>
        )
    }
    else {
        return (
            <>
                <TopBoxStyle >
                    <p>★상품 폐기처분 및 반품상품 포장 안내</p>
                    <Remote >
                        <Link to='/member/login'>LOGIN</Link>
                        <Link to='/member/Join'>JOIN US</Link>
                        <Link to='/order/basket'>CART</Link>
                        <Link to='/myshop/Order'>ORDER</Link>
                        <Link to='/myshop/MyShop'>MY PAGE</Link>
                    </Remote>
                </TopBoxStyle>

                <Main>
                    <div></div>
                    <Banner href='/'>mieummieum</Banner>
                    <SearchContaner>
                        <p>마이</p>
                        <p>장바구니</p>
                        <input type={'input'}></input>
                    </SearchContaner>
                </Main>
                <hr></hr>
                <CategoryCss>
                    {category()}
                </CategoryCss>
            </>
        )
    }
}
export default Header;




//================================
    // css 공간
//===============================

//탑 박스 리모콘
let TopBoxStyle = styled.div`
    background : #f8ece6;
    height : 50px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    



`

let Remote = styled.div`

    display: flex;
    background : #f8ece6;
    gap : 20px;
    text-align : right;
    margin-right : 30px;
    margin-left : 30px;

    
`

//메인베너

let Main = styled.div`
font-family: 'Old Standard TT',serif;
display:flex;
flex-direction:row;
justify-content : space-between;
position : relative;


`
let Banner = styled.a`
width:100%;
float:left;
font-size:32px;
text-align:center;
margin:60px 0;
letter-spacing:2px;

`

let SearchContaner = styled.span`
display:flex;
gap:10px;
position:absolute;
top:64px;
right:50px;

`
//카테고리
let CategoryCss = styled.div`
display: flex;
align-items:center;
justify-content: center;
flex-direction: row;
list-style:none;
gap:10%;
margin: 20px;


`
