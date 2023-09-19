import React from 'react';

interface User {
    email: string | null;
    image: string | null;
    nickname: string | null;
}

interface Message {
    text: string,
    attachedImg: string | null,
}

interface MessageProps {
    user: User | null,
    sender: User | null,
    isOwner: boolean,
    message: Message,
    sendTime: string,
    timeDisplay: boolean,
}

const Message: React.FC<MessageProps> = (
    { user, sender, isOwner, message, sendTime, timeDisplay }
) => {
    const defaultImg = 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png';

    return (
        <>
            <div className={isOwner ? "message owner" : "message"}
                onMouseDown={(e) => (e.stopPropagation())}>
                <div className="messageInfo">
                    <img
                        className='profileImg'
                        src={isOwner ? (user?.image ?? defaultImg) : (sender?.image ?? defaultImg)}
                        alt=""
                    />
                </div>
                <div className="messageContent">
                    <span className='context'>
                        {message.text}
                    </span>
                    {message.attachedImg && (<img className='contextImg' src={message.attachedImg ?? ''} alt="" />)}
                    <span className={timeDisplay ? 'time' : 'time hidden'}>
                        {sendTime}
                    </span>
                </div>
            </div>
        </>
    );
}

export default Message;

