import styled from 'styled-components'; // react에 css 바로 사용 라이브러리

//모든 페이지 최 상단 리모콘


function Header(){
    return(
        <TopBoxStyle >
            <div>공지사항</div>
            <Remote >
                <span>LOGIN</span>
                <span>JOIN US</span>
                <span>CART</span>
                <span>ORDER</span>
                <span>MY PAGE</span>
            </Remote>
        </TopBoxStyle>
    )
}
export default Header;


let TopBoxStyle = styled.div`
    background : #f8ece6;
`

let Remote = styled.div`

    display: flex;
    background : #f8ece6;
    gap : 30px;
    text-align : right;
    
`