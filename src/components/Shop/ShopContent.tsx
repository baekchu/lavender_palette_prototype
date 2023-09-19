import React, { useState } from "react";
import './ShopContent.css';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface Artwork {
    img: string;
    author: string;
    title: string;
    price: number;
}

const ShopContent: React.FC<Artwork> = ({img, author, price, title}) => {
    const [hovered, setHovered] = useState(false);
    const [like, setLike] = useState(false);
    const [booked, setBooked] = useState(false);

    return (
        <div className="shopContent">
            <div
                className="shopContentBox"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img
                    className="contentImg"
                    src={img}
                    alt=""
                />
                {hovered && (
                    <div className="hoverBtns">
                        <button className="hoverBtn">
                            <ZoomInIcon />
                        </button>
                        {!like ? (
                            <button className="hoverBtn" onClick={() => setLike(true)}>
                                <FavoriteBorderIcon />
                            </button>
                        ) : (
                            <button className="hoverBtn" onClick={() => setLike(false)}>
                                <FavoriteIcon />
                            </button>
                        )}
                        {!booked ? (
                            <button className="hoverBtn" onClick={() => setBooked(true)}>
                                <BookmarkBorderIcon />
                            </button>
                        ) : (
                            <button className="hoverBtn" onClick={() => setBooked(false)}>
                                <BookmarkIcon />
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="shopContentInfo">
                <div className="profile">
                    <img
                        className="profileImg"
                        src='https://cdn.class101.net/images/8737e211-feb6-4391-851b-f63dc7a5ed16'
                        alt=''
                    />
                    <div className="profileNick">{author}</div>
                </div>

                <div className="artworkTitle">{title}</div>
                <div className="artworkPrice">{price}</div>
            </div>
        </div>
    );
}

export default ShopContent;
