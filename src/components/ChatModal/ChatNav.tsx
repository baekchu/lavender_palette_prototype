import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

interface User {
    email: string | null;
    image: string | null;
    nickname: string | null;
}

interface ChatNavProps {
    user: User | null;
}

const ChatNav: React.FC<ChatNavProps> = ({ user }) => {
    return (
        <div className='ChatNav'>
            <div className="user">
                <img className='profile'
                    src={user?.image ?? ""} alt="" />
                <span>{user?.nickname}</span>
                <button className='edit'>
                    <EditIcon sx={{ fontSize: '14px' }} />
                </button>
            </div>
        </div>
    );
}

export default ChatNav;