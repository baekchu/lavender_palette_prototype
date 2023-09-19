import React, { useState, useEffect } from "react";
import './ShopModal.css';
import AuctionLogContent from "./AuctionLogContent";
import ShopLogContent from './ShopLogContent';

import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

const ShopModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {

    // 작품 정보
    const imgUrl = "https://cdn.dailytw.kr/news/photo/202011/21232_31786_1612.jpg";
    const imgTitle = '황소';
    const author = '이중섭';
    const imgDesc = '이중섭은 어린 시절부터 소를 관찰하고 그림으로 그렸습니다. 특히 오산고보 재학 시절, 나라를 빼앗긴 슬픈 현실∙민족의 정서와 정신∙민족 존엄성∙한민족의 문화유산을 담는 소재로 한반도에서 쉽게 볼 수 있는 가축을 주제로 선택합니다. 그 대표적인 에로 ‘소’가 있습니다. 그는 들에 나가 소를 관찰하고 그림을 그리며, 자신만의 방식으로 소를 그리기 위해 노력합니다. 또한 이중섭은 타인의 삶을 그리지 않았습니다. 대신 소에 자신의 삶∙내면세계를 투영하여 그가 겪은 고난∙아픔을 담았습니다. 그리고 이는 동시대 모든 이들의 고난∙아픔을 대신하기도 합니다.';
    const deadline = '23/08/16';

    // 로그인 정보
    const userNick = '침착맨';
    const userImg = 'https://yt3.googleusercontent.com/C7bTHnoo1S_MRbJXn4VwncNpB87C2aioJC_sKvgM-CGw_xgdxwiz0EFEqzj0SRVz6An2h81T4Q=s900-c-k-c0x00ffffff-no-rj';

    // 입찰 정보
    const [auctionModal, setAuctionModal] = useState(true);
    const [like, setLike] = useState(false);
    const [buyLogs, setBuyLogs] = useState<{ userNick: string; userImg: string; userBidPrice: number; userBidTime: string; }[]>([]);
    const [isZoom, setIsZoom] = useState(false);

    return (
        <div className="ModalBack" onClick={onClose}>
            <div className="shopModal" onClick={(event) => (event.stopPropagation())}>
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
                                    {imgTitle}asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
                    </div>
                </div>
                <div className="AuctionModalRight">
                    <div className="modalRightTop">
                        <div className="navBtns">
                            <div className="navLeft">
                                <button className="navBtn" onClick={() => setLike(!like)}>
                                    {like ?
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
                            <div className="navRight">
                                <button className="navBtn" onClick={onClose}>
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>

                        {/** 로그 화면 */}
                        <div className="auctionLog">
                            <div className="logBox">
                                <ShopLogContent
                                    key={1}
                                    userNick={'침착맨'}
                                    userImg={userImg}
                                    userBuyNum={3}
                                    userBuyTime={'17:36'}
                                />
                                {buyLogs.map((log, index) => (
                                    <ShopLogContent
                                        key={index}
                                        userNick={log.userNick}
                                        userImg={log.userImg}
                                        userBuyNum={log.userBidPrice}
                                        userBuyTime={log.userBidTime}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="modalRightBottom">
                        <div className="botNav">
                            <div className="leftTime">13:14</div>
                            <div className="imgPrice">1,800,000원</div>
                        </div>
                        <button className="btn">구매하기</button>
                        <span className="or">or</span>
                        <button className="btn">대여하기</button>
                    </div>
                </div>
            </div>

            <div className="shopModalSmall" onClick={(event) => (event.stopPropagation())}>
                <div className="top">
                    <div className="topLeft">
                        <button className="navBtn" onClick={() => setLike(!like)}>
                            {like ?
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
                        <button className="navBtn" onClick={onClose}>
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
                                <div className="descInfo">
                                    "푸른 정원"은 자연 속에서 환상적인 아름다움을 담아낸 명화입니다. 이 작품은 아티스트의 상상력과 예술적 감성이 어우러져 만들어졌으며, 푸른 풍경과 다채로운 꽃들이 그림 전체를 품고 있는데요.

                                    작품 속에는 끝없이 펼쳐진 푸른 언덕과 하늘이 그려져 있습니다. 푸른 언덕 위에는 청명한 하늘 아래에서 자유롭게 피어난 다양한 종류의 꽃들이 모습을 드러내고 있습니다. 잔잔한 바람이 부는 듯한 분위기가 그림 전체에 고스란히 녹아있으며, 꽃들의 색감과 푸른 하늘의 조화가 마치 자연의 신비한 미학을 그대로 담아낸 듯한 느낌을 줍니다.
                                    이 작품은 마치 어디론가 여행한 듯한 느낌을 주면서도, 동시에 꿈과 행복의 세계를 만나볼 수 있는 기회를 제공합니다. 작품을 감상하는 사람마다 자신만의 해석과 느낌을 받아들일 수 있으며, "푸른 정원"은 그림 속으로 들어가 마음을 여유롭게 풀어내는 특별한 시간을 선사하는 작품입니다.
                                </div>
                            </div>
                        </div>
                        <div className="botTopRight">
                            <div className="leftTime">13:24</div>
                            <div className="price">1,300,000원</div>
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

                    <div className="purchaseBtn">
                        <div className="messageBox">
                            <ShopLogContent
                                key={1}
                                userNick={'침착맨'}
                                userImg={userImg}
                                userBuyNum={3}
                                userBuyTime={'17:36'}
                            />
                        </div>
                        <div className="btnBox">
                            <button className="btn">
                                대여하기
                            </button>
                            <button className="btn">
                                구매하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopModal;