import React from "react";
import './AuctionLogContent.css'

// 로그인 정보
interface AuctionLogContentProps {
    userNick: string;
    userImg: string;
    userBidPrice: number;
    userBidTime: string;
}

const AuctionLogContent: React.FC<AuctionLogContentProps> = ({ userNick, userImg, userBidPrice, userBidTime }) => {

    return (
        <div className="auctionLogContent">
            <img
                src={userImg}
                alt=""
                className="logImg" />
            <div className="logText">
                <div className="logText1"><b>{userNick}</b>님이</div>
                <div className="logText2">{userBidPrice.toLocaleString()}원에 입찰했습니다.</div>
            </div>
            <div className="logTime">{userBidTime}</div>
        </div>
    );
}

export default AuctionLogContent;