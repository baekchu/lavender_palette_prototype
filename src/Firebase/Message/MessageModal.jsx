import React, { useState, useEffect, useRef } from 'react';
import ShowMessages from './ShowMessages';
import { useFetchRoom, useFetchData, useCombinedMessages } from './useChatData'; // Import custom hooks
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Modal.css';

// 메세지 모달 창
const Modal = ({ isOpen, onClose, user }) => {
    const [selectedSender, setSelectedSender] = useState(null);
    const [autoScroll, setAutoScroll] = useState(true); // State for auto-scroll toggle

    // custom hooks을 사용해 데이터 불러오기
    const arrayNames = useFetchRoom(user);
    const { messages, sendedMessages } = useFetchData(user, selectedSender);
    const combinedMessages = useCombinedMessages(messages, sendedMessages, selectedSender);

    // 버튼으로 sender 선택
    const handleButtonClick = (sender) => {
        setSelectedSender(sender === selectedSender ? null : sender); // 선택된 sender를 토글
    };

    // 자동 스크롤에 사용할 토글
    const handleAutoScrollToggle = () => {
        setAutoScroll(!autoScroll);
    };


    // 토글이 참일때 자동 스크롤되게끔
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (autoScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
        }
    }, [combinedMessages, autoScroll]);

    // 창이 열리지 않았을 때 실행하지 않음
    if (!isOpen) return null;

    return (
        <>
            <div className='modal-container'>
                {/* HEADER */}
                <div className='modal-header'>
                    {/* Toggle switch for auto-scroll */}
                    <b style={{ marginLeft: '10px' }}>{selectedSender}</b>
                    <FormControlLabel
                        control={<Switch checked={autoScroll} onChange={handleAutoScrollToggle} size="small" />}
                        color="secondary"
                        label="자동 스크롤"
                        labelPlacement="start"
                        style={{ fontSize: '8px' }}
                        sx={{ fontSize: '8px' }}
                    />
                    <button className="modal-close" onClick={onClose} style={{marginRight:'7px'}}>X</button>
                </div>

                {/* NAVBAR */}
                <div className='modal-nav'>
                    {/* 메시지를 보냈던 사람들의 이메일을 버튼으로 생성 */}
                    {arrayNames.map((name, index) => (
                        <span key={index}>
                            <button
                                name='name'
                                style={{ display:'flex',alignItems:'center',backgroundColor: '#D0C8E6', borderRadius: '25px' }}
                                onClick={() => handleButtonClick(name)}
                            >
                                <AccountCircleIcon/>
                                {name}
                            </button>
                        </span>
                    ))}
                </div>

                {/* BODY */}
                <div className='modal-body'>
                    {/* 대화 내용을 볼 이메일을 누를 시 대화내용 보이기 */}
                    {selectedSender && (
                        <div>
                            {/* ShowMessages 컴포넌트를 이용해 메시지 출력 */}
                            <ShowMessages sender={selectedSender} combinedMessages={combinedMessages} />
                            {/* Ref to scroll to the bottom of the message window */}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className='modal-footer'>
                    <form>
                        <input type="text" />
                        <button onClick={(e)=>(e.preventDefault())}>
                            <SendIcon sx={{color:'purple', background:'none'}}/>
                        </button>
                    </form>
                    

                </div>
            </div>
        </>
    );
};

export default Modal;
