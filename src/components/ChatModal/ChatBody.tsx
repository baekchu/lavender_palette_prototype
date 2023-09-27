import React from 'react';
import BodyNav from './BodyNav';
import ChatLog from './ChatLog';
import Input from './Input';

interface User {
    email: string | null;
    image: string | null;
    nickname: string | null;
}

interface RoomInfo {
    roomID: string,
    senderNick: string,
}

interface ChatBodyProps {
    user: User | null,
    recentRoom: RoomInfo | null;
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setChatModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBody: React.FC<ChatBodyProps> = ({
    user, recentRoom, openSidebar, setOpenSidebar, setChatModalOpen
}) => {
    return (
        <div className={openSidebar ? 'ChatBody' : 'ChatBody withSidebar'}>
            <BodyNav
                recentRoom={recentRoom}
                setOpenSidebar={setOpenSidebar}
                setChatModalOpen={setChatModalOpen} />
            <ChatLog
                user={user}
                recentRoom={recentRoom} />
            <Input />
        </div>
    );
}

export default ChatBody;