// 전체적으로 초기화 작업을 해주는 js ...
import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
    
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px ;
        background-color: #ffffff ;
        min-width : 1500px;
        
    }
    hr{
        opacity: 0.2;
    }



`;

export default GlobalStyles;