import React, { useState, useEffect } from "react";
import "./UserPageMain.css";

/** 컴포넌트 */
import UserCard from "./UserCard";
import RepArtworkImg from "./RepArtworkImg";
import ArtworkImg from "./ArtworkImg";

/** 로딩바 */
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

/** 아이콘 */
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import EmailIcon from '@mui/icons-material/Email';
import RefreshIcon from '@mui/icons-material/Refresh';

import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


const UserPage: React.FC = () => {
    /** 프로필 버튼 */
    const [isFollow, setIsFollow] = useState<boolean>(false);
    const [isAlerm, setIsAlerm] = useState<boolean>(false);

    /** 대표 작품 */
    const [menuSelected, setMenuSelected] = useState<number>(1);
    const representImgList = [
        // 수정필요, 조건에 맞는 최상위 이미지 3개를 가져오기
        "https://cdn.newsculture.press/news/photo/202306/526271_651221_5259.jpg",
        "https://m.segye.com/content/image/2021/12/03/20211203508518.jpg",
        "https://www.tvj.co.kr/news/photo/202211/77000_209785_257.jpg"
    ];

    /** 이미지 정렬 버튼 */
    const [displayCategory, setDisplayCategory] = useState<boolean>(false);

    /** 폭에 따른 이미지 출력 개수 */
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [imageRow, setImageRow] = useState<number>(2);
    const [imageColumn, setImageColumn] = useState<number>(5);

    
    /** 현재 폭 정보 가져오기 */
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    /** 최대 폭에 따라 이미지 개수 조절 */
    useEffect(() => {
        if (windowWidth > 1300) {
            setImageColumn(5);
        } else if (windowWidth > 1000) {
            setImageColumn(4);
        } else if (windowWidth > 700) {
            setImageColumn(3);
        } else if (windowWidth > 500) {
            setImageColumn(2);
        } else {
            setImageColumn(1);
        }
    }, [windowWidth]);


    /** 페이지 최하단 도달 시 row에 2 추가 */
    const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

    const handleBottomScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            setIsAtBottom(true);
        } else {
            setIsAtBottom(false);
        }
    };

    /** 스크롤 시 handleBottomScroll 조건 확인 */
    useEffect(() => {
        window.addEventListener("scroll", handleBottomScroll);
        return () => {
            window.removeEventListener("scroll", handleBottomScroll);
        };
    }, []);

    /** 로딩 바 함수 */
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
    
        if (isAtBottom) {
            setProgress(0); // isAtBottom이 true일 때 progress를 0으로 초기화
    
            interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress < 123) {
                        return prevProgress + 1;
                    } else {
                        clearInterval(interval);
                        if (imageColumn > 3) {
                            setImageRow(prevRow => prevRow + 2);
                        } else {
                            setImageRow(prevRow => prevRow + 4);
                        }
                        return 0;
                    }
                });
            }, 15);
        } else {
            clearInterval(interval);
            setProgress(0); // isAtBottom이 false일 때 progress를 0으로 초기화
        }
    
        return () => {
            clearInterval(interval);
        };
    }, [isAtBottom, imageColumn]);
    
    /** 가로방향 스크롤 방지 */
    useEffect(() => {
        document.body.style.overflowX = 'hidden';

        return () => {
            document.body.style.overflowX = 'auto';
        };
    }, []);

    /** 메뉴 정보 */
    const menuData = [
        { id: 1, icon: <LocalFireDepartmentIcon sx={{ fontSize: '22px', color: '#B25FF3' }} />, text: "추천" },
        { id: 2, icon: <FavoriteIcon sx={{ fontSize: '22px', color: '#B25FF3' }} />, text: "최고 인기" },
        { id: 3, icon: <RemoveRedEyeIcon sx={{ fontSize: '22px', color: '#B25FF3' }} />, text: "최다 조회" },
        { id: 4, icon: <BookmarkAddIcon sx={{ fontSize: '22px', color: '#B25FF3' }} />, text: "최다 저장" },
        { id: 5, icon: <EmojiEventsIcon sx={{ fontSize: '22px', color: '#B25FF3' }} />, text: "수상 작품" },
    ];

    return (
        <div className="userPageBack">
            <div className="backImg">
                <img
                    src="https://cdn.pixabay.com/photo/2018/09/01/18/47/glow-3647388_1280.jpg"
                    alt=""
                    className="backImg" />
            </div>
            <div className="outsideBox">
                <div className="contentBox">
                    <div className="topBox">
                        <div className="topBoxLeft">
                            <div className="cardLoc">
                                <UserCard />
                            </div>
                            <div className="selfIntro">
                                <div className="infoBox">
                                    자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
                                    자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
                                    자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
                                    자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
                                    자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
                                    자기소개 자기소개 자기소개 자기소개 자기소개 자기소개 자기소개
                                </div>
                            </div>
                        </div>
                        <div className="topBoxRight">
                            <div className="userBtns">
                                <div className="btnsTop">
                                    <button
                                        className={isFollow ? "btn selected" : "btn"}
                                        onClick={() => setIsFollow(!isFollow)}>
                                        <PersonAddAlt1Icon />
                                        <span className="text">{isFollow ? "팔로우함" : "팔로우하기"}</span>
                                    </button>
                                    <button
                                        className={isAlerm ? "btn selected" : "btn"}
                                        onClick={() => setIsAlerm(!isAlerm)}>
                                        <NotificationAddIcon />
                                        <span className="text">{isAlerm ? "알림 해제" : "알림 설정"}</span>
                                    </button>
                                    <button className="btn">
                                        <EmailIcon />
                                        <span className="text">메세지 보내기</span>
                                    </button>
                                </div>
                                <div className="btnsBot">
                                    <div className="otherTitle">추천 작가</div>
                                    <div className="otherDisplay">
                                        <div className="otherBtns">
                                            {Array.from({ length: 10 }, (_, index) => (
                                                <button key={index} className="other">
                                                    <img
                                                        src="https://cdn.metakr.co.kr/news/photo/202305/1971_3293_2637.jpg"
                                                        alt=""
                                                        className="otherImg"
                                                    />
                                                </button>
                                            ))}
                                            <button className="btn selected">
                                                <RefreshIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contentBox">
                <div className="midBox">
                    {/** 대표 작품 */}
                    <div className="midLeft">
                        {/** 메뉴 버튼 */}
                        <div className="menuBox">
                            {menuData.map(menuItem => (
                                <button
                                    key={menuItem.id}
                                    className={menuSelected === menuItem.id ? "menuBtn selected" : "menuBtn"}
                                    onClick={() => setMenuSelected(menuItem.id)}>
                                    {menuItem.icon}
                                    <span className="menuText">{menuItem.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {/** 대표 작품 출력 구역 */}
                    <div className="midRight">
                        {/** 선택한 제목 */}
                        <div className="repTitle">
                            {menuData.find(menuItem => menuItem.id === menuSelected)?.text}
                        </div>
                        {/** 대표 작품 출력 */}
                        <div className="repDisplay">
                            <div className="disBox">
                                {representImgList.map((imgSrc, index) => (
                                    <RepArtworkImg
                                        imgSrc={imgSrc}
                                        index={index}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="botBox">
                    {/** 이미지 출력 박스 */}
                    <div className="imgDisplay">
                        <div className="imgDisplayNav">
                            {/** 네비게이션 버튼 */}
                            <div className="navBtns">
                                <button
                                    className={!displayCategory ? "btn selected" : "btn"}
                                    onClick={() => setDisplayCategory(false)}>
                                    {displayCategory ?
                                        <ColorLensOutlinedIcon /> :
                                        <ColorLensIcon />}
                                </button>
                                <button
                                    className={displayCategory ? "btn selected" : "btn"}
                                    onClick={() => setDisplayCategory(true)}>
                                    <AutoGraphIcon />
                                </button>
                            </div>
                        </div>

                        {/** 이미지 박스 */}
                        <div className="imgDisplayBox">
                            {Array.from({ length: imageColumn * imageRow }, (_, index) => (
                                <ArtworkImg
                                    imgSrc={"https://cdn.metakr.co.kr/news/photo/202305/1971_3293_2637.jpg"}
                                    index={index}
                                    key={index}
                                />
                            ))}
                            {/** 가져올 이미지가 더 없으면 더보기 버튼이 사라지고
                             * 남은 공간은 빈 공간으로 채우는 코드 추가 */}
                        </div>

                        {/** 더보기 버튼 */}
                        <div className="seeMore">
                            <button
                                className="more"
                                onClick={() => {
                                    (imageColumn > 3) ?
                                        setImageRow(imageRow + 2) :
                                        setImageRow(imageRow + 4);
                                        setProgress(0);
                                }}>
                                더보기
                            </button>
                            <div className={isAtBottom ? "loadingBar active" : "loadingBar"}>
                                <Box>
                                    <LinearProgress
                                     variant="determinate"
                                      value={progress} 
                                      sx={{width: '100%', backgroundColor:'#EADDF3', '& .MuiLinearProgress-bar': { backgroundColor: '#B25FF3' } }}/>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;