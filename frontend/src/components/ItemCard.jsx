import styled from 'styled-components'; // react에 css 바로 사용 라이브러리






//id값을 받아와서 그에맞는 id 정보를 출력하게 만든다.
function ItemCard(){

    return(
        <ICContanel>
        <ICContanerl2>
            <img style={{width:'100%'}} src= '/assets/testgif.webp'/>
        </ICContanerl2>
        
  
                <ICATag href=''>
                    {/* id.타이틀 값 가지고와 */}[La belle rose]베이글 스퀘어 셔링 롱원피스 (골반메이드)
                </ICATag>
    
            
            <hr/>

        <ul>
            <ICkeyword>
                {/* item spec */}아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다
            </ICkeyword>
            <Icprice>
                {/* 원래가격 */}25000원
            </Icprice>
            <li>
                {/* 할인가격 */} 23800원 
            </li>
            <li>
                {/* 키워드 */} 2
            </li>
        </ul>

        </ICContanel>
    )

}
export default ItemCard;


let ICContanel = styled.div`
    display: flex ;
    flex-direction: column;
    width: 24.24%;
    margin-right: 2%;
    font-size:12px;
    line-height: 18px;

`

let ICContanerl2 = styled.div`
    position: relative;
    margin:  0 0 15px;
    text-align: center;
    
`

let ICATag = styled.a`
    font-size:14px;
    color: black;
    font-weight: bold;
    padding-bottom:8px;
    border-width:  0px 0px 1px 0px;
    border-style: solid;
    border-color: #ebebeb;
    
    

`

let ICkeyword = styled.p`
    font-size: 12px;
    color: #a8a8a8;

`

let Icprice = styled.p`
    font-size:  14px;
`