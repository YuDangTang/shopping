import { useParams } from "react-router-dom";
import RegisterProName from "../RegisterProName";
function Update(){
    const params = useParams();
    return(<>
        <RegisterProName url={"update"} />
    </>);
}
export default Update;