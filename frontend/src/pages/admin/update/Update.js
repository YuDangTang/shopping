import { useParams } from "react-router-dom";
import RegisterProName from "../RegisterProName";
import RegisterProSize from "../RegisterProSize";
import RegisterMaterial from "../material/RegisterMaterial";
import RegisterProMat from "../RegisterProMat";
function Update(props){
    const params = useParams();
    if(props.url == "update"){
        return(<>
            <RegisterProName/>
        </>);
    }else if(props.url == "update2"){
        return(<>
            <RegisterProMat/>
        </>);
    }
}
export default Update;