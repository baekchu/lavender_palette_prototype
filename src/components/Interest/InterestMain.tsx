import React, { useState, useRef, useEffect } from 'react';
import './InterestMain.css';
import InterestContent from './InterestContent';
import InterestFolder from './InterestFolder';
import AddTabFunction from './AddTabFuntcion';

/** 로딩바 */
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

/** 아이콘 */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SortIcon from '@mui/icons-material/Sort';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';

import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AbcIcon from '@mui/icons-material/Abc';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Interest: React.FC = () => {

    /*********************      탭 관련     ********************************/
    /** 탭 관리 */
    const [tabNum, setTabNum] = useState<number>(1);
    const [tabs, setTabs] = useState<{ id: number; name: string }[]>([]);
    const [tabIndex, setTabIndex] = useState<number>(1);
    const [isTabMaking, setIsTabMaking] = useState<boolean>(false);

    /** 탭 추가 */
    const addTab = () => {
        if (isTabMaking) {
            alert("탭 생성을 완료해주세요");
            return;
        };
        const newTabs = [...tabs, { id: tabIndex, name: `탭 ${tabIndex} 이름` }];
        setTabIndex(tabIndex + 1);
        setTabs(newTabs);
        setTabNum(tabIndex);
        setIsTabMaking(true);
    };

    /** 탭 닫기 */
    const closeTab = (tabId: number) => {
        const updatedTabs = tabs.filter(tab => tab.id !== tabId);
        setTabs(updatedTabs);

        if (tabNum === tabId) {
            if (tabNum > 1) {
                setTabNum(tabNum - 1);
            } else {
                setTabNum(1);
            }
        }
    };

    /** 탭 스크롤 버튼 */
    const tapRef = useRef<HTMLDivElement | null>(null);
    const tabScrollLeft = () => {
        if (tapRef.current) {
            tapRef.current.scrollLeft -= 90.58 * 2;
        }
    };
    const tabScrollRight = () => {
        if (tapRef.current) {
            tapRef.current.scrollLeft += 90.58 * 2;
        }
    };
    /*********************     탭 관련 끝    ********************************/


    /** 박스 네비 */
    const [navTab, setNavTab] = useState<number>(0);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [isAsc, setIsAsc] = useState<boolean>(true);


    /** 정렬 타입 */
    const [typeNum, setTypeNum] = useState<number>(1);


    /** 하단 박스 출력 */
    const [showBotBox, setShowBotBox] = useState<boolean>(true);


    /** 폴더 스크롤 버튼 */
    const folderBoxRef = useRef<HTMLDivElement | null>(null);
    const scrollLeft = () => {
        if (folderBoxRef.current) {
            folderBoxRef.current.scrollLeft -= 4 * 90; // 4개의 컴포넌트씩 이동
        }
    };
    const scrollRight = () => {
        if (folderBoxRef.current) {
            folderBoxRef.current.scrollLeft += 4 * 90; // 4개의 컴포넌트씩 이동
        }
    };


    /** 가로방향 스크롤 방지 */
    useEffect(() => {
        document.body.style.overflowX = 'hidden';

        return () => {
            document.body.style.overflowX = 'auto';
        };
    }, []);


    // 가로 스크롤을 위한 마우스 휠 이벤트 핸들러
    const handleHorizontalScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY || e.detail || (e.nativeEvent as WheelEvent).deltaY;
        const element = document.querySelector('.Xscroll');

        if (element) element.scrollLeft += delta * 4;
    };

    // 이벤트 핸들러 등록
    const element = document.querySelector('.Xscroll');
    if (element) element.addEventListener('wheel', handleHorizontalScroll as any);



    /*************************     더보기 기능  *****************************/

    /** 폭에 따른 이미지 출력 개수 */
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [imageRow, setImageRow] = useState<number>(3);
    const [imageColumn, setImageColumn] = useState<number>(3);

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
        if (windowWidth > 1000) {
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

    /***********************     더보기 기능 끝  *****************************/

    return (
        <>
            <div className="InterestMain">
                <div className="interestContainer">
                    <div className="interest">
                        <div className="tabBody">
                            <div className="tab">
                                <div className="tabsNav add">
                                    <button onClick={addTab} className='navTab add'>
                                        <AddCircleIcon sx={{ fontSize: '16px' }} />
                                    </button>
                                </div>
                                <div className="tabsNav" ref={tapRef} style={{ scrollBehavior: 'smooth' }}>
                                    {tabs.map(tab => (
                                        <AddTabFunction
                                            key={tab.id}
                                            tab={tab}
                                            tabNum={tabNum}
                                            setTabNum={setTabNum}
                                            closeTab={closeTab}
                                            isTabMaking={isTabMaking}
                                            setIsTabMaking={setIsTabMaking}
                                        />
                                    ))}
                                </div>
                                <div className="tabSlideBtn">
                                    <button className="btn left" onClick={tabScrollLeft}>
                                        <ArrowLeftIcon />
                                    </button>
                                    <button className="btn right" onClick={tabScrollRight}>
                                        <ArrowRightIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="tabBox">
                                <div className="tabBoxNav">
                                    <div className="tabBoxNavLeft">
                                        {/** 정렬 네이게이션 */}
                                        {(navTab === 1) && (
                                            <div className="sortBtnNav">
                                                <div className="sortType">
                                                    <button
                                                        className={(typeNum === 1) ? "typeToggleBtn select" : "typeToggleBtn"}
                                                        onClick={() => setTypeNum(1)}>
                                                        <QueryBuilderIcon sx={{ fontSize: '20px' }} />
                                                        <div className="typeName">등록순</div>
                                                    </button>
                                                    <button
                                                        className={(typeNum === 2) ? "typeToggleBtn select" : "typeToggleBtn"}
                                                        onClick={() => setTypeNum(2)}>
                                                        <AbcIcon sx={{ fontSize: '20px' }} />
                                                        <div className="typeName">이름순</div>
                                                    </button>
                                                    <button
                                                        className={(typeNum === 3) ? "typeToggleBtn select" : "typeToggleBtn"}
                                                        onClick={() => setTypeNum(3)}>
                                                        <FavoriteIcon sx={{ fontSize: '20px' }} />
                                                        <div className="typeName">좋아요순</div>
                                                    </button>
                                                    <button
                                                        className={(typeNum === 4) ? "typeToggleBtn select" : "typeToggleBtn"}
                                                        onClick={() => setTypeNum(4)}>
                                                        <RemoveRedEyeIcon sx={{ fontSize: '20px' }} />
                                                        <div className="typeName">조회순</div>
                                                    </button>
                                                    <button
                                                        className={(typeNum === 5) ? "typeToggleBtn select" : "typeToggleBtn"}
                                                        onClick={() => setTypeNum(5)}>
                                                        <BookmarkIcon sx={{ fontSize: '20px' }} />
                                                        <div className="typeName">관심순</div>
                                                    </button>
                                                    <button
                                                        className={(typeNum === 6) ? "typeToggleBtn select" : "typeToggleBtn"}
                                                        onClick={() => setTypeNum(6)}>
                                                        <StarIcon sx={{ fontSize: '20px' }} />
                                                        <div className="typeName">별점순</div>
                                                    </button>
                                                </div>

                                                <button className="isAsc" onClick={() => setIsAsc(!isAsc)}>
                                                    {isAsc ? (
                                                        <>
                                                            <ExpandCircleDownIcon sx={{ fontSize: '18px' }} />
                                                            <div className="ascName">
                                                                내림차순
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ExpandCircleDownIcon sx={{ fontSize: '18px', transform: 'rotate(180deg)' }} />
                                                            <div className="ascName">
                                                                오름차순
                                                            </div>
                                                        </>
                                                    )}

                                                </button>
                                            </div>
                                        )}
                                        {(navTab === 2) && (
                                            <form className="searchBtnNav">
                                                <input
                                                    type="text"
                                                    className="search"
                                                    placeholder='검색어를 입력하세요' />
                                                <button className="btn"><SearchIcon /></button>
                                            </form>
                                        )}
                                    </div>
                                    <div className="tabBoxNavRight">
                                        <button
                                            className={(navTab === 1) ? "btn select" : "btn"}
                                            onClick={() => {
                                                if (navTab === 1) {
                                                    setNavTab(0);
                                                } else {
                                                    setNavTab(1);
                                                }
                                            }}>
                                            <SortIcon />
                                            <div className="btnTitle">정렬</div>
                                        </button>
                                        <button
                                            className={(navTab === 2) ? "btn select" : "btn"}
                                            onClick={() => {
                                                if (navTab === 2) {
                                                    setNavTab(0);
                                                } else {
                                                    setNavTab(2);
                                                }
                                            }}>
                                            <ImageSearchIcon />
                                            <div className="btnTitle">검색</div>
                                        </button>
                                        <div className="hBar" />
                                        <button className={showInfo ? "btn select" : "btn"} onClick={() => setShowInfo(!showInfo)}>
                                            <AttachFileIcon />
                                            <div className="btnTitle">설명</div>
                                        </button>
                                    </div>
                                </div>
                                <div className="tabImgDisplay">
                                    {Array.from({ length: imageColumn * imageRow }, (_, index) => (
                                        <InterestContent
                                            key={index}
                                            imgSrc='https://i.namu.wiki/i/Qq_k0heL2MW1Gss55D2SO3IVYYhwi-Oyw__iuSeiSGd6R5iW--BHtFtGXeNH2K-vs0WX5vqU44cR3Y0oeN_A5w.gif'
                                            title='퀸은비'
                                            tags={['워터밤', '레전드', '움짤', '스프라이트', '비키니', '아이돌']}
                                            showInfo={showInfo}
                                        />
                                    ))}
                                </div>
                                {/** 더보기 버튼 */}
                                <div className="seeMore">
                                    <button
                                        className="more"
                                        onClick={() => {
                                            (imageColumn > 2) ?
                                                setImageRow(imageRow + 3) :
                                                setImageRow(imageRow + 8);
                                            setProgress(0);
                                        }}>
                                        더보기
                                    </button>
                                    <div className={isAtBottom ? "loadingBar active" : "loadingBar"}>
                                        <Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={progress}
                                                sx={{ width: '100%', backgroundColor: '#EADDF3', '& .MuiLinearProgress-bar': { backgroundColor: '#B25FF3' } }} />
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={showBotBox ? "bottomBox" : "bottomBox hidden"}>
                            <div className="showBtn">
                                <button className="btn"
                                    onClick={() => setShowBotBox(!showBotBox)}>
                                    {showBotBox ? (
                                        <ArrowDropDownIcon />
                                    ) : (<ArrowDropUpIcon />)}
                                </button>
                            </div>
                            <div className="folderBox Xscroll" ref={folderBoxRef} style={{ scrollBehavior: 'smooth' }}>
                                {Array(50).fill(0).map((_, index) => (
                                    <InterestFolder
                                        key={index}
                                        isFolderOpen={index % 2 === 1}
                                        folderName={`폴더 이름 ${index + 1}`}
                                    />
                                ))}

                                <div className="slideBtns">
                                    <button className="btn left" onClick={scrollLeft}>
                                        <ArrowLeftIcon sx={{ fontSize: '28px' }} />
                                    </button>
                                    <button className="btn right" onClick={scrollRight}>
                                        <ArrowRightIcon sx={{ fontSize: '28px' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ads">
                        <div className="test">
                            광고창
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Interest;