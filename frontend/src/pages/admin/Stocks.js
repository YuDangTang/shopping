import axios from "axios";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { Td } from "../../components/Table";
function Stocks(){
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [lists, setLists] = useState("재고수정");
    const [colors, setColor] = useState([]);
    const [sizes, setSize] = useState([]);
    const [colorsDB, setColorDB] = useState([]);
    const [checkColor, setCheckColor] = useState([]);   // 선택된 색상 값
    const [checkSize, setCheckSize] = useState([]);     // 선택된 사이즈 값
    const [showSizes, setShowSize] = useState([]);      // 사이즈 선택 체크박스
    const Clothes = ["XS", "S", "M", "L", "XL"];
    const Shoes = ["220", "225", "230", "235", "240", "245", "250", "255", "260"];
    const getData = async (params) => {
        const colorDBArr = [];
        if(lists == "색상&사이즈 추가"){
            const color = await axios.get(`http://localhost:4000/admin/${params.id}/stocks`);
            for(var i = 0; i < color.data.length; i++){
                const colorArr = [];
                colorArr.push(color.data[i].color);
                colorArr.push(color.data[i].colorCode);
                colorDBArr.push(colorArr);
            }
        }
        await axios.post(`http://localhost:4000/admin/${params.id}/stocks`, params)
        .then((response) => {
            if(response.data == "fail"){
                alert("해당 상품은 존재하지 않습니다.");
                window.location.href = "/admin";
                return;
            }else{
                const datas = response.data;
                const arr = [];
                arr.push(datas);
                let showSizeArr = [];
                if(lists == "색상&사이즈 추가"){
                    if(datas.proKindName == "SHOES"){
                        showSizeArr = Shoes;
                        setShowSize(Shoes)}
                    else{
                        showSizeArr = Clothes;
                        setShowSize(Clothes)}
                    const sizeArr =[];
                    const colorArr =[];
                    for(var i = 0; i < datas.proSize[0].proColor.length; i++){
                        sizeArr.push(datas.proSize[0].proColor[i].size);
                        const index = showSizeArr.indexOf(datas.proSize[0].proColor[i].size);
                        showSizeArr.splice(index, 1);
                        if(i == 0){
                            for(var j = 0; j < datas.proSize[0].proColor[i].colorAmout.length; j++){
                                colorArr.push(datas.proSize[0].proColor[i].colorAmout[j].color);
                                for(var k = 0; k < colorDBArr.length; k++){
                                    if(colorDBArr[k][0] == datas.proSize[0].proColor[i].colorAmout[j].color){
                                        colorDBArr.splice(k, 1);
                                        break;
                                    }
                                }
                            }
                        }
                        setColor(colorArr);
                    }
                    setShowSize(showSizeArr);
                    setSize(sizeArr);
                }
                setProducts(arr);
                setColorDB(colorDBArr);
            }
        });
    };
    useEffect(() => {
        getData(params);
    }, [lists])
    const onClickHandler = () => {
        window.location.href = "/admin";
    }
    const onClickListHandler = (e) =>{
        if(e.target.value == "색상&사이즈 추가"){
            e.target.value = "재고수정";
            setLists("색상&사이즈 추가");
        }
        else if(e.target.value == "재고수정"){
            e.target.value = "색상&사이즈 추가";
            setLists("재고수정");
        }
    }
    const changeColor = (target, value) => {
        if (target.checked) {
            setCheckColor([...checkColor, target.value]);
        } else {
            // 체크 해제
            setCheckColor(checkColor.filter((el) => el !== target.value));
        }
    };
    const changeHandler = (target, value) => {
        if (target.checked) {
            setCheckSize([...checkSize, target.value]);
        } else {
            // 체크 해제
            setCheckSize(checkSize.filter((el) => el !== target.value));
        }
    };
    const onColorSubmit = async (e) => {
        e.preventDefault(); // 기본동작 막기
        const size = checkSize;
        const color = checkColor;
        console.log(size);
        console.log(color);
        if(size.length == 0 && color.length == 0){
            alert("추가하실 사이즈나 색상을 선택해주세요.");
            return;
        }
        const datas = {
            proName: products[0].proName,
            size,
            color,
        };
        await axios.post(`http://localhost:4000/admin/${params.id}/stocks`, datas)
        .then((response) => {
            const datas = response.data;
            if(datas == "fail"){
                alert("색상 or 사이즈 수정에 실패하였습니다.");
                return;
            }else{
                alert("색상 or 사이즈 수정이 완료되었습니다.");
                setCheckColor([]);
                setCheckSize([]);
                setLists("재고수정");
            }
        });
    };
    const onStockHandler = async (e) => { 
        e.preventDefault(); // 기본동작 막기
        const size = document.getElementsByName("proSize");
        const color = document.getElementsByName("proColor");
        const order = document.getElementsByName("proOrder");
        const noti = document.getElementsByName("proNoti");
        const proAmount = document.getElementsByName("proAmout");
        
        const proSize = []; // proSize.push(obj)
        const obj = {       // proColor.push(proColorObj);
            proSize_ID: products[0].proSize[0].proSize_ID,
            proColor: [],
        };
        let k = 0;
        for(var i = 0; i < size.length; i++){
            const proColorObj = {  // colorAmout.push(amount);
                size : size[i].innerHTML,
                colorAmout : [],
            };
            console.log(color.length/size.length)
            for(var j = 0; j < color.length/size.length; j++){
                if(proAmount[i].value === "" || noti[k].value === ""){
                    alert("수량을 입력해주세요.");
                    return;
                }
                if(Number.isNaN(Number(proAmount[i].value)) || Number.isNaN(Number(noti[k].value))){
                    alert("수량은 숫자만 입력해주세요");
                    return;
                }
                if(proAmount[i].value < 0 || noti[k].value < 0){
                    alert("0 이상의 숫자만 입력해주세요");
                    return;
                }
                const amount = {
                    color: color[k].innerHTML,
                    amout: proAmount[k].value,
                    orderQuan: order[k].innerHTML,
                    notiQuan: noti[k].value,
                };
                proColorObj.colorAmout.push(amount);
                k++;
            }
            obj.proColor.push(proColorObj);
        }
        proSize.push(obj);
        const datas = {
            proName: products[0].proName,
            data: proSize
        };
        await axios.post(`http://localhost:4000/admin/${params.id}/stocks`, datas)
        .then((response) => {
            const datas = response.data;
            if(datas == "fail"){
                alert("재고 수정에 실패하였습니다.");
                return;
            }else{
                alert("재고 수정이 완료되었습니다.");
                const arr = [];
                arr.push(datas);
                setProducts(arr);
                getData();
            }
        });
    };
    if(lists == "재고수정"){
        const arr = ["상품코드", "상품명", "사이즈", "색상", "창고재고", "주문대기", "가재고",
        "통보수량", "재고수정", "통보수량수정"];
        return(
            <>
                <form onSubmit={onStockHandler}>
                    <table align ="center" border={1} cellSpacing={0}
                            style={{maxWidth: "1500px", marginTop: "40px"}}>
                            <tr style={{backgroundColor: "#3182b7"}}>
                                {arr.map(a => {
                                    return(
                                        <>
                                            <Td td={a} styled={                 
                                                {width: "8%", fontWeight:"bold",
                                                padding: "10px",
                                                textAlign: "center",
                                                color: "white"}      
                                            }/>
                                        </>
                                    );
                                })}
                            </tr>
                            <tr style={{backgroundColor: "#bce1fb"}}>
                                {
                                    products.map(value => {
                                        return(
                                            <>
                                                <Td styled={{textAlign: "center"}} 
                                                    row={value.proSize[0].proColor[0].colorAmout.length * value.proSize[0].proColor.length +1} 
                                                    td={value._id}/>
                                                <Td styled={{textAlign: "center"}} 
                                                    row={value.proSize[0].proColor[0].colorAmout.length * value.proSize[0].proColor.length +1} 
                                                    name="proName" value={value.proName} td={value.proName}/>
                                            </>
                                        );
                                    })
                                }
                            </tr>
                            {
                                products.map(value => {
                                    return(
                                        <>
                                            {
                                                value.proSize[0].proColor.map(color => {
                                                    return(
                                                        <>
                                                            <tr>
                                                                <Td styled={{textAlign: "center"}} row={color.colorAmout.length} 
                                                                name={"proSize"} td={color.size}/>
                                                                <Td styled={{textAlign: "center"}} name={"proColor"}
                                                                td={color.colorAmout[0].color}/>
                                                                {
                                                                    (color.colorAmout[0].amout-color.colorAmout[0].orderQuan) <= color.colorAmout[0].notiQuan  // 통보수량
                                                                    ? <td style={{textAlign: "center", color:"red", fontWeight:"bold"}}>{color.colorAmout[0].amout}!</td>
                                                                    : <td style={{textAlign: "center"}}>{color.colorAmout[0].amout}</td>
                                                                }
                                                                <td style={{textAlign: "center"}} name={"proOrder"}>{color.colorAmout[0].orderQuan}</td>
                                                                <Td styled={{textAlign: "center"}} 
                                                                    td={color.colorAmout[0].amout - color.colorAmout[0].orderQuan}/>
                                                                <Td styled={{textAlign: "center"}} td={color.colorAmout[0].notiQuan}/>
                                                                <Td input={"input"} InputType={"number"} InputName={"proAmout"} InputValue={color.colorAmout[0].amout}/>
                                                                <Td input={"input"} InputType={"number"} InputName={"proNoti"} InputValue={color.colorAmout[0].notiQuan}/>
                                                            </tr>
                                                            {
                                                                color.colorAmout.map((c, index) => {
                                                                    return(
                                                                        <>
                                                                            {
                                                                                index != 0
                                                                                ? <tr>
                                                                                    <Td styled={{textAlign: "center"}} name={"proColor"} td={c.color}/>
                                                                                    {
                                                                                        (c.amout-c.orderQuan) <= c.notiQuan   // 통보수량
                                                                                        ? <td style={{textAlign: "center", color:"red", fontWeight:"bold"}}>{c.amout}!</td>
                                                                                        : <td style={{textAlign: "center"}}>{c.amout}</td>
                                                                                    }
                                                                                    <td style={{textAlign: "center"}} name={"proOrder"}>{c.orderQuan}</td>
                                                                                    <Td styled={{textAlign: "center"}} td={c.amout - c.orderQuan}/>
                                                                                    <Td styled={{textAlign: "center"}} td={c.notiQuan}/>
                                                                                    <Td input={"input"} InputType={"number"} InputName={"proAmout"} 
                                                                                        InputValue={c.amout}/>
                                                                                    <Td input={"input"} InputType={"number"} InputName={"proNoti"} 
                                                                                        InputValue={c.notiQuan}/>
                                                                                </tr>
                                                                                : null
                                                                            }
                                                                        </>
                                                                    );
                                                                })
                                                            }
                                                        </>
                                                    );
                                                })
                                            }
                                        </>
                                    );
                                })
                            }
                            <tr><td td align ="center" colSpan = "13">
                                <input type={"button"} onClick={onClickHandler} value={"목록"}/>
                                <input type={"submit"} value={"수정"}/>
                                <input type={"button"} onClick={onClickListHandler} value={"색상&사이즈 추가"}/>
                                </td></tr>
                    </table>
                </form>
            </> 
        );
    }else if(lists == "색상&사이즈 추가"){
        const arr = ["   ", "기존 데이터", "추가할 데이터"];
        return(<>
            <form onSubmit={onColorSubmit}>
                    <table align ="center" border={1} cellSpacing={0}
                            style={{maxWidth: "1500px", marginTop: "40px"}}>
                            <tr style={{backgroundColor: "#3182b7"}}>
                                {arr.map(a => {
                                    return(
                                        <>
                                            <Td td={a} styled={                 
                                                {width: "8%", fontWeight:"bold",
                                                padding: "10px",
                                                textAlign: "center",
                                                color: "white"}      
                                            }/>
                                        </>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bold", textAlign:"center"}}>색상</td>
                                <td style={{textAlign:"center"}}>{colors.map(value =>{
                                    return(<>{value + "  "}</>);
                                })}</td>
                                <td>
                                    {colorsDB.map(color => {
                                        return(
                                        <div style={{display: "flex", flexDirection:"row", 
                                            width:"120px"}}>
                                            <input type={"checkbox"}
                                                name="colorCheckbox"
                                                value={color[0]}
                                                onChange={(e)=>{
                                                    changeColor(e.currentTarget, color)
                                                }} style={{
                                                    margin: "0px 0px 0px 10px",
                                                }}/>
                                            {color[0]}
                                            {
                                                color[1] != ""
                                                ? <div style={{backgroundColor: `${color[1]}`, 
                                                width: "30px", height: "30px"}}></div>
                                                : null
                                            }
                                        </div>
                                        );
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td style={{fontWeight: "bold", textAlign:"center"}}>사이즈</td>
                                <td style={{textAlign:"center"}}>{sizes.map(value =>{
                                    return(<>{value + "  "}</>)
                                })}</td>
                                <td style={{textAlign:"center"}}>{
                                        sizes.includes("Free")
                                        ? "Free 사이즈 상품은 사이즈를 추가하실 수 없습니다."
                                        : <div>{showSizes.map(size => {
                                            return(
                                            <div style={{display: "flex", flexDirection:"row", 
                                                width:"120px"}}>
                                                <input type={"checkbox"}
                                                    name="sizeCheckbox"
                                                    value={size}
                                                    onChange={(e)=>{
                                                        changeHandler(e.currentTarget, size)
                                                    }} style={{
                                                        margin: "0px 0px 0px 10px",
                                                    }}/>
                                                {size}
                                            </div>
                                            );
                                        })}</div>
                                    }</td>
                            </tr>
                            <tr><td td align ="center" colSpan = "3">
                                <input type={"button"} onClick={onClickHandler} value={"목록"}/>
                                <input type={"submit"} value={"수정"}/>
                                <input type={"button"} onClick={onClickListHandler} value={"재고수정"}/>
                                </td></tr>
                    </table>
                </form>
        </>);
    }
}
export default Stocks;