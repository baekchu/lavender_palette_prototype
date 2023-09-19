import React from 'react';
// 삭제바람
const ChatUser: React.FC = () => {
    return (
        <div className='chatting'>
            <div className="userChat">
                <img className='userImg'
                 src="https://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg" alt=""/>
                <div className="userChatInfo">
                    <span className='userName'>name</span>
                    <div className='userMessage'>Hello</div>
                </div>
            </div>
        </div>

    );
}

export default ChatUser;