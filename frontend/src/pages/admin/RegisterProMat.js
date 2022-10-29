import Table from "../../components/Table.js";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ProductObj } from "../../obj/obj.js";
import axios from "axios";
// import ReactDOM from 'react-dom/client';
function RegisterProMat(){
    const params = useParams(); // url 가져오기(Update인지 Register인지)
    const [matArr, setMatArr] = useState([]);
    const getData = async () => {
        if(params.id == undefined){
            const respnose = await axios.get('http://localhost:4000/admin/regProDetail');
            const datas = respnose.data;
            setMatArr(datas);
        }else{
            const respnose = await axios.get(`http://localhost:4000/admin/${params.id}/update3`);
            const datas = respnose.data;
            setMatArr(datas);
        }
    }; 
    const location = useLocation();
    useEffect(() => {
        getData();
        if(params.id == undefined){
            console.log("도착한 데이터: " ,location.state.ProductObj);
        }else{console.log("도착한 데이터: " ,location.state.DB);}
    }, []);
    const [checkedInputs, setCheckedInputs] = useState([]);
    const changeHandler = (checked, value) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, value]);
        } else {
        // 체크 해제
            setCheckedInputs(checkedInputs.filter((el) => el !== value));
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const DB = location.state.DB;
        const proMaterial = checkedInputs;
        if(proMaterial.length == 0){
            alert('소재를 선택해주세요');
            return;
        }
        const formData = new FormData();
        const img = e.target.proImage;
        console.log(formData.values());
        for(var i = 0; i < img.files.length; i++){
            formData.append("proImage", e.target.proImage.files[i]);
        }
        ProductObj.proMaterial = proMaterial;
        if(params.id == undefined){
            await axios.post('http://localhost:4000/admin/regProDetail', 
                formData
            );
            await axios.post('http://localhost:4000/admin/regProDetail',  ProductObj)
            .then((response) => {
                if(response.data != "fail"){
                    alert("상품이 등록되었습니다.");
                    window.location.href = `/admin/${response.data[0]._id}/stocks`;
                }
            });
        }else{
            await axios.post(`http://localhost:4000/admin/${params.id}/update3`,  DB)
            .then((response) => {
                if(response.data == "success"){
                    alert("상품이 변경되었습니다.");
                    window.location.href = "/admin";
                }
            });
        }
    };
    // function handleClick(e){ 
    //     window.location.href = "/admin/regProSize";
    // }
    return(
        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
            <table align ="center" border={1} cellSpacing={1}>
                <tr>{
                        params.id == undefined
                        ? <td align ="center" colSpan = "2">상품 등록</td>
                        : <td align ="center" colSpan = "2">상품 수정</td>
                    }</tr>
                <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>{"이미지"}</td>
                    <td><input type="file" id="fileAdd" 
                    multiple name={"proImage"} 
                    accept="image/*"
                    /></td>
                <tr>
                    <td style={{
                        textAlign: "center",
                        padding: "0px 60px",
                    }}>{"소재"}</td>
                    <td align ="center" style={{
                        padding: "0px 16px",
                    }}>
                    <div>{matArr.map((value) => {
                        return(
                            <>
                                <input type={"checkbox"}
                                value={value}
                                onChange={(e)=>{
                                    changeHandler(e.currentTarget.checked, value)
                                }}/>
                                {value}
                            </>
                        );
                    })}</div>
                    </td>
                </tr>
                <td align ="center" colSpan = "2">
                    {/* <button type="button" onClick={handleClick}>이전</button> */}
                    <button type="submit">다음</button>
                </td>
            </table>
        </form>
    );
};
export default RegisterProMat;