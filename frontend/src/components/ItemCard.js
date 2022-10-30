import styled from 'styled-components'; // react에 css 바로 사용 라이브러리

//상품의 객체를 받아온다.
function ItemCard(props){
    console.log(props.product._id);
    console.log(props.product.proImg[0]);
    console.log(`/${props.product.proImg[0]}`)
    //img 넣기
    const proImg = `/${props.product.proImg[0]}`
    
    return(
        <ICContanel>
            <ICContanerl2 href= {` /product/${props.product.proName}`}>
                <img style={{width:'100%'}} src= {proImg}/>
            </ICContanerl2>


          
            {/* 타이틀 값 가지고와 */}
            <ICATag href =  {` /product/${props.product.proName}`}  >
                <p>{props.product.proName}</p>
            </ICATag>
  

            <hr/>

        <ul>
            <ICkeyword>
                {/* item spec */}아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다아이템 스펙입니다
            </ICkeyword>
            <Icprice>
                {/* 원래가격 */}{props.product.proPrice.price}
            </Icprice>
            <li>
                {/* 할인가격 */} {props.product.proPrice.profit} 
            </li>
            <li>
                {/* 키워드 */}{props.product.proKindName}
            </li>
        </ul>

        </ICContanel>
    )

}
export default ItemCard;


let ICContanel = styled.div`
    display: flex ;
    flex-direction: column;
    width: 80%;
    margin-right: 2%;
    font-size:12px;
    line-height: 18px;

`

let ICContanerl2 = styled.a`
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