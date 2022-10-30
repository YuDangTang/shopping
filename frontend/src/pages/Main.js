import styled from 'styled-components';
import Imgslide from '../components/ImgSlide'
import Category from './category/Category';
// import '../css/reset.css';

function Main(){
    //광고 페이지네이션
    return(
        <>
            <ImgSlideDiv></ImgSlideDiv><Imgslide></Imgslide>
            <Category></Category>
        </>
    )
}
export default Main;

let ImgSlideDiv = styled.div`
    text-align: center;
`