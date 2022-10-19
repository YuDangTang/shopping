import Table from "../../components/Table.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductObj } from "../../obj/obj.js";
import axios from "axios";
// import ReactDOM from 'react-dom/client';
function RegisterProMat(){
    const location = useLocation();
    useEffect(() => {
        console.log("도착한 데이터: " ,location.state.ProductObj);
    }, []);
    const Materials = ["면", "폴리에스테르", "레이온", "기모", "텐셀", "아크릴",
                        "울", "캐시미어", "앙고라", "린넨", "쭈리", "쉬폰", "나일론", 
                        "코듀로이", "옥스포드", "트위드", "스웨이드"];
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
        await axios.post('http://localhost:4000/admin/regProDetail', 
            formData
        );
        await axios.post('http://localhost:4000/admin/regProDetail', 
            ProductObj
        );
    };
    function handleClick(e){
        window.location.href = "/admin/regProSize";
    }
    return(
        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
            <table align ="center" border={1} cellSpacing={1}>
                <tr><td align ="center" colSpan = "2">상품 등록</td></tr>
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
                    }}><div>{Materials.map(value => {
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
                    })}</div></td>
                </tr>
                <td align ="center" colSpan = "2">
                    <button type="button" onClick={handleClick}>이전</button><button type="submit">다음</button>
                </td>
            </table>
        </form>
    );
};
export default RegisterProMat;