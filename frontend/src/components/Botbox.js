import '../css/Botbox.css';
//모든 페이지 하단 info


function Bottom(){
    return(
        <div className='footer'>
            <div className='inner'>
                <div className='xans-element- xans-layout xans-layout-footer '>
                    <div className='footer_box all_width'>
                        <div className='box_inner'>
                            <div className='footer_info'>
                                <h2>MENU</h2>
                                <a href='#'>HOME <span>홈</span></a><br></br>
                                <a href='#'>COMPANY <span>회사소개</span></a><br></br>
                                <a href='#'>AGREEMENT <span>이용약관</span></a><br></br>
                                <a href='#'>PRIVACY POLICY <span>개인정보처리방침</span></a><br></br>
                                <a href='#'>GUIDE <span>이용안내</span></a><br></br>
                            </div>
                            <div className='footer_info'>
                                <h2>CALL CENTER</h2>
                                <span className='info_call'>T. 0000-0000</span><br></br>
                                MON TO FRI AM 11:00 - PM 05:00<br></br>
                                (LUNCH TIME PM 12:00 - PM 01:00)<br></br>
                                SAT.SUN.HOLIDAY
                                <font color="#e67777">CLOSED</font><br></br><br></br>
                                <h2>BANK INFO</h2>
                                <span>
                                    농협 0000-000-000000<br></br>
                                    신협 0000-000-000000<br></br>
                                    예금주 : (주)유당탕탕
                                </span><br></br>
                            </div>
                            <div className='footer_info'>
                                <h2>INFO</h2>
                                COMPANY :
                                <span>(주)유당탕탕</span>
                                OWNER :
                                <span>신정환</span>
                                TEL :
                                <span>1544-8282</span><br></br>
                                ADDRESS :
                                <span>충청남도 아산시 선문대학교 인문관 3층</span><br></br>
                                CHIEF PRIVACY OFFICER :
                                <a href='mailto:fromdayone@nate.com'>
                                    <span>신정환(youdang@nate.com)</span>
                                </a><br></br>
                                BUSINESS LICENSE :
                                <span>[000-00-00000]</span>
                                ONLINE ORDER LICENSE :
                                <span>0000-아산시-0000</span>
                                <a className='link' href='#' >사업자정보확인</a><br></br>
                                HOSTING BY
                                <span>카페24(주)</span><br></br><br></br>
                                <h2>RETURN ADDRESS</h2>
                                <span>CJ대한통운 (1588-1255)</span><br></br>
                                <span>
                                    반품주소: 충청남도 아산시 선문대학교 인문관 3층<br></br>
                                    자연관 앞에 있는 쌍둥이 건물<br></br>
                                    *고객센터로 접수 후 상품을 보내주셔야하며 지정택배사를 이용해주시기 바랍니다.*
                                </span><br></br><br></br>
                                <span>
                                    <img src="assets\bot.gif"></img>
                                    &nbsp;
                                    <img src='assets/bot2.gif'></img>
                                    &nbsp;
                                    <img src='\assets\bot2.gif'></img>
                                </span>
                            </div>
                            <div class="xans-element- xans-layout xans-layout-boardinfo footer_info">
                                <h2>OTHER LINK</h2>
                                <a href="#" class="xans-record-">NOTICE</a>
                                <br></br><a href="#" class="xans-record-">Q&amp;A</a>
                                <br></br><a href="#" class="xans-record-">REVIEW</a>
                                <br></br><a href="#" class="xans-record-">EVENT</a>
                                <br></br><br></br><br></br><a href="#" >DELIVERY</a>
                                <br></br><a href="#" >INSTAGRAM</a>
                                <br></br><a href="#" >FACEBOOK</a>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="copyright" id="footer_copy">
                <span>COPYRIGHT (C) ALL RIGHTS RESERVED. <a href="#">DESIGN BY DAYDESIGN.</a></span>
            </div>
        </div>
    </div>
        

    )
}
export default Bottom;

