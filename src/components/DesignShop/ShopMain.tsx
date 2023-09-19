import React, { useEffect, useState } from "react";
import './ShopMain.css';
import ShopRecommendDisplay from './ShopRecommendDisplay';

import ShopContent from "./ShopContent";
import ShopRecommend from './ShopRecommend';
import ShopAuctionContent from './ShopAuctionContent';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import GavelIcon from '@mui/icons-material/Gavel';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const ShopMain: React.FC = () => {
    const [display, setDisplay] = useState(false);  // false는 구매 탭, true는 경매 탭
    const [selectedPageNum, setSelectedPageNum] = useState(1);

    /** 추천 작품 더미데이터, 4개까지, 페이지 진입 시 가져와짐 */
    const tableData = [
        { imageUrl: "https://blog.kakaocdn.net/dn/cfAWy9/btq2yoGo93x/9tLNFXKgg29IQVXuAla7mK/img.jpg", title: '별이 빛나는 밤에', description: '누구에게나, 야곱의 11개의 별과 같은 저마다의 고난과 역경이 있다. 그 역경이 주는 시련은 11번일 수도, 그보다 더 많을수도 있다. 하지만 초승달이라는 보상의 희망이 있다면 그 11개의 별도 결국은 반짝반짝 빛을 낼 수 있게 되지 않을까. 사실 이렇게 말하는 나도 내 눈앞에 주어진 고난과 역경이 결코 빛나 보이지만은 않는다. 하지만 초승달이라는 희망조차 없다면 어떻게 이 상황을 견디며 웃을 수 있을까. ' },
        { imageUrl: "https://previews.123rf.com/images/max5799/max57991802/max5799180200016/95118872-%EC%BA%94%EB%B2%84%EC%8A%A4%EC%97%90-%EC%9C%A0%ED%99%94-%EC%A0%95%EB%AC%BC-%EA%BD%83-%EC%9D%B8%EC%83%81%ED%8C%8C-%EC%9E%91%ED%92%88.jpg", title: '푸른 벤치 위의 안개꽃', description: '이 유화는 푸른색 벤치 위에 놓인 아름다운 안개꽃을 그린 작품입니다. 그림 속 안개꽃들은 부드러운 푸른 색조와 함께 조화롭게 펼쳐져 있어 마치 자연 속에서 향기로운 봄날을 느끼는 듯한 느낌을 주고 있습니다. 작가는 섬세한 터치로 꽃잎의 세부적인 변화와 광택을 표현하여 그림의 현실성과 아름다움을 더욱 강조했습니다. 푸른 벤치와 안개꽃들의 조화로운 조합은 자연의 아름다움과 평화로움을 담아내었습니다. 이 작품은 자연 속에서의 순수하고 평온한 순간을 감상하고 싶은 이들에게 따뜻한 감정을 전달해주는 아름다운 작품입니다.' },
        { imageUrl: "https://t1.daumcdn.net/cfile/blog/992D68385D47FEB903", title: '들녘의 분홍 장미꽃', description: '이 유화는 분홍색 장미꽃이 넓은 들판에 피어나는 모습을 아름답게 그린 작품입니다. 그림 속 장미꽃들은 뛰어난 색감과 세밀한 그림 표현으로 현실감을 더하며, 들판의 풍경과 어우러져 화사하고 환상적인 분위기를 조성하고 있습니다. 작가는 분홍색 장미꽃의 부드러운 꽃잎과 생동감 있는 줄기, 그리고 주변의 자연적인 요소들을 정교하게 그려내어 자연의 아름다움을 표현하였습니다. 들판의 푸르름과 분홍 장미꽃의 조화는 화면을 활기차게 가득 채우며, 작품을 감상하는 이에게 자연의 아름다움과 평화로움을 느끼게 합니다. 이 작품은 분홍 장미꽃의 아름다움과 자연의 순수한 아름다움을 함께 느껴보고 싶은 이들에게 아름다운 감정을 선사하는 작품입니다.' },
        { imageUrl: "https://i.ytimg.com/vi/MQEGEaOstII/maxresdefault.jpg", title: '세린드 강의 오후', description: '이 작품은 가을의 강가 풍경을 아름답게 그린 작품으로, "세린드 강의 오후"라는 제목이 풍기는 정적이면서도 따뜻한 분위기가 느껴집니다. 작가는 강가에 퍼져있는 노란 단풍 나무와 신비로운 강물의 흐름을 자연스럽게 묘사하여 가을의 아름다움을 표현하였습니다. 작품 속 강가에는 조용한 오후의 정취가 느껴지며, 작은 파문과 나무 그림자가 물 위에 투영되는 모습이 고요한 감성을 더해주고 있습니다.' },
    ];

    const changePageNum = (moveNum: number) => {
        if (selectedPageNum + moveNum < 1) {
            setSelectedPageNum(1);
        } else if (selectedPageNum + moveNum > 3) {
            setSelectedPageNum(3);
        } else {
            setSelectedPageNum(selectedPageNum + moveNum);
        }
    };

    useEffect(() => {
        setSelectedPageNum(1);
    }, [display]);

    return (
        <div className="shopMain">

            <ShopRecommendDisplay />

            {/** 작품 판매 */}
            <div className="displayArea">
                {/** 토글 스위치 */}
                <div className="toggleSelect">
                    {display ?
                        <button className="toggleBtn" onClick={() => setDisplay(false)}>구매<ShoppingBagIcon /></button> :
                        <button className="active" onClick={() => setDisplay(false)}>구매<ShoppingBagIcon /></button>
                    }
                    {!display ?
                        <button className="toggleBtn" onClick={() => setDisplay(true)}>경매<GavelIcon /></button> :
                        <button className="active" onClick={() => setDisplay(true)}>경매<GavelIcon /></button>
                    }
                </div>
                <div className="searchBox">
                    <input className="searchText"
                        type="text"
                        placeholder="검색어를 입력해주세요"
                    />
                    <button className="searchBtn">
                        <SearchIcon />
                    </button>
                </div>
                {/** 구매 or 경매 디스플레이 */}
                {!display ?
                    <div className="shopContainer">
                        <div className="shopSectionTitle">제목</div>
                        <div className="shopDisplay">
                            <ShopContent url="https://cdn.class101.net/images/62a35504-65c1-4273-bd46-89cc8a36d691" key={1} />
                            <ShopContent url="https://previews.123rf.com/images/max5799/max57991802/max5799180200016/95118872-%EC%BA%94%EB%B2%84%EC%8A%A4%EC%97%90-%EC%9C%A0%ED%99%94-%EC%A0%95%EB%AC%BC-%EA%BD%83-%EC%9D%B8%EC%83%81%ED%8C%8C-%EC%9E%91%ED%92%88.jpg" key={2} />
                            <ShopContent url="https://t1.daumcdn.net/cfile/blog/992D68385D47FEB903" key={3} />
                            <ShopContent url="https://i.ytimg.com/vi/MQEGEaOstII/maxresdefault.jpg" key={4} />
                            <ShopContent url="https://t1.daumcdn.net/cfile/tistory/996E31335A16F7D133" key={5} />
                            <ShopContent url="https://previews.123rf.com/images/max5799/max57991802/max5799180200016/95118872-%EC%BA%94%EB%B2%84%EC%8A%A4%EC%97%90-%EC%9C%A0%ED%99%94-%EC%A0%95%EB%AC%BC-%EA%BD%83-%EC%9D%B8%EC%83%81%ED%8C%8C-%EC%9E%91%ED%92%88.jpg" key={6} />
                            <ShopContent url="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/18/283b1854-fa6c-4d0d-ab04-a8871fd104b6.jpg" key={7} />
                            <ShopContent url="https://i.ytimg.com/vi/MQEGEaOstII/maxresdefault.jpg" key={8} />
                        </div>
                    </div> :
                    <div className="shopContainer">
                        <div className="shopSectionTitle">제목</div>
                        <div className="shopDisplay">
                            {/** 매게변수로 이미지의 정보가 담긴 오브젝트 입력 */}
                            <ShopAuctionContent imgUrl="https://cdn.dailytw.kr/news/photo/202011/21232_31786_1612.jpg" />
                            <ShopAuctionContent imgUrl="https://post-phinf.pstatic.net/MjAyMzAzMjBfMTc2/MDAxNjc5MzAwMzE5NDQz.0NesDnPR-wcPNm7W_ViHfT24Tp2-pdYQiBVokTvwHF0g.RDdv0NMcw9P8s45nmAFIwShzYFU-Ln5zBStw0wpaRHwg.JPEG/%EC%95%84%ED%94%84%EB%A6%AC%EC%B9%B4_%EC%97%AC%EC%BA%A0_BJ_%EB%AC%B8%EC%9B%94_%EC%83%9D%EB%B0%A9%EC%86%A1_%EC%A4%91_%EB%B8%8C%EB%9E%98%EC%A7%80%EC%96%B4_%EB%81%88_%EB%81%8A%EC%96%B4%EC%A7%80%EC%9E%90_%EC%9E%AC%EB%B9%A8%EB%A6%AC_%ED%95%9C_%ED%96%89.jpg?type=w800_q75" />
                            <ShopAuctionContent imgUrl="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/6TvK/image/_X7S0-LcrAA-Jf3j_2S9p12XmcU.jpg" />
                            <ShopAuctionContent imgUrl="https://cdn.dailytw.kr/news/photo/202011/21232_31786_1612.jpg" />
                            <ShopAuctionContent imgUrl="https://t1.daumcdn.net/cfile/tistory/996E31335A16F7D133" />
                            <ShopAuctionContent imgUrl="https://cdn.dailytw.kr/news/photo/202011/21232_31786_1612.jpg" />
                            <ShopAuctionContent imgUrl="https://cdn.dailytw.kr/news/photo/202011/21232_31786_1612.jpg" />
                            <ShopAuctionContent imgUrl="https://cdn.dailytw.kr/news/photo/202011/21232_31786_1612.jpg" />
                        </div>
                    </div>
                }
                <div className="pageNum">
                    <button className="arrowBtn" onClick={()=>changePageNum(-10)}><KeyboardDoubleArrowLeftIcon /></button>
                    <button className="arrowBtn" onClick={()=>changePageNum(-1)}><KeyboardArrowLeftIcon /></button>
                    <div className="nums">
                        {[1, 2, 3].map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={`num ${selectedPageNum === pageNumber ? "selected" : ""}`}
                                onClick={() => setSelectedPageNum(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                    <button className="arrowBtn" onClick={()=>changePageNum(1)}><KeyboardArrowRightIcon /></button>
                    <button className="arrowBtn" onClick={()=>changePageNum(10)}><KeyboardDoubleArrowRightIcon /></button>
                </div>
            </div>
        </div>
    );
}

export default ShopMain;
