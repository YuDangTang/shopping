import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

function DetailUpdate() {
    const [proKindName, setProKindName] = useState("");
    const [product, setProduct] = useState({});
    const [sizes, setSizes] = useState([]);
    const params = useParams();

    const getData = async (params) => {
        if (params.id !== undefined) {
            await axios.post(`http://localhost:4000/admin/${params.id}/detailUpdate`, { params })
                .then((res) => {
                    const pro = res.data.product;
                    setProduct(pro);
                    setProKindName(pro.proKindName);
                    setSizes(res.data.size.detail);

                    // console.log("컵밥밥 : ", pro.proSize[0].proColor[0].size);
                    // for (var i = 0; i < pro.proSize[0].proColor.length; i++){
                    //     console.log(i, pro.proSize[0].proColor[i].size);
                    //     setSizes(pro.proSize[0].proColor[i].size);
                    // }
                    // console.log("사이즈 배열 : ",sizes);
                });
        }
    };

    useEffect(() => {
        getData(params);
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault(); //기본 동작 막기
        const obj = {
            proName: "",
            detail: [],
        };
        if (proKindName === "OUTER" || proKindName === "DRESS"
            || proKindName === "TOP" || proKindName === "BLOUSE & SHIRT") {
            obj.proName = proKindName;
            const topShoulder = e.target.shoulder;
            const topChest = e.target.chest;
            const topArmhole = e.target.armhole;
            const topArmholeSize = e.target.armholeSide;
            const topSleeveSize = e.target.sleeveSide;
            const topSleeveLength = e.target.sleeveLength;
            const topTotalLength = e.target.totalLength;
            
            for (var i = 0; i < topShoulder.length; i++) {
                const sizeDetail = {};
                sizeDetail.id = product.proSize[0].proSize_ID;
                sizeDetail.shoulder = topShoulder[i].value;
                sizeDetail.chest = topChest[i].value;
                sizeDetail.armhole = topArmhole[i].value;
                sizeDetail.armholeSide = topArmholeSize[i].value;
                sizeDetail.sleeveSide = topSleeveSize[i].value;
                sizeDetail.sleeveLength = topSleeveLength[i].value;
                sizeDetail.totalLength = topTotalLength[i].value;
                obj.detail.push(sizeDetail);
            }
        } else if (proKindName === "SKIRT" || proKindName === "PANTS") {
            obj.proName = proKindName;
            const bottomWaist = e.target.waist;
            const bottomHip = e.target.hip;
            const bottomThigh = e.target.thigh;
            const bottomHem = e.target.hem;
            const bottomCrotch = e.target.crotch;
            const bottomTotalLength = e.target.totalLength;

            for (var i = 0; i < bottomWaist.length; i++) {
                const sizeDetail = {};
                sizeDetail.id = product.proSize[0].proSize_ID;
                sizeDetail.waist = bottomWaist[i].value;
                sizeDetail.hip = bottomHip[i].value;
                sizeDetail.thigh = bottomThigh[i].value;
                sizeDetail.hem = bottomHem[i].value;
                sizeDetail.crotch = bottomCrotch[i].value;
                sizeDetail.totalLength = bottomTotalLength[i].value;
                obj.detail.push(sizeDetail);
            }
        } else if (proKindName === "SHOES") {
            obj.proName = proKindName;
            const shoesHeelHeight = e.target.heelHeight;
            const shoesHeelBall = e.target.heelBall;
            const shoesTotalHeight = e.target.totalHeight;
            const shoesHeel = e.target.heel;

            for (var i = 0; i < shoesHeelHeight.length; i++) { 
                const sizeDetail = {};
                sizeDetail.id = product.proSize[0].proSize_ID;
                sizeDetail.heelHeight = shoesHeelHeight[i].value;
                sizeDetail.heelBall = shoesHeelBall[i].value;
                sizeDetail.totalHeight = shoesTotalHeight[i].value;
                sizeDetail.heel = shoesHeel[i].value;
                obj.detail.push(sizeDetail);
            }
        }
        console.log("오비제 : ",obj);
        await axios.post(`http://localhost:4000/admin/${params.id}/detailUpdate`, obj)
            .then((res) => {
                if (res.data === "success") {
                    alert('저장 성공');
                } else {
                    alert('다시 한 번 확인 좀');
                }
            });
    };

    if (proKindName === "OUTER" || proKindName === "DRESS"
            || proKindName === "TOP" || proKindName === "BLOUSE & SHIRT") {
        return (
            <>
                <form onSubmit={onSubmitHandler}>
                    <table border={1} style={{ lineHeight: "2" }}>
                        <tr><td colSpan="2">상품 디테일 수정</td></tr>
                            {sizes.map(size => {
                                return (<>
                                    <tr><td>사이즈</td><td style={{ paddingTop: "10px" }}>{size.size}</td></tr>
                                    <tr><td>어깨</td><td><input type="text" name="shoulder" defaultValue={size.shoulder || ''} required /></td></tr>
                                    <tr><td>가슴단면</td><td><input type="text" name="chest" defaultValue={size.chest || ''} required /></td></tr>
                                    <tr><td>암홀</td><td><input type="text" name="armhole" defaultValue={size.armhole || ''} required /></td></tr>
                                    <tr><td>팔통단면</td><td><input type="text" name="armholeSide" defaultValue={size.armholeSide || ''} required /></td></tr>
                                    <tr><td>소매단면</td><td><input type="text" name="sleeveSide" defaultValue={size.sleeveSide || ''} required /></td></tr>
                                    <tr><td>총기장</td><td><input type="text" name="totalLength" defaultValue={size.totalLength || ''} required /></td></tr>
                                </>);
                            })}
                    </table>
                    <input type="submit" value="수정" />
                </form>
            </>
        )
    } else if (proKindName === "PANTS" || proKindName === "SKIRT") {
        return (
            <>
                <form onSubmit={onSubmitHandler} >
                    <table border={1} style={{lineHeight:"2"}}>
                        <tr><td colSpan="2">상품 디테일 수정</td></tr>
                        {sizes.map(size => {
                            return (<>
                                <tr><td>사이즈</td><td style={{paddingTop: "10px"}}>{size.size}</td></tr>
                                <tr><td>허리단면</td><td><input type="text" name="waist" defaultValue={size.waist || ''} required /></td></tr>
                                <tr><td>힙단면</td><td><input type="text" name="hip" defaultValue={size.hip || ''} required /></td></tr>
                                <tr><td>허벅지단면</td><td><input type="text" name="thigh" defaultValue={size.thigh || ''} required /></td></tr>
                                <tr><td>밑단단면</td><td><input type="text" name="hem" defaultValue={size.hem || ''} required /></td></tr>
                                <tr><td>밑위</td><td><input type="text" name="crotch" defaultValue={size.crotch || ''} required /></td></tr>
                                <tr><td>총기장</td><td><input type="text" name="totalLength" defaultValue={size.totalLength || ''} required /></td></tr>
                            </>);
                        })}
                    </table >
                    <input type="submit" value="수정" />
                </form>
            </>
        )
    } else if (proKindName === "SHOES") {
        return (
            <>
                <form onSubmit={onSubmitHandler} >
                    <table border={1} style={{ lineHeight: "2" }}>
                        <tr><td colSpan="2">상품 디테일 수정</td></tr>
                        {sizes.map(size => {
                            return (<>
                                <tr><td>사이즈</td><td style={{ paddingTop: "10px" }}>{size.size}</td></tr>
                                <tr><td>굽높이</td><td><input type="text" name="heelHeight" defaultValue={size.heelHeight || ''} required /></td></tr>
                                <tr><td>발볼</td><td><input type="text" name="heelBall" defaultValue={size.heelBall || ''} required /></td></tr>
                                <tr><td>총높이</td><td><input type="text" name="totalHeight" defaultValue={size.totalHeight || ''} required /></td></tr>
                                <tr><td>뒷굽</td><td><input type="text" name="heel" defaultValue={size.heel || ''} required /></td></tr>
                            </>);
                        })}
                    </table >
                    <input type="submit" value="수정" />
                </form>
            </>
        )
    }
}

export default DetailUpdate;