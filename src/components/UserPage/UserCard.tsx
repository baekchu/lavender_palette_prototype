import React from "react";
import './UserCard.css';

import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import CollectionsIcon from '@mui/icons-material/Collections';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';

const UserCard: React.FC = () => {
    return (
        <>
            <div className="profileBox" style={{ backgroundImage: `url(https://img.freepik.com/free-photo/dark-brown-wood-texture-background-with-design-space_53876-160419.jpg?w=360)` }}>
                <div className='btnNav'>
                    <button className="Btn"><EditIcon sx={{ fontSize: '12px', color: '#A24ADB' }} /></button>
                    <button className="Btn"><ShareIcon sx={{ fontSize: '12px', color: '#A24ADB' }} /></button>
                </div>
                <img
                    className='profileImg'
                    src='https://i.pinimg.com/1200x/a9/5f/8a/a95f8adb4be386586bc9110304b9cb98.jpg'
                    alt="">
                </img>
                <div className="nameBox">
                    <span className="userNick">Hana</span>
                    <span className="userUid">@uid23234342</span>
                </div>
                <div className="statusBox">
                    <div className="statInfo">
                        <CollectionsIcon sx={{ fontSize: '24px', color: '#A24ADB' }} />
                        <span className="statText">작품 수</span>
                        36
                    </div>
                    <div className="statInfo">
                        <GroupIcon sx={{ fontSize: '24px', color: '#A24ADB' }} />
                        <span className="statText">팔로워</span>
                        2,425
                    </div>
                    <div className="statInfo">
                        <FavoriteIcon sx={{ fontSize: '24px', color: '#A24ADB' }} />
                        <span className="statText">좋아요</span>
                        7.22K
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserCard;