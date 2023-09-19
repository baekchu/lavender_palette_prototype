import React, { useState } from "react";
import "./ShopContent.css";
import ShopModal from "./ShopModal";

import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

interface ShopContentProps {
  url: string;
}

const ShopContent: React.FC<ShopContentProps> = ({ url }) => {
  const [modal, setModal] = useState(false);
  const [like, setLike] = useState(false);

  return (
    <>
      <div className="shopContent">
        <div className="ImgBox" onClick={() => setModal(true)}>
          <img className="contentImg" src={url} alt="" />
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
            <div className="price">1,300,000원</div>
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
        <div className="botBox">
          <div className="leftBox">
            <button className="btn" onClick={() => setLike(!like)}>
              {like ?
                <FavoriteIcon sx={{color:'#B25FF3'}}/> :
                <FavoriteBorderIcon />
              }</button>
            <button className="btn"><MessageOutlinedIcon /></button>
            <button className="btn"><ShareIcon /></button>
          </div>
          <div className="rightBox">
            <button className="btnRev" onClick={() => setModal(true)}>
              구매<ShoppingBagOutlinedIcon />
            </button>
          </div>
        </div>
      </div>

      {modal && <ShopModal onClose={() => setModal(false)} />}
    </>
  );
};

export default ShopContent;
