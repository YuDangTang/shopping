import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리

export default class SimpleSlider extends Component {

    
  render() {
    const settings = {
        dots: true, // 캐러셀의 점을 보여줄 것인지
        infinite: true, // 마지막 장 다음에 첫번째가 나오게 할 것인지
        speed: 1000, // 넘어가는 속도는 몇으로 할 것인지
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: true,  // 자동 재생
        autoplaySpeed: 3000,  // 자동 재생 속도
        draggable : true, 	//드래그 가능 여부
        arrows : true,  //화살표켜기
        fade:true,            // 페이드 효과
        centerMode: true,
        centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    };
    return (
      <Wrap>
      <div>
        <Slider {...settings}>      
          <div>
            <h3><img src='/assets/aa.jpg' /></h3>
          </div>
          <div>
            <h3><img src='/assets/bb.jpg' /></h3>
          </div>
          <div>
            <h3><img src='/assets/ee.jpg' /></h3>
          </div>
          </Slider>
      </div>
      </Wrap>
    );
  }
}

// const Image = styled.img`  //사진크기 지정
//   width: 520px;
//   height: 520px;
// `;

const Wrap = styled.div`

  $wh : #ffffff;
  $bk : #000000;
  $pt :#ffc0cb;
  margin: 5% auto;
  width: 100%;

  // .slick-arrow{     //화살표 공통으로 수정
  //   background: transeparent;   
  //   width:40px;
  //   height:40px;
  //   border: 0;  
  //   top:50%;    
  //   transform:translateY(-50%);
  //   position: absolute;
  //   cursor: pointer;
  //   font-size: 0; 
  //   z-index: 1;  
  //   overflow: hidden;
  // } 

  .slick-arrow {
    z-index: 10;
    width: 10px;
    height: 10px;
    background: rgba($bk, 0.2);
    border-radius: 50%;
    transition: background 0.5s;
    cursor: pointer;
    &::before {
        font-family: 'Line Awesome Free';
        font-weight: 900;
        font-size: 49px;
        transition: all 0.5s;
    }
  }

  .slick-prev:before { //왼쪽 화살표
   // opacity: 1; // 기존에 숨어있던 화살표 버튼이 보이게 (위에서 적용해서 굳이안해도됨)
    color: white; // 버튼 색은 검은색으로
  }
  .slick-next:before { //오른쪽 화살표
   // opacity: 1;
    color: white;
  }
  .slick-prev { //왼쪽 화살표 위치
    left: 1%;
    z-index:100;
    &::before {
      content: url(assets/bt_slide_before.png);
  }
  } 
  .slick-next { //오른쪽 화살표 위치
    right: 3%;   
    z-index:100;
    &::before {
      content: url(assets/bt_slide_next.png);
  }
  }
   
  .slick-dots li button:before //밑에 버튼 설정
{
    font-family: 'slick';
    line-height: 20px;
    color : white;
    position: absolute;
    top: -60px;
    left: 0;
    content: '•';
    text-align: center;
}
  `