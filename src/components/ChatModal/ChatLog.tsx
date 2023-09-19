import React, { useState, useEffect } from 'react';
import Message from './Message.tsx';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ImageIcon from '@mui/icons-material/Image';

interface User {
    email: string | null;
    image: string | null;
    nickname: string | null;
}

interface RoomInfo {
    roomID: string,
    senderNick: string,
}

interface ChatLogProps {
    user: User | null,
    recentRoom: RoomInfo | null;
}

const ChatLog: React.FC<ChatLogProps> = ({ user, recentRoom }) => {
    // 현재 채팅방의 sender를 찾고, 채팅 내용을 배열로 가져오기

    // a) recentRoom의 uid로 sender를 찾아 데이터 가져오기
    // 임시 sender
    const tempSender: User = {
        email: 'sender@gmail.com',
        image: null,//"https://i1.ruliweb.com/cmt/23/04/28/187c69019ab56cf6c.png",
        nickname: 'MeZot'
    }

    // b) sender의 채팅 로그를 가져와 시간순으로 출력
    // 채팅 배열은 다음과 같은 props를 가짐
    interface ChatArray {
        user: User | null;
        sender: User | null;
        isOwner: boolean;
        message: Message;
        sendTime: string;
    }

    // 임시 로그
    const tempLog: ChatArray[] = [
        {
            user: user,
            sender: tempSender,
            isOwner: true,
            message: {
                text: "메세지 내용",
                attachedImg: null,
            },
            sendTime: "10:31",
        },
        {
            user: user,
            sender: tempSender,
            isOwner: false,
            message: {
                text: "메세지 내용",
                attachedImg:
                    "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202303/27/0ef2dde9-14f2-48a2-91a0-4d2692aa45a2.jpg",
            },
            sendTime: "10:32",
        },
        {
            user: user,
            sender: tempSender,
            isOwner: true,
            message: {
                text: "메세지 내용",
                attachedImg: null,
            },
            sendTime: "10:32",
        },
        {
            user: user,
            sender: tempSender,
            isOwner: true,
            message: {
                text: "메세지 내용",
                attachedImg: null,
            },
            sendTime: "10:32",
        },
        {
            user: user,
            sender: tempSender,
            isOwner: true,
            message: {
                text: "메세지 내용",
                attachedImg: null,
            },
            sendTime: "10:32",
        },
        {
            user: user,
            sender: tempSender,
            isOwner: true,
            message: {
                text: "메세지 내용",
                attachedImg: null,
            },
            sendTime: "10:32",
        },
    ];

    // 채팅 로그
    const [chatLog, setChatLog] = useState<ChatArray[] | null>(tempLog);

    // 호출 시 채팅로그를 업데이트하는 함수
    const updateChatLog = () => {
        setChatLog(null);
        if (recentRoom !== null) {
            if (recentRoom.senderNick === 'User2') {
                setChatLog(tempLog);
            }
            console.log("로그 업데이트");
        }
    }

    // recentRoom이 바뀔 때마다 채팅 로그를 가져옴
    useEffect(() => {
        updateChatLog();
    }, [recentRoom]);


    /****************************************/
    /************** 추가사항 ****************
    0) 스냅샷 이용

    1) 새로운 메세지를 받았을 경우
        a) 창이 최하단일 경우 자동으로 하단으로 스크롤
        b) 아니라면 스크롤되지 않고, 하단으로 이동을 물어보는 버튼 보여주기

    2) 이전 메세지와 수신자와 시간이 동일하다면 시간 숨기기
    *****************************************/

    return (
        <div className="chatLog">
            {chatLog ? (
                chatLog.map((message, index) => (
                    <Message
                        key={index}
                        user={message.user}
                        sender={message.sender}
                        isOwner={message.isOwner}
                        message={message.message}
                        sendTime={message.sendTime}
                        timeDisplay={index === 0 || !chatLog[index - 1].isOwner || chatLog[index - 1].sendTime !== message.sendTime}
                    />
                ))
            ) : (
                <div className="noData">
                    <div className="noTitle">
                        메세지를 시작해보세요
                    </div>
                    <button className="btn">
                        <PersonAddIcon />
                        친구 추가하기
                    </button>
                    <button className="btn">
                        <ImageIcon />
                        작품 둘러보기
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChatLog;

