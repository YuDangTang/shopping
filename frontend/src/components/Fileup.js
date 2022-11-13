import {useRef} from "react";
// 파일 업로드 버튼 누르면 (OnClick)/ input type=file이 클릭 -> (.click()) 파일선택창 열림

const Ref =()=>{
    const selectFile = useRef("");

    return(
        <div>
            <input type="file" ref={selectFile}/> 
           
            {/* ref={selecFile} -> input에 접근하기 위해 useRef사용 */}
            <button onClick={()=>selectFile.current.click()}>이미지 어로드</button>
        </div>
    );
};

export default Ref;