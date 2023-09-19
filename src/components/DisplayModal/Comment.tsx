import React, { useState, useEffect } from "react";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface commentProps {
    userImg: string,
    userName: string,
    commentData: string
}

const Comment: React.FC<commentProps> = ({ userImg, userName, commentData }) => {
    const [likeNum, setLikeNum] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);

    const handleLike = () => {
        if (liked) {
            setLikeNum(likeNum - 1);
            setLiked(false);
        } else {
            setLikeNum(likeNum + 1);
            setLiked(true);
        }
    }

    return (
        <div className="commentContent">
            <div className="commentTop">
                <img
                    src={userImg}
                    alt=""
                    className="userImg" />
                <div className="userName">
                    {userName}
                </div>
            </div>
            <div className="commentBot">
                <div className="commentData">
                    {commentData}
                </div>
                <div className="commentBtns">
                    {likeNum}
                    <button
                        className={liked ? "commentBtn selected" : "commentBtn"}
                        onClick={handleLike}>
                        {liked ?
                            <FavoriteIcon sx={{fontSize:'14px'}}/> :
                            <FavoriteBorderIcon sx={{fontSize:'14px'}}/>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Comment;