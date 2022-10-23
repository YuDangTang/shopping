import axios from "axios";
function Register(props){
    const nums = props.num;
    const onSubmitHandler = async (e) => { 
        e.preventDefault(); // 기본동작 막기
        const mat = e.target.mat.value;
        if(nums === 1){
            const colorCode = e.target.colorCode.value;
            console.log(mat, colorCode);
            await axios.post('http://localhost:4000/admin/regProColor', 
            {mat, colorCode})
            .then(alert("색상 등록 완료"))
            .then(e.target.mat.value = "")
            .then(e.target.colorCode.value = "");
        }else{
            await axios.post('http://localhost:4000/admin/regProMaterial', {
                mat
            }).then(alert("소재 등록 완료"))
            .then(e.target.mat.value = "");
        }
    };
    return(
        <>
            <form onSubmit={onSubmitHandler}>
                <table align ="center" border={1} cellSpacing={1}>
                    <tr><td align ="center" colSpan = "2">관리자</td></tr>
                    <tr>
                        <td style={{
                            textAlign: "center",
                            padding: "20px 60px",
                        }}>{props.text}: </td>
                        <td><input type={"text"} name="mat" required/></td>
                    </tr> 
                    {
                        nums === 1
                        ? <tr>
                            <td style={{
                                textAlign: "center",
                                padding: "20px 60px",
                            }}>{"색상코드"}</td>
                            <td><input type={"text"} name="colorCode"/></td>
                        </tr>
                        : null
                    }
                    <tr><td td align ="center" colSpan = "2"><input type={"submit"} value={"제출"}/></td></tr>
                </table>
            </form>
        </> 
    );
}
export default Register;