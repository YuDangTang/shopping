import { useState } from "react";
import Checkbox from "./Checkbox.js";

export function Table(props){
    let [values, setValue] = useState(props.value);
    if(props.type === "checkbox"){
        return(
            <tr>
                <td style={{
                    padding: "0px 60px",
                }}>{props.td}</td>
                <td align ="center" style={{
                    padding: "0px 30px",
                }}>{values.map(value => {
                    return(
                        <div>
                            <Checkbox key={value}
                                value={value} />
                            {value}
                        </div>
                    );
                })}</td>
            </tr>
        );
    }else if(props.type === "button"){
        return(
            <td align ="center" colSpan = "2"><button type="submit">다음</button></td>
        );
    }else{
        return(
            <tr>
                <td style={{
                    padding: "0px 60px",
                }}>{props.td}</td>
                <td align ="center" style={{
                    padding: "0px 30px",
                }}><input type={props.type} className={props.class} name={props.name} required /></td>
            </tr>
        );
    }
};
export function Td(props){
    return(
        <>
            <td style={{
                    width: "8%",
                    textAlign: "center",
                }}>{props.td}</td>
        </>
    );
}
export default Table;