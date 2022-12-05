import React from 'react';

function Radio({ children, value, name, defaultChecked, disabled }) {
    return (
      <label>
        <input
          type="radio"
          value={value}
          name={name}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
        {children}
      </label>
    );
  }

// function Radio(children, value, name,checked, disabled){
//     const[check, setCheck] = useState([]); //라디오 버튼 값 set할 수 있는 useState

//     // 라디오 버튼 눌렀을 때 한가지만 선택하게 히주는 handel이다.
//     // const handleClickRadioButton = (e) => {
//     //     console.log("선택한 값: "+e.target.value)
//     //     setCheck(e.target.value)
//     // }

//     return(
//         <>
//          <label>
//             <input type="radio" value={value} name={name} checked={checked} disabled={disabled}/>
//             {children}
//         </label>
//         {/* <div>
//         <label>
//             <input type="radio" value="true" name="good" checked={check === "true"} onChange={handleClickRadioButton}/>
//             좋아요
//         </label>
//         <label>
//             <input type="radio" value="false" name="good" checked={check === "false"} onChange={handleClickRadioButton}/>
//             싫어요
//         </label>
//         </div> */}
//         </>
    
//     );

// }

export default Radio;




