import React, { useState } from "react";
import "./ShopAuctionContent.css";
import ShopActionModal from "./ShopAuctionModal";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ShareIcon from '@mui/icons-material/Share';

/** 제목, 작가, 등록일, 등록만기일, 설명, 시작가, 추정가, 현재가, 입찰로그 오브젝트를 받음  */
interface ShopAuctionContentProps {
  imgUrl: string;
}

const ShopAuctionContent: React.FC<ShopAuctionContentProps> = ({ imgUrl }) => {
  const [isLike, setIsLike] = useState(false);
  const [price, setPrice] = useState(50000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="shopAuctionContent">
        <div className="imgBox">
          <img
            className="artImg"
            src={imgUrl}
            alt=""
            onClick={handleModalToggle}
          />
        </div>
        <div className="topBox">
          <div className="info">
            <div className="author">
              <div className="authorName">작가이름</div>
              <img
                className="authorImg"
                src="https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/25/holapet/20210525081724428qquq.jpg"
                alt="" />
            </div>
          </div>
          <div className="underBox">
            <div className="title">작품제목</div>
            <div className="price">
              <span className="currentPrice">현재가</span>
              {price.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="midBox">
          <div className="innerBox">
            <div className="title">종류</div>
            <div className="content">수채화</div>
          </div>
          <div className="innerBox">
            <div className="title">제원</div>
            <div className="content">300x200cm</div>
          </div>
          <div className="innerBox">
            <div className="title">태그</div>
            <div className="content">수채화, 액자형, 작은 사이즈</div>
          </div>
        </div>
        <div className="boxBot">
          <div className="btns">
            <button className="btn" onClick={() => setIsLike(!isLike)}>
              {isLike ?
                <FavoriteIcon sx={{color:'#B25FF3'}}/> :
                <FavoriteBorderIcon />}
            </button>
            <button className="btn">
              <ShareIcon />
            </button>
          </div>
          <div className="rightBox">
            <div className="leftTime">
              18:17
            </div>
            <div className="joinBid">
              <button className="btn" onClick={handleModalToggle}>
                입찰하기<ShoppingBagOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen &&
        <div className="modalDiv">
          <ShopActionModal
            imageUrl={imgUrl}
            isLike={isLike}
            setIsLike={setIsLike}
            price={price}
            setPrice={setPrice}
            isModalOpen={isModalOpen}
            handleModalToggle={handleModalToggle}
          />
        </div>
      }
    </>
  );
};

export default ShopAuctionContent;
