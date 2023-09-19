import React from "react";
import './ShopLogContent.css'

// 로그인 정보
interface AuctionLogContentProps {
    userNick: string;
    userImg: string;
    userBuyNum: number;
    userBuyTime: string;
}

const AuctionLogContent: React.FC<AuctionLogContentProps> = ({ userNick, userImg, userBuyNum, userBuyTime }) => {

    return (
        <div className="shopLogContent">
            <img
                src={userImg}
                alt=""
                className="logImg" />
            <div className="logText">
                <div className="logText1"><b>{userNick}</b>님이</div>
                <div className="logText2">{userBuyNum}번째로 구매하였습니다</div>
            </div>
            <div className="logTime">{userBuyTime}</div>
        </div>
    );
}

export default AuctionLogContent;