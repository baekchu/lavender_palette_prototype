import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ShareIcon from '@mui/icons-material/Share';

import ShopModal from './ShopModal';
import './ShopRecommendDisplay.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ShopRecommendDisplay() {
  const [like, setLike] = useState(false);
  const [modal, setModal] = useState(false);

  const imgList = [
    "https://cdn.dailytw.kr/news/photo/202011/21232_31786_1612.jpg",
    "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201405/27/htm_2014052795959a010a011.jpg",
    "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/6TvK/image/_X7S0-LcrAA-Jf3j_2S9p12XmcU.jpg",
    "https://img.khan.co.kr/newsmaker/758/758_85a.jpg",
    "https://m.kkongki.com/web/product/big/kkongkishop_13627.jpg",
    "https://m.picturemall.co.kr/web/product/big/202011/93cfdbde46a339a8863943af88effda7.jpg",
    "https://i.pinimg.com/550x/09/35/66/09356662027979196ec073130b50f340.jpg",
    "https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/77T0/image/dkHzh4Nhi_f0hCLf8nc-4MVXH8U.jpg",
  ]

  return (
    <>
      <div className="recommendArea">
        <img
          src='https://www.baulmann.com/wp-content/uploads/2019/02/8428315-1280x1280.1552985660.png'
          alt=''
          className='lightImg'
        />

        {/** 그림 디스플레이 부분 */}
        <div className='reqDisplay'>
          <div className="focus"></div>
          <Swiper
            className="mySwiper"
            effect={'coverflow'}
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: -10,
              depth: 150,
              scale: 0.8,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true, // 페이지 번호 클릭 가능하도록 설정
              renderBullet: (index, className) => {
                return `<span class="${className} custom-pagination-bullet"></span>`; // 커스텀 클래스 추가
              },
            }}
            modules={[EffectCoverflow, Pagination]}
          >
            {imgList.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <img
                  className='swiperImg'
                  alt=""
                  draggable="false"
                  src={imgSrc}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/** 사진 정보 부분 */}
        <div className="displayInfo">
          <div className="divFirst">
            <div className="infoLeft">
              <div className="leftTop">
                <div className="title">제목</div>
                <div className="author">
                  작가
                  <img
                    className="authorImg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbE2F5I6WmG_odu9Wy-jealoHEuulYFhgLdw&usqp=CAU"
                    alt="" />
                </div>
              </div>
              <div className="leftBot">
                설명하자면 긴데, 이 작품을 소개하자면 색깔은 누가 칠했고 비율이 어떻고가 중요한게 아니라, 언제 그려졌는지가
              </div>
            </div>
          </div>

          <div className="divSecond">
            <div className="infoMid">
              <div className="price">1,300,000원</div>
              <div className="info">
                <div className="lineBox">
                  <div className="sTitle">종류</div>
                  <div className="sInfo">수채화</div>
                </div>
                <div className="lineBox">
                  <div className="sTitle">제원</div>
                  <div className="sInfo">300x200cm</div>
                </div>
                <div className="lineBox">
                  <div className="sTitle">태그</div>
                  <div className="sInfo">수채화, 액자형, 작은 사이즈</div>
                </div>
              </div>
            </div>

            <div className="infoRight">
              <div className="navBtns">
                <button className="btn" onClick={() => setLike(!like)}>
                  {like ? <FavoriteIcon sx={{ color: '#B25FF3' }} /> : <FavoriteBorderIcon />}
                </button>
                <button className="btn"><MailOutlineIcon /></button>
                <button className="btn"><ShareIcon /></button>
              </div>
              <div className="leftTime">남은시간</div>
              <div className="modal">
                <button className="modalOpen" onClick={() => setModal(true)}>구매하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal && <ShopModal onClose={() => setModal(false)} />}

    </>
  );
}
