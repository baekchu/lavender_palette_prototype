/** 페이지네이션이 안보임.. */
import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const BottomImgSlide: React.FC = () => {
    const slideImgList = ["https://www.korea.kr/goNewsRes/attaches/innods/images/000077/%EA%B3%B5%EA%B0%90_%ED%8E%98%EC%9D%B4%EC%A7%80_31_%EC%9D%B4%EB%AF%B8%EC%A7%80_0012_640.jpg",
        "https://blog.kakaocdn.net/dn/r2WQW/btq354EPIXW/8geyY6FhwdIKE0Su9Rapyk/img.jpg",
        "https://t1.daumcdn.net/cfile/tistory/9980C5335DCAA2C80B",
        "https://t1.daumcdn.net/cfile/tistory/99552D405DCA9F7F06",
        "https://media.istockphoto.com/id/578812818/ko/%EC%82%AC%EC%A7%84/%EC%8A%A4%EB%A7%88%ED%83%80%EC%BF%84.jpg?s=612x612&w=0&k=20&c=qh4xe_t5a5pvHmW14aRrRHExOoaVLd5hRgJoFwU7mYU=",
        "https://media.istockphoto.com/id/578814102/ko/%EC%82%AC%EC%A7%84/%EC%8A%A4%EB%A7%88%ED%83%80%EC%BF%84.jpg?s=612x612&w=0&k=20&c=zOXsaSpSFujsYAxn9yw4PtMwrgCExcXimlcspdThFUc=",
        "https://www.korea.kr/goNewsRes/attaches/innods/images/000077/%EA%B3%B5%EA%B0%90_%ED%8E%98%EC%9D%B4%EC%A7%80_31_%EC%9D%B4%EB%AF%B8%EC%A7%80_0012_640.jpg",
        "https://blog.kakaocdn.net/dn/r2WQW/btq354EPIXW/8geyY6FhwdIKE0Su9Rapyk/img.jpg",
        "https://t1.daumcdn.net/cfile/tistory/9980C5335DCAA2C80B",
        "https://t1.daumcdn.net/cfile/tistory/99552D405DCA9F7F06",
        "https://media.istockphoto.com/id/578812818/ko/%EC%82%AC%EC%A7%84/%EC%8A%A4%EB%A7%88%ED%83%80%EC%BF%84.jpg?s=612x612&w=0&k=20&c=qh4xe_t5a5pvHmW14aRrRHExOoaVLd5hRgJoFwU7mYU=",
        "https://media.istockphoto.com/id/578814102/ko/%EC%82%AC%EC%A7%84/%EC%8A%A4%EB%A7%88%ED%83%80%EC%BF%84.jpg?s=612x612&w=0&k=20&c=zOXsaSpSFujsYAxn9yw4PtMwrgCExcXimlcspdThFUc=",
    ];

    return (
        <div className="imgSlideBox">
            <div className="prevBtn">
                <KeyboardArrowLeftIcon />
            </div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                slidesPerView= {4}
                pagination={{
                    type: 'bullets', // pagination 타입을 bullets로 설정
                    clickable: true,
                    dynamicBullets: true, // 동적인 bullets를 활성화
                    dynamicMainBullets: 2, // 최대 보여질 pagination의 수 설정
                }}
                navigation={{
                    nextEl: '.nextBtn', // 다음 화살표 버튼 클래스명
                    prevEl: '.prevBtn'  // 이전 화살표 버튼 클래스명
                }}
                className="swiperContent"
            >
                {slideImgList.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                        <img src={imageUrl} alt={`Slide ${index}`} className="slideImg" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="nextBtn">
                <KeyboardArrowRightIcon />
            </div>
        </div>
    );
}

export default BottomImgSlide;