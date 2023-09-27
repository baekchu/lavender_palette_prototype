import React, { useState } from 'react';
import './NoticeModal.css';
import NoticeLogContent from './NoticeLogContent';
import CloseIcon from '@mui/icons-material/Close';

/** type을 받아 message와 alerm을 구분
 *  각각 표시할 알람들의 NoticeLogContent 배열을 구성해 놓고
 *  호출 시의 type에 맞게 내부 항목을 출력할 수 있게 한다
 */

interface noticeModalProps {
    type: 'message' | 'alerm',
    chatModalOpen : boolean,
    setChatModalOpen : React.Dispatch<React.SetStateAction<boolean>>,
}

const NoticeModal: React.FC<noticeModalProps> = ({ 
    type, chatModalOpen, setChatModalOpen
 }) => {

    return (
        <>
            {chatModalOpen && (<div className="notice">
                <div className="noticeTop">
                    <div className="noticeNav">
                        <div className="modalName">
                            {type === 'message' ? "새로 받은 메세지" :
                                type === 'alerm' ? "알람함" : null}
                        </div>
                        <div className="modalBtns">
                            <button
                                onClick={() => (setChatModalOpen(false))}
                                className="close">
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="noticeBot">
                    <div className="noticeLogBox">
                        <NoticeLogContent
                            type='message'
                            userNick='아린'
                            lastChat='마지막 메세지 마지막 메세지 마지막 메세지 마지막 메세지'
                            lastTime='13:15'
                            newMess={3}
                        />
                        <NoticeLogContent
                            type='message'
                            userNick='아린'
                            lastChat='마지막 메세지 마지막 메세지 마지막 메세지 마지막 메세지'
                            lastTime='13:15'
                            newMess={0}
                        />
                        <NoticeLogContent
                            type='message'
                            userNick='아린'
                            lastChat='마지막 메세지 마지막 메세지 마지막 메세지 마지막 메세지'
                            lastTime='13:15'
                            newMess={223}
                        />
                        <NoticeLogContent
                            type='like'
                            userNick='아린'
                            lastTime='13:15'
                            artworkTitle='샘플1'
                        />
                        <NoticeLogContent
                            type='share'
                            userNick='아린'
                            lastTime='13:15'
                            artworkTitle='샘플1'
                        />
                        <NoticeLogContent
                            type='buy'
                            userNick='아린'
                            lastTime='13:15'
                            artworkTitle='샘플1'
                        />
                        <NoticeLogContent
                            type='bid'
                            userNick='아린'
                            lastTime='13:15'
                            artworkTitle='샘플1'
                        />
                    </div>
                </div>
            </div>)}
        </>
    );
}

export default NoticeModal;