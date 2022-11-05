import React, { useState, useEffect } from 'react';
import axios from "axios";
import EditorComponent from '../../components/EditorComponent';
import { useParams } from "react-router-dom";

function PostProDetail() {
    const params = useParams();
    const [content, setContent] = useState(''); //게시판 글 내용 
    const [contentId, setContentId] = useState(''); //게시판의 해당 상품 아이디

    const postProDetail = async (params) => {
        if (params.id !== undefined) {
            await axios.post(`http://localhost:4000/admin/${params.id}/postProDetail`, { params })
                .then((res) => {
                    if (res.data === "fail") {
                        setContent('');
                    } else {
                        const con = res.data;
                        const contentData = con.content;
                        const contentID = con.pro_ID;
                        setContent(contentData);
                        setContentId(contentID);
                    }
                })
        }
    };

    const onEditorChange = (content) => {
        setContent(content)
    };

    useEffect(() => {
        postProDetail(params);
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const pro_ID = params.id;
        const post_content = content;
        const post_contentID = contentId;
        axios.post(`http://localhost:4000/admin/${params.id}/postProDetail`, {
            pro_ID, post_content, post_contentID
        }).then((res) => {
            if (res.data === "T" || res.data === "success") {
                alert('저장 완료');
            } else if (res.data === "F") {
                alert('저장 실패');
            }
        })
    };

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                    <div style={{ width: "1200px" }}>
                        <EditorComponent
                            // style={{ height: "700px" }}
                            value={content} onChange={onEditorChange}
                            defaultValue={content || ''}
                        ></EditorComponent>
                    </div>
                </div>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                <input type="submit" htmlType="submit" onSubmit={onSubmitHandler} value="저장"></input>
            </form>
        </>
    )

}

export default PostProDetail;