import React, { useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';

const Input: React.FC = () => {
    // 텍스트 입력값
    const [inputText, setInputText] = useState<string>("");
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    // 파일 선택 상태
    const [fileSelected, setFileSelected] = useState<boolean>(false);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isFileExist = e.target.files !== null && e.target.files.length > 0;
        setFileSelected(isFileExist);
    }

    // 폼 서브밋
    const FormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputText.trim() === "") {
            return;
        }
        console.log(inputText);
        setInputText("");
    };

    return (
        <form
            className="input"
            onMouseDown={(e) => (e.stopPropagation())}
            onSubmit={FormSubmit}>

            {/** 텍스트 입력 */}
            <input
                className='inputText'
                type='text'
                placeholder='Type something...'
                value={inputText}
                onChange={handleTextChange}
            />
            <div className="send">
                {/** 파일 업로드 */}
                <AttachFileIcon className='icon' sx={{ color: fileSelected ? '#B25FF3' : 'lightgray' }} />
                <input
                    type='file'
                    style={{ display: 'none' }}
                    id='file'
                    onChange={handleFileChange}
                />
                <label htmlFor='file'>
                    <ImageIcon className='icon active' sx={{ color: 'darkgray' }} />
                </label>

                {/** 전송 버튼 */}
                <button className='sendBtn'>
                    <SendIcon sx={{ fontSize: '20px' }} />
                </button>
            </div>
        </form>
    );
}

export default Input;