import React, { useState, useEffect } from "react";
import './ShopAuctionModal.css';
import AuctionLogContent from "./AuctionLogContent";

import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface ShopActionModalProps {
    imageUrl: string;
    isLike: boolean;
    setIsLike: React.Dispatch<React.SetStateAction<boolean>>;
    price: number;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    isModalOpen: boolean;
    handleModalToggle: () => void;

}

const ShopActionModal: React.FC<ShopActionModalProps> = ({
    imageUrl,
    isLike, setIsLike,
    price, setPrice,
    isModalOpen,
    handleModalToggle
}) => {

    // 작품 정보
    const imgUrl = imageUrl;
    const imgTitle = '황소';
    const author = '이중섭';
    const imgDesc = '이중섭은 어린 시절부터 소를 관찰하고 그림으로 그렸습니다. 특히 오산고보 재학 시절, 나라를 빼앗긴 슬픈 현실∙민족의 정서와 정신∙민족 존엄성∙한민족의 문화유산을 담는 소재로 한반도에서 쉽게 볼 수 있는 가축을 주제로 선택합니다. 그 대표적인 에로 ‘소’가 있습니다. 그는 들에 나가 소를 관찰하고 그림을 그리며, 자신만의 방식으로 소를 그리기 위해 노력합니다. 또한 이중섭은 타인의 삶을 그리지 않았습니다. 대신 소에 자신의 삶∙내면세계를 투영하여 그가 겪은 고난∙아픔을 담았습니다. 그리고 이는 동시대 모든 이들의 고난∙아픔을 대신하기도 합니다.';
    const deadline = '23/08/16';

    // 로그인 정보
    const userNick = '침착맨';
    const userImg = 'https://yt3.googleusercontent.com/C7bTHnoo1S_MRbJXn4VwncNpB87C2aioJC_sKvgM-CGw_xgdxwiz0EFEqzj0SRVz6An2h81T4Q=s900-c-k-c0x00ffffff-no-rj';

    // 입찰 정보
    const [auctionModal, setAuctionModal] = useState(true);

    const [bidInputValue, setBidInputValue] = useState(price); // 입찰 비용 입력값 상태
    const [bidLogs, setBidLogs] = useState<{ userNick: string; userImg: string; userBidPrice: number; userBidTime: string; }[]>([]);

    // 입찰 버튼을 클릭할 때 실행되는 함수
    const handleBidSubmit = (tempBibPrice: number) => {
        if (tempBibPrice <= price) {
            console.log("현재가격보다 큰 가격을 제시해야합니다");
            return;
        } else {
            if ((tempBibPrice - price) % askingPriceStep(price) != 0) {
                console.log("입찰 단위를 맞춰주세요");
                return;
            }
        }

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        const newBidLog = {
            userNick: userNick,
            userImg: userImg,
            userBidPrice: tempBibPrice,
            userBidTime: formattedTime
        };

        // 새로운 입찰 로그를 기존 입찰 로그 배열에 추가
        setBidLogs([...bidLogs, newBidLog]);
        setPrice(tempBibPrice);
        setBidInputValue(tempBibPrice + askingPriceStep(tempBibPrice));
    };

    // 호가 단위
    const askingPriceStep = (Inputprice: number) => {
        if (Inputprice < 10000) {
            return 1000;
        } else if (Inputprice < 100000) {
            return 5000;
        } else if (Inputprice < 1000000) {
            return 100000;
        } else if (Inputprice < 5000000) {
            return 500000;
        } else {
            return 1000000;
        }
    }

    useEffect(() => {
        // price 상태가 변경될 때 로그 박스를 가장 아래로 스크롤
        const logBox = document.querySelector('.logBox');
        if (logBox) {
            logBox.scrollTop = logBox.scrollHeight;
        }
    }, [price]); // price 상태가 변경될 때만 실행

    useEffect(() => {
        if (bidInputValue <= price) {
            setBidInputValue(bidInputValue + askingPriceStep(price))
        }
    }, [bidInputValue]); // price 상태가 변경될 때만 실행

    const [isZoom, setIsZoom] = useState(false);

    return (
        <div className="auctionModalBack" onClick={handleModalToggle}>
            <div className="shopAuctionModal" onClick={(event) => (event.stopPropagation())}>
                <div className="AuctionModalLeft">
                    <div className="modalLeftTop">
                        <button className="imgZoom" onClick={() => setIsZoom(!isZoom)}><ZoomOutMapIcon /></button>
                        {isZoom ?
                            <img
                                className="auctionImgZoom"
                                src={imgUrl}
                                alt="" /> :
                            <img
                                className="auctionImg"
                                src={imgUrl}
                                alt=""
                            />}
                    </div>
                    <div className="modalLeftBottom">
                        <div className="auctionModalInfo">
                            <div className="infoNav">
                                <div className="nav1">
                                    <div className="navTitle">제목</div>
                                    {imgTitle}
                                </div>
                                <div className="nav2">
                                    <div className="navTitle">작가</div>
                                    {author}
                                </div>
                                <div className="nav3">
                                    <div className="navTitle">등록일</div>
                                    {deadline}
                                </div>
                            </div>
                            <div className="infoDesc">
                                <div className="descTitle">설명</div>
                                <div className="desc">
                                    {imgDesc}
                                </div>
                            </div>
                        </div>
                        <div className="botNav">
                            <div className="infoPrice">
                                <div className="startPrice">
                                    <span className="priceTitle">시작가</span>
                                    <span>2,000,000 KRW (2,000 USD)</span>
                                </div>
                                <div className="expectPrice">
                                    <span className="priceTitle">추정가</span>
                                    <span>5,000,000 ~ 7,000,000 KRW</span>
                                </div>
                            </div>
                            <div className="displayPrice">
                                <div className="priceBox">{price.toLocaleString()}원</div>
                            </div>
                            <div className="displayTime">
                                <div className="timeBox">남은 시간</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="AuctionModalRight">
                    <div className="modalRightTop">
                        <div className="navBtns">
                            <div className="navLeft">
                                <button className="navBtn" onClick={() => setIsLike(!isLike)}>
                                    {isLike ?
                                        <FavoriteIcon /> :
                                        <FavoriteBorderIcon />
                                    }
                                </button>
                                <button className="navBtn">
                                    <ShareIcon />
                                </button>
                            </div>
                            <div className="navRight">
                                <button className="navBtn" onClick={handleModalToggle}>
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>

                        {/** 로그 화면 */}
                        <div className="auctionLog">
                            <div className="logBox">
                                {bidLogs.map((log, index) => (
                                    <AuctionLogContent
                                        key={index}
                                        userNick={log.userNick}
                                        userImg={log.userImg}
                                        userBidPrice={log.userBidPrice}
                                        userBidTime={log.userBidTime}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modalRightBottom">
                        <div className="bid">
                            <div className="bidInput">
                                <button
                                    className="bidCon"
                                    onClick={() => setBidInputValue(bidInputValue - askingPriceStep(bidInputValue))}>
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="bidTextInput"
                                    placeholder="입찰 비용을 입력해주세요."
                                    value={bidInputValue}
                                    min={price}
                                    step={askingPriceStep(price)}
                                    onChange={(event) => setBidInputValue(parseInt(event.target.value))}
                                />
                                <button
                                    className="bidCon"
                                    onClick={() => setBidInputValue(bidInputValue + askingPriceStep(bidInputValue))}>
                                    +
                                </button>
                            </div>
                            <button className="bidSubmit" onClick={() => handleBidSubmit(bidInputValue)}>입찰</button>
                        </div>
                        <button className="bidSubmit" onClick={() => handleBidSubmit(price + askingPriceStep(price))}>
                            <div className="bidAuto">
                                <span className="autoBidPrice">{(price + askingPriceStep(price)).toLocaleString()}</span>
                                <span className="auto">자동입찰</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="shopAuctionModalSmall" onClick={(event) => (event.stopPropagation())}>
                <div className="top">
                    <div className="topLeft">
                        <button className="navBtn" onClick={() => setIsLike(!isLike)}>
                            {isLike ?
                                <FavoriteIcon /> :
                                <FavoriteBorderIcon />
                            }
                        </button>
                        <button className="navBtn">
                            <MailOutlineIcon />
                        </button>
                        <button className="navBtn">
                            <ShareIcon />
                        </button>
                    </div>
                    <div className="topRight">
                        <button className="navBtn" onClick={handleModalToggle}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
                <div className="mid">
                    <img
                        className="artImg"
                        src={imgUrl}
                        alt=""
                    />
                </div>
                <div className="bot">
                    <div className="botTop">
                        <div className="botTopLeft">
                            <div className="mainInfo">
                                <div className="title">
                                    푸른 정원
                                    <div className="regDate">23/08/24</div>
                                </div>
                                <div className="author">
                                    몬드리안
                                    <img
                                        src="https://ichef.bbci.co.uk/news/640/cpsprodpb/5F42/production/_124868342_29a911c0-97d0-4169-9e63-7d655cae45a7.jpg"
                                        alt=""
                                        className="authorImg" />
                                </div>
                            </div>
                            <div className="desc">
                                <div className="descInfo">tjfsdsjdasj daasdasdasda sdasdasdasd stjfsdsjdasjdaasdasdasdas dasdasdasd stjfsdsjdasjdaasd asdasda sdasdasdasdstjfsdsjdasjdaasdasdasd asdasdasdasds tjfsdsjdasjdaasdasdasdasdasdasdasds</div>
                            </div>
                        </div>
                        <div className="botTopRight">
                            <div className="leftTime">13:24</div>
                            <div className="price">{price.toLocaleString()}원</div>
                            <div className="infoBoxs">
                                <div className="infoBox">
                                    <div className="title">종류</div>
                                    <div className="sub">설명</div>
                                </div>
                                <div className="infoBox">
                                    <div className="title">제원</div>
                                    <div className="sub">300x200cm</div>
                                </div>
                                <div className="infoBox">
                                    <div className="title">태그</div>
                                    <div className="sub">수채화, 액자형, 작은 사이즈</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bidBtnCont">
                        <div className="messageBox">
                            {bidLogs.length > 0 ? (
                                <AuctionLogContent
                                    key={bidLogs.length - 1}
                                    userNick={bidLogs[bidLogs.length - 1].userNick}
                                    userImg={bidLogs[bidLogs.length - 1].userImg}
                                    userBidPrice={bidLogs[bidLogs.length - 1].userBidPrice}
                                    userBidTime={bidLogs[bidLogs.length - 1].userBidTime}
                                />
                            ) : (
                                <div className="first">첫번째 입찰자가 되어보세요!</div>
                            )}
                        </div>
                        <div className="bidBtnBox">
                            <div className="selfBid">
                                <input
                                    className="bidInput"
                                    type="number"
                                    value={bidInputValue}
                                    min={price}
                                    step={askingPriceStep(price)}
                                    onChange={(event) => setBidInputValue(parseInt(event.target.value))}
                                />
                                <button className="bidBtn" onClick={() => handleBidSubmit(bidInputValue)}>입찰하기</button>
                            </div>
                            <button className="bidBtn" onClick={() => handleBidSubmit(price + askingPriceStep(price))}>
                                <span className="bidPrice">{(price + askingPriceStep(price)).toLocaleString()}</span>
                                <span>자동입찰</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopActionModal;