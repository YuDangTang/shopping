//다음 주소 API 팝업창

import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import '../css/post.css';

const Post = (props) => {
    const complete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        props.setcompany({
            address: fullAddress
        })
    }

    return (
        <div >
            <DaumPostcode
                className="postmodal"
                autoClose
                onComplete={complete} />
        </div>
    );
};

export default Post;