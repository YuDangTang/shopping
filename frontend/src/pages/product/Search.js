import { useEffect, useState } from "react";
import React, { Component } from "react";
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { useParams, useNavigate } from "react-router-dom" // 1. useParams 라는 기능을 임포트한다.
import axios from "axios";

function Search(){



    const param = useParams().searchName;
    return(
        

        <SearchZone>
            <SearchTitle>
                Search
            </SearchTitle>
            <SearchBox>
                <SearchInputDiv>
                <SearchText>검색 조건</SearchText>
                    <input value={param + "를 검색했습니다"}></input>
                </SearchInputDiv>
                <SearchInputDiv>
                <SearchText>검색 조건</SearchText>
                    <input value={param + "를 검색했습니다"}></input>
                </SearchInputDiv>
                <div>
                    <button >
                        검색하기
                    </button>
                </div>
            </SearchBox>


        








        </SearchZone>
    )


}export default Search


const SearchTitle =styled.form`
    display: inline-block;
    padding: 0;
    color: #757575;
    font-size: 18px;
    font-weight: normal;

`

const SearchZone = styled.div`
    display: flex;
    margin-top: 130px;
    flex-direction:column;
    align-items: center;
    gap : 40px;

`
const SearchBox = styled.div`
    display: flex;
    width: 90%;
    padding: 40px;
    box-sizing:border-box;
    border: 2px solid #ebebeb;
    align-items: center;
    flex-direction: column;
    gap:6px;
`

const SearchText = styled.div`
    float: left;
    width: 100px;
    padding: 2px 10px 0 0;
    font-weight:bold;
    color: #353535;

`

const SearchInputDiv = styled.div`
    display: flex;
    
    
`
// const SearchZone = styled.div`
//     display: flex;
    
    
// `