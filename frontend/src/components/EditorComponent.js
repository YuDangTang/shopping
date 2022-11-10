import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import ImageResize from "quill-image-resize-module-react";
// import ImageResize from 'quill-image-resize';

// Quill.register('modules/ImageResize', ImageResize);

class EditorComponent extends Component {

    constructor(props) {
        super(props);
    }

    modules = {
        toolbar: [
            [{ 'font': [] }], // font 설정
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // header 설정
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'formula'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], // 리스트, 인덴트 설정
            ['link', 'image', 'video'], // 링크, 이미지, 비디오 업로드 설정
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
            ['clean'], // toolbar 설정 초기화 설정
        ],
        //     imageResize: {
        //         parchment: ReactQuill.import('parchment'),
        //         modules: ["Resize", "DisplaySize", "Toolbar"],
        // }
    }

    formats = [
        'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'formula',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align', 'color', 'background',
    ]

    render() {
        const { value, onChange } = this.props;
        return (
            <ReactQuill
                style={{ height: "700px" }}
                theme="snow"
                modules={this.modules}
                formats={this.formats}
                value={value || ''}
                onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
        )
    }
}
export default EditorComponent