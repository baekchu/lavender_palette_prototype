import React from 'react';
import ChatNav from './ChatNav.tsx';
import PeopleLog from './PeopleLog.tsx';

interface User {
    email: string | null;
    image: string | null;
    nickname: string | null;
}

interface RoomInfo {
    roomID: string,
    senderNick: string,
}

interface SidebarProps {
    openSidebar: boolean,
    user: User | null,
    recentRoom: RoomInfo | null,
    setRecentRoom: React.Dispatch<React.SetStateAction<RoomInfo | null>>,
}

const Sidebar: React.FC<SidebarProps> = ({
    openSidebar, user, recentRoom, setRecentRoom
}) => {
    return (
        <div
            className={openSidebar ? 'Sidebar' : 'Sidebar close'}
            style={{ willChange: 'width' }}
        >
            <ChatNav
                user={user} />
            <PeopleLog
                recentRoom={recentRoom}
                setRecentRoom={setRecentRoom} />
        </div>
    );
}

export default Sidebar;