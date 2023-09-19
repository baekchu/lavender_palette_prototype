import React, { useState } from 'react';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LastPageIcon from '@mui/icons-material/LastPage';

interface RoomInfo {
    roomID: string,
    senderNick: string,
}

interface BodyNavProps {
    recentRoom: RoomInfo | null;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setChatModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BodyNav: React.FC<BodyNavProps> = ({
    recentRoom, setOpenSidebar, setChatModalOpen
}) => {
    return (
        <div className="bodyNav">
            <div className="chatInfo">
                <button
                    className="openList"
                    onClick={() => setOpenSidebar((prevOpen) => !prevOpen)}>
                    <LastPageIcon />
                </button>
                <span>{recentRoom?.senderNick}</span>
                <div className="chatIcons">
                    <MoreHorizIcon className='icon' sx={{ fontSize: '20px' }} />
                    <MinimizeIcon className='icon' sx={{ fontSize: '20px' }} />
                    <CloseIcon
                        className='icon'
                        sx={{ fontSize: '20px' }}
                        onClick={() => setChatModalOpen(false)} />
                </div>
            </div>
        </div>
    );
}

export default BodyNav;