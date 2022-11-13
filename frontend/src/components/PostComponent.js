import React, { useEffect, useState, Component } from 'react'
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'

function PostComponent(props) {
    const [content, setContent] = useState('');
    const proID = props.proId;

    const postProBoard = async (params) => {
        if (params !== undefined) {
            await axios.post(`http://localhost:4000/product/${params.id}/postCommend`, { proID })
                .then((res) => {
                    if (res.data === "fail") {
                        setContent('');
                    } else {
                        const con = res.data;
                        setContent(con);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                }, [])
        }
    }

    useEffect(() => {
        postProBoard(proID);
    }, []);

    return (
        <>
            {content &&
                <ReactQuill defaultValue={content} readOnly={true} theme={"bubble"}></ReactQuill>
            }
        </>
    )
}

export default PostComponent;